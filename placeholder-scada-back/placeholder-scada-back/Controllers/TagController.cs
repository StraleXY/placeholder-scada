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
    public async Task<ActionResult<AnalogInputDto>> CreateAnalogInput([FromBody] CreateAnalogInputDto dto)
    {
        try
        {
            return Ok(new AnalogInputDto(await TagService.CreateAnalogInput(dto), 0, ""));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("analog/input/{id}")]
    public async Task<ActionResult<AnalogInputDto>> CreateAnalogInput([FromBody] CreateAnalogInputDto dto, [FromRoute] int id)
    {
        try
        {
            return Ok(new AnalogInputDto(await TagService.UpdateAnalogInput(dto, id), 0, ""));
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("analog/input/{id}")]
    public async Task<ActionResult<AnalogInputDto>> DeleteAnalogInput([FromRoute] int id) 
    {
        try
        {
            return Ok(new AnalogInputDto(await TagService.DeleteAnalogInput(id), 0, ""));
        }
        catch (Exception exception) 
        { 
            return BadRequest(exception.Message); 
        }
    }

    [HttpPost]
    [Route("analog/output")]
    public async Task<ActionResult<AnalogOutputDto>> CreateAnalogOutput([FromBody] CreateAnalogOutputDto dto)
    {
        try
        {
            return Ok(new AnalogOutputDto(await TagService.CreateAnalogOutput(dto)));
        }
        catch (Exception exception)
        { 
            return BadRequest(exception.Message); 
        }
    }

    [HttpPut]
    [Route("analog/output/{id}")]
    public async Task<ActionResult<AnalogOutputDto>> UpdateAnalogOutput([FromBody] CreateAnalogOutputDto dto, [FromRoute] int id)
    {
        try
        {
            return Ok(new AnalogOutputDto(await TagService.UpdateAnalogOutput(dto, id)));
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("analog/output/{id}")]
    public async Task<ActionResult<AnalogOutputDto>> DeleteAnalogOutput([FromRoute] int id)
    {
        try
        {
            return Ok(new AnalogOutputDto(await TagService.DeleteAnalogOutput(id)));
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost]
    [Route("digital/input")]
    public async Task<ActionResult<DigitalInputDto>> CreateDigitalInput([FromBody] CreateDigitalInputDto dto)
    {
        try
        {
            return Ok(new DigitalInputDto(await TagService.CreateDigitalInput(dto), false, ""));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPut]
    [Route("digital/input/{id}")]
    public async Task<ActionResult<DigitalInputDto>> UpdateDigitalInput([FromBody] CreateDigitalInputDto dto, [FromRoute] int id)
    {
        try
        {
            return Ok(new DigitalInputDto(await TagService.UpdateDigitalInput(dto, id), false, ""));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("digital/input/{id}")]
    public async Task<ActionResult<DigitalInputDto>> DeleteDigitalInput([FromRoute] int id)
    {
        try
        {
            return Ok(new DigitalInputDto(await TagService.DeleteDigitalInput(id), false, ""));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost]
    [Route("digital/output")]
    public async Task<ActionResult<DigitalOutputDto>> CreateDigitalOutput([FromBody] CreateDigitalOutputDto dto)
    {
        try
        {
            return Ok(new DigitalOutputDto(await TagService.CreateDigitalOutput(dto)));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPut]
    [Route("digital/output/{id}")]
    public async Task<ActionResult<DigitalOutputDto>> UpdateDigitalOutput([FromBody] CreateDigitalOutputDto dto, [FromRoute] int id)
    {
        try
        {
            return Ok(new DigitalOutputDto(await TagService.UpdateDigitalOutput(dto, id)));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("digital/output/{id}")]
    public async Task<ActionResult<DigitalOutputDto>> DeleteDigitalOutput([FromRoute] int id)
    {
        try
        {
            return Ok(new DigitalOutputDto(await TagService.DeleteDigitalOutput(id)));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost]
    [Route("alarm")]
    public async Task<ActionResult<AlarmDto>> CreateAlarm([FromBody] CreateAlarmDto dto)
    {
        try
        {
            return Ok(new AlarmDto(await TagService.CreateAlarm(dto)));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("alarm/{id}")]
    public async Task<ActionResult<AlarmDto>> DeleteAlarm([FromRoute] int id)
    {
        try
        {
            return Ok(new AlarmDto(await TagService.DeleteAlarm(id)));
        }
        catch(Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}