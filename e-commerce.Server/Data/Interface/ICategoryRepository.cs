using e_commerce.Server.Models;

namespace e_commerce.Server.Data.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateCategoryAsync(Category category);
    }
}
