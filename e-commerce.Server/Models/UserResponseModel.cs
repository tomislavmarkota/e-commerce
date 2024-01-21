namespace e_commerce.Server.Models
{
    public class UserResponseModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string RefreshToken { get; set; }

        public List<string> Roles { get; set; }

    }
}
