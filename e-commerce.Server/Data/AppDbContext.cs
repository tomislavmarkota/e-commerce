using e_commerce.Server.Models;
using e_commerce.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace e_commerce.Server.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly PasswordHashService _passwordHashService;
        public AppDbContext(DbContextOptions<AppDbContext> options, PasswordHashService passwordHashService)
            : base(options)
        {
            _passwordHashService = passwordHashService;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure many-to-many relationship
            modelBuilder.Entity<UserRoleModel>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRoleModel>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRoleModel>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<RoleModel>().HasData(
                new RoleModel() { Id = 1, Name = "EDITOR" },
                new RoleModel() { Id = 2, Name = "ADMIN" },
                new RoleModel() { Id = 3, Name = "USER" }
            );

            SeedUsers(modelBuilder);
        }




        public DbSet<User> Users { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<UserRoleModel> UserRoles { get; set; }


        private void SeedUsers(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "user@user.com",
                    Password = _passwordHashService.HashPassword("user")
                },
                new User
                {
                    Id = 2,
                    Email = "admin@admin.com",
                    Password = _passwordHashService.HashPassword("admin")
                }
            );

            modelBuilder.Entity<UserRoleModel>().HasData(
                new UserRoleModel { UserId = 1, RoleId = 3 }, // Assign USER role to user1
                new UserRoleModel { UserId = 2, RoleId = 2 }  // Assign ADMIN role to user2
            );
        }
    }
}
