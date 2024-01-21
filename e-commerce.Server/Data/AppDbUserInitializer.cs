using e_commerce.Server.Models;
using e_commerce.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace e_commerce.Server.Data
{
    public class AppDbUserInitializer
    {
        private readonly AppDbContext _context;
        private readonly PasswordHashService _passwordHashService;

        public AppDbUserInitializer(AppDbContext context, PasswordHashService passwordHashService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _passwordHashService = passwordHashService ?? throw new ArgumentNullException(nameof(passwordHashService));
        }

        public void SeedData(ModelBuilder modelBuilder)
        {
            SeedUsersAndRoles(modelBuilder);
        }

        private void SeedUsersAndRoles(ModelBuilder modelBuilder)
        {
            if (!_context.Users.Any(u => u.Id == 1))
            {
                string adminPassword = "admin";
                string hashedAdminPassword = _passwordHashService.HashPassword(adminPassword);

                modelBuilder.Entity<User>().HasData(
                    new User() { Id = 1, Password = hashedAdminPassword, Email = "admin@admin.com" }
                );

                modelBuilder.Entity<UserRoleModel>().HasData(
                    new UserRoleModel() { UserId = 1, RoleId = 2 } // Assigning the role "ADMIN" to the user with Id 1
                );
            }

            if (!_context.Users.Any(u => u.Id == 2))
            {
                string userPassword = "user";
                string hashedUserPassword = _passwordHashService.HashPassword(userPassword);

                modelBuilder.Entity<User>().HasData(
                    new User() { Id = 2, Password = hashedUserPassword, Email = "user@user.com" }
                );

                modelBuilder.Entity<UserRoleModel>().HasData(
                    new UserRoleModel() { UserId = 2, RoleId = 3 } // Assigning the role "USER" to the user with Id 2
                );
            }
        }
    }
}

