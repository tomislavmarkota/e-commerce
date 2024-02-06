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
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {

            List<Product> products = _productRepository.GetProducts().Result;

            return Ok(products);
        }
    }
}
