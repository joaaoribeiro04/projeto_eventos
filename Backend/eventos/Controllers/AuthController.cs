using Microsoft.AspNetCore.Mvc;
using eventos.Data;
using System.Threading.Tasks;
using eventos.Dtos;
using Microsoft.EntityFrameworkCore;
using Eventos.Models;

namespace eventos.Controllers;

[Route("api")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserRepository _repository;

    public UserController(IUserRepository repository)
    {
        _repository = repository;
    }
    
    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Password =BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };
        
        return Created("Sucesso!", _repository.Create(user));
    }
    
    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _repository.GetByEmail(dto.Email);

        if (user == null) return BadRequest(new {message = "Credênciais inválidas"});

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
        {
            return BadRequest(new {message = "Credênciais inválidas"});
        }

        return Ok(user); 
    }
    
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();

        return Ok(new { message = "Logout bem-sucedido." });
    }


    
}