﻿namespace e_commerce.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshExpiry { get; set; }

        public ICollection<UserRoleModel> UserRoles { get; set; }
    }
}
