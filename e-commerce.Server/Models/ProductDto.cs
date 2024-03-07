namespace e_commerce.Server.Models
{
    public class ProductDto
    {
        public Product Product { get; set; }
        public List<int>? CategoryIds { get; set; }
    }
}
