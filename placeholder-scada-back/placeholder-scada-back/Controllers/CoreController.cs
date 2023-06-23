using Microsoft.AspNetCore.Mvc;

namespace placeholder_scada_back.Controllers;

[ApiController]
[Route("api/core")]
public class CoreController : ControllerBase
{

    public CoreController()
    {
    }

    [HttpGet]
    public async Task<ActionResult<bool>> StartSystem()
    {
        return Ok(true);
    }

    [HttpGet]
    public async Task<ActionResult<bool>> StopSystem()
    {
        return Ok(true);
    }
}