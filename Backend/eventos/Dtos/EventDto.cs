namespace eventos.Dtos;

public class EventDto
{
    public IFormFile? Imagem { get; set; } // Para receber a imagem do formulário
    public byte[]? ImagemBytes { get; set; } // Para armazenar os bytes da imagem
    public string? Titulo { get; set; }
    public string? Cidade { get; set; }
    public DateTime Data { get; set; }
    public string? Desporto { get; set; }
    public string? Descricao { get; set; }
}