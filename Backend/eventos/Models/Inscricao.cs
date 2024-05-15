namespace Eventos.Models;

public class Inscricao
{
    public int Id { get; set; }
    public int EventoId { get; set; }
    public Evento? Evento { get; set; }
    public string? UsuarioId { get; set; }
}