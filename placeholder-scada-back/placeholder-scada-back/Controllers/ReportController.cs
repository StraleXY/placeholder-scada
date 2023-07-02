using Microsoft.AspNetCore.Mvc;
using placeholder_scada_back.DTO;
using placeholder_scada_back.Services;
using System.Text.Json.Serialization.Metadata;

namespace placeholder_scada_back.Controllers;

[ApiController]
[Route("api/report")]
public class ReportController : ControllerBase
{

    public IReportService ReportService { get; set; }

    public ReportController(IReportService reportService)
    {
        ReportService = reportService;
    }

    [HttpGet]
    [Route("alarms/between")]
    public async Task<ActionResult<List<TriggeredAlarmDto>>> GetAllAlarmsInTimeSpan([FromBody] ReportAlarmsBetweenDto dto)
    {
        try
        {
            DateTime from = DateTime.Parse(dto.From);
            DateTime to = DateTime.Parse(dto.To);
            return Ok(await ReportService.GetAllAlarmsInTimeSpan(from, to, dto.SortBy));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("alarms/{priority}")]
    public async Task<ActionResult<List<TriggeredAlarmDto>>> GetAllAlarmsOfPriority([FromRoute] int priority)
    {
        try
        {
            return Ok(await ReportService.GetAllAlarmsOfPriority(priority));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("values/between")]
    public async Task<ActionResult<List<ValueDto>>> GetAllValuesInTimeSpan([FromBody] TimeSpanDto dto)
    {
        try
        {
            DateTime from = DateTime.Parse(dto.From);
            DateTime to = DateTime.Parse(dto.To);
            return Ok(await ReportService.GetAllValuesInTimeSpan(from, to));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("values/analog")]
    public async Task<ActionResult<List<ValueDto>>> GetLastAnalogInputValues()
    {
        try
        {
            return Ok(await ReportService.GetLastAnalogInputValues());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("values/digital")]
    public async Task<ActionResult<List<ValueDto>>> GetLastDigitalInputValues()
    {
        try
        {
            return Ok(await ReportService.GetLastDigitalInputValues());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("values/tag/{analog}/{id}")]
    public async Task<ActionResult<List<ValueDto>>> GetAllTagValues([FromRoute] int analog, [FromRoute] int id)
    {
        try
        {
            return Ok(await ReportService.GetAllTagValues(analog == 1, id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}