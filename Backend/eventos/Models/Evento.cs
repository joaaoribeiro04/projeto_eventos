namespace Eventos.Models;

public class Evento
{
    public int Id { get; set; }
    public string? Imagem { get; set; } 
    public string? Titulo { get; set; }
    public string? Cidade { get; set; }
    public DateTime Data { get; set; }
    public string? Desporto { get; set; }
    public string? Descricao { get; set; }
    public int Inscritos { get; set; }
}
