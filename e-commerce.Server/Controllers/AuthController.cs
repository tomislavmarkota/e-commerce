using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace e_commerce.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository;
        private AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthRepository authRepository, AppDbContext context, IConfiguration config, ILogger<AuthController> logger)
        {
            _authRepository = authRepository;
            _context = context;
            _config = config;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            IEnumerable<User> users = await _authRepository.GetUsers();
            return Ok(users);
        }

        // [Authorize]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model state");
            }
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email format");
            }

            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists");
            }

            try
            {
                await _authRepository.CreateUser(user.Email, user.Password);
                return Ok("User registered successfully");


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {

            User user = await _authRepository.GetUserByEmail(loginModel.Email);

            if (user != null && BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, loginModel.Email)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(1),
                    signingCredentials: creds
                );

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenString = tokenHandler.WriteToken(token);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true, // Ensure the cookie is accessible only through HTTP
                    Expires = DateTime.UtcNow.AddMinutes(1),
                    Secure = true, // Enable for HTTPS only
                    SameSite = SameSiteMode.Strict
                };

                // Set the token as HTTP-only cookie
                Response.Cookies.Append("jwt", tokenString, cookieOptions);

                var refreshToken = GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshExpiry = DateTime.UtcNow.AddMinutes(15);

                _context.SaveChanges();

                return Ok(new
                {
                    message = "Login successful",
                    user = new UserResponseModel()
                    {
                        Id = user.Id,
                        Email = user.Email,
                        RefreshToken = refreshToken
                    }
                });
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpGet("test")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> TestEndpoint()
        {
            return Ok("Works !");
        }

        [HttpPost("refresh")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Refresh([FromBody] RefreshModel refresh)
        {
            _logger.LogInformation("Refresh called");
            string? refreshTokenFromCookie = Request.Cookies["jwt"];

            if (refreshTokenFromCookie != null)
            {
                var principal = GetPrincipalFromExpiredToken(refreshTokenFromCookie);

                if (principal?.Identity.Name is null)
                {
                    return Unauthorized();
                }

                var user = await _authRepository.GetUserByEmail(principal.Identity.Name);

                if (user is null || user.RefreshToken != refresh.RefreshToken || user.RefreshExpiry < DateTime.UtcNow)
                {
                    return Unauthorized();
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                   {
                    new Claim(ClaimTypes.Name, user.Email)
                };

                var token = new JwtSecurityToken(
                      issuer: _config["Jwt:Issuer"],
                      audience: _config["Jwt:Audience"],
                      claims: claims,
                      expires: DateTime.Now.AddMinutes(1),
                      signingCredentials: creds
                  );

                return Ok(new
                {
                    message = "Login successful",
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    refresh = refresh.RefreshToken
                });
            }

            return BadRequest("Access token is missing!");

        }

        [Authorize]
        [HttpDelete("revoke")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Revoke()
        {
            _logger.LogInformation("Revoke called");

            var userEmail = HttpContext.User.Identity?.Name;
            if (userEmail is null) return Unauthorized();

            var user = await _authRepository.GetUserByEmail(userEmail);

            if (user == null) return Unauthorized();

            user.RefreshToken = null;

            _context.SaveChanges();

            return Ok("Refresh token revoked!");
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var validation = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _config["Jwt:Issuer"],
                ValidAudience = _config["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"])),
                ValidateLifetime = false,
            };

            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }

        private static bool IsValidEmail(string email)
        {
            // This regex pattern checks for a basic email format
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, pattern);
        }

        private static string GenerateRefreshToken()
        {
            var randomNum = new byte[64];
            using var generator = RandomNumberGenerator.Create();
            generator.GetBytes(randomNum);

            return Convert.ToBase64String(randomNum);
        }

    }
}
