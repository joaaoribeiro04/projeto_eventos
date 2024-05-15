using Eventos.Models;
using Microsoft.EntityFrameworkCore;

namespace eventos.Data;

public class EventContext : DbContext
{
    public EventContext(DbContextOptions<EventContext> options) : base(options)
    {
    }
    
    public DbSet<Evento> Eventos { get; set; }
    public DbSet<Inscricao> Inscricoes { get; set; }
}