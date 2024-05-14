using Microsoft.EntityFrameworkCore;
using System.Linq;
using Eventos.Models;

namespace eventos.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

            // Correct way to seed data
            // modelBuilder.Entity<User>().HasData(
               // new User { Id = 1, Name = "Admin", Email = "admin@example.com", Password = "admin" }
            //);
        }
    }
}