namespace e_commerce.Server.Models
{
    public class ProductByCategoryDto
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public List<Product> Products { get; set; }

    }
}
