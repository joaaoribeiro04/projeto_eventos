using EventosDesportivos.Models;
using Microsoft.EntityFrameworkCore;

namespace EventosDesportivos.Data;

public class UserContext: DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
}
