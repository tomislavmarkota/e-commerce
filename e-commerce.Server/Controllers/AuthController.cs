using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace e_commerce.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository;
        private AppDbContext _context;

        public AuthController(IAuthRepository authRepository, AppDbContext context)
        {
            _authRepository = authRepository;
            _context = context;

        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            IEnumerable<User> users =  await _authRepository.GetUsers();
            return Ok(users);
        }

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

            try {
                await _authRepository.CreateUser(user.Email, user.Password);
                return Ok("User registered successfully");


            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }

        }

        private bool IsValidEmail(string email)
        {
            // This regex pattern checks for a basic email format
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, pattern);
        }
    }

 
}
