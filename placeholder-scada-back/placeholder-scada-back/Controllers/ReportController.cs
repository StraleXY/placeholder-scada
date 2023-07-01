using Microsoft.AspNetCore.Mvc;
using placeholder_scada_back.DTO;
using placeholder_scada_back.Services;

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

    // TODO
}