using Microsoft.AspNetCore.Mvc;
using eventos.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Eventos.Models;

namespace eventos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserContext _context;

    public UserController(UserContext context)
    {
        _context = context;
    }

    // GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // POST: api/User/register
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] User newUser)
    {
        if (_context.Users.Any(u => u.Email == newUser.Email))
        {
            return BadRequest("Email already in use.");
        }

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetUser", new { id = newUser.Id }, newUser);
    }
}