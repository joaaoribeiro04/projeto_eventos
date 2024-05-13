using Microsoft.AspNetCore.Mvc;

namespace eventos.Controllers;

[Route("")]
[ApiController]
public class AuthController: Controller
{
    [HttpGet]
    public IActionResult Hello()
    {
        return Ok("success");
    }
}