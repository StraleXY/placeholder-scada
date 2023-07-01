using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface IReportService
{
    Task<List<TriggeredAlarmDto>> GetAllAlarmsInTimeSpan(DateTime from, DateTime to, int sortBy);
    Task<List<TriggeredAlarmDto>> GetAllAlarmsOfPriority(int priority);
    Task<List<ValueDto>> GetAllValuesInTimeSpan(DateTime from, DateTime to);
    Task<List<ValueDto>> GetLastAnalogInputValues();
    Task<List<ValueDto>> GetLastDigitalInputValues();
    Task<List<ValueDto>> GetAllTagValues(bool isAnalog, int id);
}

public class ReportService : IReportService
{
    public required ScadaContext Context { get; set; }
    
    public ReportService(ScadaContext scadaContext)
    {
        Context = scadaContext;
    }

    public Task<List<TriggeredAlarmDto>> GetAllAlarmsInTimeSpan(DateTime from, DateTime to, int sortBy)
    {
        throw new NotImplementedException();
    }

    public Task<List<TriggeredAlarmDto>> GetAllAlarmsOfPriority(int priority)
    {
        throw new NotImplementedException();
    }

    public Task<List<ValueDto>> GetAllValuesInTimeSpan(DateTime from, DateTime to)
    {
        throw new NotImplementedException();
    }

    public Task<List<ValueDto>> GetLastAnalogInputValues()
    {
        throw new NotImplementedException();
    }

    public Task<List<ValueDto>> GetLastDigitalInputValues()
    {
        throw new NotImplementedException();
    }

    public Task<List<ValueDto>> GetAllTagValues(bool isAnalog, int id)
    {
        throw new NotImplementedException();
    }
}