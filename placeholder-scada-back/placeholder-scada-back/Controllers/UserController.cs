using Microsoft.AspNetCore.Mvc;
using placeholder_scada_back.DTO;
using placeholder_scada_back.Entities;
using placeholder_scada_back.Services;

namespace placeholder_scada_back.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{

    public IUserService UserService { get; set; }

    public UserController(IUserService userService)
    {
        UserService = userService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<UserDto>> Login(string username, string password)
    {
        User user = await UserService.Login(username, password);
        if (user == null)
        {
            return BadRequest(null);
        }
        else
        {
            return Ok(new UserDto(user));
        }
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<bool>> Register(string username, string password)
    {
        return Ok(await UserService.Register(username, password));
    }
}