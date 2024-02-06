namespace e_commerce.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public List<ProductCategories>? ProductCategories { get; set; }
    }
}
