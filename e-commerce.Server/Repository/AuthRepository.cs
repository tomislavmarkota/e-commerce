using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using e_commerce.Server.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace e_commerce.Server.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;
        private readonly PasswordHashService _passwordHashService;
        public AuthRepository(AppDbContext context, PasswordHashService passwordHashService) { 
            _context = context;
            _passwordHashService = passwordHashService ?? throw new ArgumentNullException(nameof(passwordHashService));
        }

        public async Task<IEnumerable<User>> GetUsers() {  return _context.Users.ToList(); }

        public User? GetUserById(int id) { return _context.Users.SingleOrDefault((user) => user.Id == id); }

        public async Task<User> CreateUser(string email, string password)
        {
            string hashedPassword = _passwordHashService.HashPassword(password);

            User newUser = new User
            {
                Email = email,
                Password = hashedPassword
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public bool ValidateUserCredentials(string email, string password)
        {
            User user = _context.Users.SingleOrDefault(u => u.Email == email);

            if (user == null)
            {
                return false; // User not found
            }

            return _passwordHashService.VerifyPassword(password, user.Password);
        }




    }
}
