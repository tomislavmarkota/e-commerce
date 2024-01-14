namespace e_commerce.Server.Models
{
    public class UserRoleModel
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int RoleId { get; set; }
        public RoleModel Role { get; set; }
    }
}
