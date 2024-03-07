using e_commerce.Server.Models;

namespace e_commerce.Server.Data.Interface
{
    public interface IProductRepository
    {
        Task<Product?> GetProductById(int id);
        Task<ProductByCategoryDto> GetProductsByCategory(int categoryId, int page, int pageSize);
        Task<Product> CreateProductAsync(ProductDto body);
    }
}
