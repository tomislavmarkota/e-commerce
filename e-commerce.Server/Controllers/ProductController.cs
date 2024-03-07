using e_commerce.Server.Data;
using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductRepository _productRepository;
        private AppDbContext _context;
        public ProductController(IProductRepository productRepository, AppDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            Product? product = await _productRepository.GetProductById(id);

            if (product == null)
            {
                return BadRequest($"Product with id:{id} does not exist");
            }

            return Ok(product);
        }

        // GET: api/products?categoryId={categoryId}&page={page}&pageSize={pageSize}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(
            int categoryId, int page = 1, int pageSize = 10)
        {

            ProductByCategoryDto productsByCategoryDto = await _productRepository.GetProductsByCategory(categoryId, page, pageSize);

            return Ok(productsByCategoryDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDto body)
        {
            Product newProduct = await _productRepository.CreateProductAsync(body);
            return Ok(newProduct);
        }
    }
}
