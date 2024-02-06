using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;

namespace e_commerce.Server.Repository
{
    public class ProductRepository : IProductRepository
    {
        private AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }


        public async Task<List<Product>> GetProducts()
        {
            return _context.Products.ToList();
        }
    }
}
