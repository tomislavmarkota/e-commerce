namespace e_commerce.Server.Models
{
    public class RoleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<UserRoleModel> UserRoles { get; set; }
    }
}
