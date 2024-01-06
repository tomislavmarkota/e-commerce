using e_commerce.Server.Models;

namespace e_commerce.Server.Data.Interface
{
    public interface IAuthRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
        Task<User> CreateUser(string email, string password);
        bool ValidateUserCredentials(string email, string password);
    }
}
