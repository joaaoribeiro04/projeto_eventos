using Microsoft.AspNetCore.Http;
using eventos.Dtos;
using Microsoft.AspNetCore.Mvc;
using eventos.Data;
using Eventos.Models;

namespace eventos.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(IUserRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("Sucesso!", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid credentials" });
            }

            // Verificar se o email contém o sufixo para identificar os promotores
            bool isPromoter = dto.Email.EndsWith("@promotor.com");

            // Define o ID do usuário na sessão após o login bem-sucedido
            _httpContextAccessor.HttpContext.Session.SetString("UserId", user.Id.ToString());

            // Retornar informações sobre o tipo de usuário na resposta
            return Ok(new { userType = isPromoter ? "promoter" : "user" });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Limpa a sessão após o logout
            _httpContextAccessor.HttpContext.Session.Clear();

            return Ok(new { message = "Logout bem-sucedido." });
        }
    }
}