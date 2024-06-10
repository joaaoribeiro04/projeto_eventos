using eventos.Data;
using Eventos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eventos.Controllers
{
    [Route("api/Eventos")] 
    [ApiController]
    public class EventosController : ControllerBase
    {
        private readonly EventContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EventosController(EventContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        
        [HttpGet("historico")]
        public IActionResult GetEventosHistoricos()
        {
            try
            {
                var eventosHistoricos = _context.Eventos
                    .Where(e => DateTime.Compare(e.Data.ToLocalTime(), DateTime.Now) < 0)
                    .ToList();
                return Ok(eventosHistoricos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        } 
        
        // POST: api/Eventos/UploadImagem
        [HttpPost("UploadImagem")]
        public async Task<IActionResult> UploadImagem([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Nenhum arquivo enviado.");

            try
            {
                var uploadsFolder = Path.Combine("", "media");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { filePath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }
        // GET: api/Eventos
        [HttpGet] // Retorna todos os eventos na base de dados
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
        {
            return await _context.Eventos.ToListAsync();
        }
        
        // GET: api/Eventos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEvento(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);

            if (evento == null)
            {
                return NotFound();
            }

            return evento;
        }

        [HttpPost] // Cria um novo evento
        public async Task<ActionResult<Evento>> PostEvento(Evento evento)
        {
            // Ajuste a propriedade 'Data' para ter o fuso horário UTC
            evento.Data = evento.Data.ToUniversalTime();

            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventos), new { id = evento.Id }, evento);
        }

// PUT: api/Eventos/5
        [HttpPut("{id}")] // Atualiza um evento com base no ID
        public async Task<IActionResult> PutEvento(int id, Evento evento)
        {
            if (id != evento.Id)
            {
                return BadRequest();
            }

            var existingEvento = await _context.Eventos.FindAsync(id);

            if (existingEvento == null)
            {
                return NotFound();
            }

            // Atualize os campos do evento existente com os novos valores
            existingEvento.Titulo = evento.Titulo;
            existingEvento.Imagem = evento.Imagem;
            existingEvento.Cidade = evento.Cidade;
            existingEvento.Data = evento.Data;
            existingEvento.Desporto = evento.Desporto;
            existingEvento.Descricao = evento.Descricao;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Eventos/5
        [HttpDelete("{id}")] // Exclui um evento com base no ID
        public async Task<IActionResult> DeleteEvento(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento == null)
            {
                return NotFound();
            }

            _context.Eventos.Remove(evento);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpGet("Inscricoes")]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventosInscritos()
        {
            // Obtém o userId da sessão
            var userId = _httpContextAccessor.HttpContext.Session.GetString("UserId");

            if (userId == null)
            {
                return BadRequest(new { message = "Usuário não autenticado." });
            }

            // Busca todas as inscrições do usuário específico
            var inscricoes = await _context.Inscricoes
                .Where(i => i.UsuarioId == userId)
                .ToListAsync();

            // Busca os eventos correspondentes às inscrições encontradas
            var eventoIds = inscricoes.Select(i => i.EventoId).ToList();
            var eventosInscritos = await _context.Eventos
                .Where(e => eventoIds.Contains(e.Id))
                .ToListAsync();

            return eventosInscritos;
        }

        // POST: api/Eventos/{id}/Inscricao
        [HttpPost("{id}/Inscricao")]
        public async Task<ActionResult<Evento>> Inscrever(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento == null)
            {
                return NotFound();
            }

            // Obter o ID do usuário da sessão
            var userId = HttpContext.Session.GetString("UserId");
            if (userId == null)
            {
                // Se o ID do usuário não estiver na sessão, significa que o usuário não está autenticado
                return Unauthorized(new { message = "Usuário não autenticado." });
            }

            // Verificar se o usuário já está inscrito neste evento
            var inscricaoExistente = _context.Inscricoes.Any(i => i.EventoId == id && i.UsuarioId == userId);
            if (inscricaoExistente)
            {
                return BadRequest(new { message = "Usuário já está inscrito neste evento." });
            }

            evento.Inscritos++; // Aumenta o número de inscritos
            _context.Entry(evento).State = EntityState.Modified;

            // Cria uma nova inscrição com o ID do usuário da sessão
            var inscricao = new Inscricao
            {
                EventoId = evento.Id,
                UsuarioId = userId
            };

            _context.Inscricoes.Add(inscricao);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Verifica se um evento com o ID fornecido existe no banco de dados
        private bool EventoExists(int id)
        {
            return _context.Eventos.Any(e => e.Id == id);
        }
    }
}