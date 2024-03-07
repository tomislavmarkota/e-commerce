using System.Text.Json.Serialization;

namespace e_commerce.Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public ICollection<ProductCategory>? ProductCategories { get; set; }

    }
}
