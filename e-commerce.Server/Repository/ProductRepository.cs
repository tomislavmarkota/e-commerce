using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace e_commerce.Server.Repository
{
    public class ProductRepository : IProductRepository
    {
        private AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Product?> GetProductById(int id)
        {
            Product? product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<ProductByCategoryDto> GetProductsByCategory(int categoryId, int page, int pageSize)
        {
            var query = _context.Products
                .Where(p => p.ProductCategories.Any(pc => pc.CategoryId == categoryId))
                .Select(p => new Product
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description
                });
            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            ProductByCategoryDto productByCategoryDto = new ProductByCategoryDto()
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                Products = products
            };

            return productByCategoryDto;
        }


        public async Task<List<Product>> GetProducts()
        {
            return _context.Products.ToList();
        }

        public async Task<Product> CreateProductAsync(ProductDto body)
        {
            _context.Products.Add(body.Product);
            await _context.SaveChangesAsync();

            if (body.CategoryIds != null && body.CategoryIds.Any())
            {
                foreach (var categoryId in body.CategoryIds)
                {
                    var category = await _context.Categories.FindAsync(categoryId);

                    if (category != null)
                    {
                        // Create a new ProductCategory entry directly
                        _context.ProductCategories.Add(new ProductCategory
                        {
                            ProductId = body.Product.Id,
                            CategoryId = categoryId
                        });
                    }
                }

                await _context.SaveChangesAsync();
            }

            return body.Product;
        }
    }
}
