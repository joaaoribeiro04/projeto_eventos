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

            if (user == null) return BadRequest(new { message = "Credenciais inválidas" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Credenciais inválidas" });
            }

            // Define o ID do usuário na sessão após o login bem-sucedido
            _httpContextAccessor.HttpContext.Session.SetString("UserId", user.Id.ToString());

            return Ok(user);
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