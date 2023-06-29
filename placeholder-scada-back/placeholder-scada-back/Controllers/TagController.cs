using Microsoft.AspNetCore.Mvc;
using placeholder_scada_back.DTO;
using placeholder_scada_back.Entities;
using placeholder_scada_back.Services;

namespace placeholder_scada_back.Controllers;

[ApiController]
[Route("api/tag")]
public class TagController : ControllerBase
{

    public ITagService TagService { get; set; }

    public TagController(ITagService tagService)
    {
        TagService = tagService;
    }

    [HttpPost]
    [Route("analog/input")]
    public async Task<ActionResult<UserDto>> CreateAnalogInput(CreateAnalogInputDto dto)
    {
        // TODO
    }
}