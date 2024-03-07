using e_commerce.Server.Data.Interface;
using e_commerce.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            Category newCategory = await _categoryRepository.CreateCategoryAsync(category);

            return Ok(new
            {
                id = newCategory.Id,
                name = newCategory.Name,
            });

        }

    }
}
