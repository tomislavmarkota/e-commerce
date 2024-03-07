using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;

namespace e_commerce.Server.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            var newCategory = await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return newCategory.Entity;
        }
    }
}
