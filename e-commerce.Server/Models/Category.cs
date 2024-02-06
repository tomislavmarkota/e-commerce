namespace e_commerce.Server.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<ProductCategories>? ProductCategories { get; set; }
    }
}
