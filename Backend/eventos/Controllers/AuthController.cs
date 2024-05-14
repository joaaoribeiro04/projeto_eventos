using Microsoft.AspNetCore.Mvc;
using eventos.Data;
using System.Threading.Tasks;
using eventos.Dtos;
using eventos.Helpers;
using Microsoft.EntityFrameworkCore;
using Eventos.Models;

namespace eventos.Controllers;

[Route("api")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserRepository _repository;
    private readonly JwtService _jwtService;

    public UserController(IUserRepository repository, JwtService jwtService)
    {
        _repository = repository;
        _jwtService = jwtService;
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

        var jwt = _jwtService.Generate(user.Id);
        
        Response.Cookies.Append("jwt", jwt, new CookieOptions
        {
            HttpOnly = true
        });
        
        return Ok(new
        {
            message = "Sucesso!"
        });
    }

    [HttpGet("user")]
    public IActionResult User()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var user = _repository.GetById(userId);

            return Ok(user);
        }
        catch (Exception _)
        {
            return Unauthorized();
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");

        return Ok(new
        {
            message = "Sucesso!"
        });
    }
}