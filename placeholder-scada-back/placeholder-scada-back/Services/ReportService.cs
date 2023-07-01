using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Globalization;

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

    public async Task<List<TriggeredAlarmDto>> GetAllAlarmsInTimeSpan(DateTime from, DateTime to, int sortBy)
    {
        List<TriggeredAlarm> triggeredAlarms = await Context.TriggeredAlarms.Where(x => x.Time <= to && x.Time >= from).OrderBy(x => x.Time).ToListAsync();
        triggeredAlarms.Reverse();
        List<TriggeredAlarmDto> result = new List<TriggeredAlarmDto>();
        foreach (TriggeredAlarm triggeredAlarm in triggeredAlarms)
        {
            Alarm alarm = Context.Alarms.First(x => x.Id == triggeredAlarm.AlarmId);
            result.Add(new TriggeredAlarmDto(triggeredAlarm, alarm));
        }
        if (sortBy == 0)
        {
            result = result.OrderBy(x => x.Type).ToList();
        }
        return result;
    }

    public async Task<List<TriggeredAlarmDto>> GetAllAlarmsOfPriority(int priority)
    {
        List<TriggeredAlarm> triggeredAlarms = await Context.TriggeredAlarms.OrderBy(x => x.Time).ToListAsync();
        triggeredAlarms.Reverse();
        List<TriggeredAlarmDto> result = new List<TriggeredAlarmDto>();
        foreach (TriggeredAlarm triggeredAlarm in triggeredAlarms)
        {
            Alarm alarm = Context.Alarms.First(x => x.Id == triggeredAlarm.AlarmId);
            if (alarm.Priority == priority)
            {
                result.Add(new TriggeredAlarmDto(triggeredAlarm, alarm));
            }
        }
        return result;
    }

    public async Task<List<ValueDto>> GetAllValuesInTimeSpan(DateTime from, DateTime to)
    {
        List<AnalogValue> analogValues = await Context.AnalogValues.OrderBy(x => x.DateTime).Where(x => x.DateTime >= from && x.DateTime <= to).ToListAsync();
        List<DigitalValue> digitalValues = await Context.DigitalValues.OrderBy(x => x.DateTime).Where(x => x.DateTime >= from && x.DateTime <= to).ToListAsync();
        List<ValueDto> result = new List<ValueDto>();
        while (analogValues.Count > 0 || digitalValues.Count > 0)
        {
            if (analogValues.Count == 0 || (digitalValues.Count > 0 && analogValues.Last().DateTime < digitalValues.Last().DateTime))
            {
                result.Add(new ValueDto(digitalValues.Last()));
                digitalValues.RemoveAt(digitalValues.Count - 1);
            }
            else
            {
                result.Add(new ValueDto(analogValues.Last()));
                analogValues.RemoveAt(analogValues.Count - 1);
            }
        }
        return result;
    }

    public async Task<List<ValueDto>> GetLastAnalogInputValues()
    {
        List<AnalogInput> analogInputs = await Context.AnalogInputs.ToListAsync();
        List<AnalogValue> analogValues = new List<AnalogValue>();
        List<ValueDto> result = new List<ValueDto>();
        foreach (AnalogInput analogInput in analogInputs)
        {
            AnalogValue? analogValue = Context.AnalogValues.Where(x => x.TagId == analogInput.Id).OrderBy(x => x.DateTime).LastOrDefault();
            if (analogValue != null)
            {
                analogValues.Add(analogValue);
            }
        }
        analogValues = analogValues.OrderBy(x => x.DateTime).ToList();
        analogValues.Reverse();
        foreach (AnalogValue analogValue in analogValues)
        {
            result.Add(new ValueDto(analogValue));
        }
        return result;
    }

    public async Task<List<ValueDto>> GetLastDigitalInputValues()
    {
        List<DigitalInput> digitalInputs = await Context.DigitalInputs.ToListAsync();
        List<DigitalValue> digitalValues = new List<DigitalValue>();
        List<ValueDto> result = new List<ValueDto>();
        foreach (DigitalInput digitalInput in digitalInputs)
        {
            DigitalValue? digitalValue = Context.DigitalValues.Where(x => x.TagId == digitalInput.Id).OrderBy(x => x.DateTime).LastOrDefault();
            if (digitalValue != null)
            {
                digitalValues.Add(digitalValue);
            }
        }
        digitalValues = digitalValues.OrderBy(x => x.DateTime).ToList();
        digitalValues.Reverse();
        foreach (DigitalValue digitalValue in digitalValues)
        {
            result.Add(new ValueDto(digitalValue));
        }
        return result;
    }

    public async Task<List<ValueDto>> GetAllTagValues(bool isAnalog, int id)
    {
        List<ValueDto> result = new List<ValueDto>();
        if (isAnalog)
        {
            List<AnalogValue> values = await Context.AnalogValues.Where(x => x.TagId == id).OrderBy(x => x.DateTime).ToListAsync();
            foreach (AnalogValue value in values)
            {
                result.Add(new ValueDto(value));
            }
        }
        else
        {
            List<DigitalValue> values = await Context.DigitalValues.Where(x => x.TagId == id).OrderBy(x => x.DateTime).ToListAsync();
            foreach (DigitalValue value in values)
            {
                result.Add(new ValueDto(value));
            }
        }
        return result;
    }
}