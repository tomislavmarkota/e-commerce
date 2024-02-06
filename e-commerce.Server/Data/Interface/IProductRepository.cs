using e_commerce.Server.Models;

namespace e_commerce.Server.Data.Interface
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProducts();
    }
}
