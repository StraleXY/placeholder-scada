using Microsoft.AspNetCore.Mvc;
using placeholder_scada_back.DTO;
using placeholder_scada_back.Services;

namespace placeholder_scada_back.Controllers;

[ApiController]
[Route("api/core")]
public class CoreController : ControllerBase
{

    public ICoreService CoreService { get; set; }

    public CoreController(ICoreService coreService)
    {
        CoreService = coreService;
    }

    [HttpGet]
    [Route("start")]
    public async Task<ActionResult<bool>> StartSystem()
    {
        try
        {
            return Ok(CoreService.StartSystem());
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("stop")]
    public async Task<ActionResult<bool>> StopSystem()
    {
        try
        {
            return Ok(CoreService.StopSystem());
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("trending")]
    public async Task<ActionResult<TrendingStateDto>> GetTrendingState()
    {
        try
        {
            return Ok(CoreService.GetTrendingState());
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    [Route("rtu")]
    public async Task<ActionResult<RealTimeUnitDto>> CreateRealTimeUnit([FromBody] CreateRealTimeUnitDto dto)
    {
        try
        {
            return Ok(new RealTimeUnitDto(await CoreService.CreateRealTimeUnit(dto)));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("rtu/{id}")]
    public async Task<ActionResult<RealTimeUnitDto>> UpdateRealTimeUnit([FromBody] CreateRealTimeUnitDto dto, [FromRoute] int id)
    {
        try
        {
            return Ok(new RealTimeUnitDto(await CoreService.UpdateRealTimeUnit(dto, id)));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("rtu/{id}")]
    public async Task<ActionResult<RealTimeUnitDto>> DeleteRealTimeUnit([FromRoute] int id)
    {
        try
        {
            return Ok(new RealTimeUnitDto(await CoreService.DeleteRealTimeUnit(id)));
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("rtu")]
    public async Task<ActionResult<List<RealTimeUnitDto>>> GetAllRealTimeUnits()
    {
        try
        {
            return Ok(await CoreService.GetAllRealTimeUnits());
        }
        catch(Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}