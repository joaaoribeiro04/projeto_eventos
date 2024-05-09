using Microsoft.AspNetCore.Mvc;

namespace EventosDesportivos.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Ok("Success");
        }
    }
}
