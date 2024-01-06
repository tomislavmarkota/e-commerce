using e_commerce.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace e_commerce.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }


    }
}
