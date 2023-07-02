using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface ICoreService
{
    Task<bool> StartSystem();
    Task<bool> StopSystem();
    Task<TrendingStateDto> GetTrendingState();
    Task<RealTimeUnit> CreateRealTimeUnit(CreateRealTimeUnitDto dto);
    Task<RealTimeUnit> UpdateRealTimeUnit(CreateRealTimeUnitDto dto, int id);
    Task<RealTimeUnit> DeleteRealTimeUnit(int id);
    Task<List<RealTimeUnitDto>> GetAllRealTimeUnits();
}

public class CoreService : ICoreService
{
    private readonly object _alarmsLogLock = new object();
    public required ScadaContext Context { get; set; }
    public required ISimulationDriver SimulationDriver { get; set; }
    public required IRealTimeDriver RealTimeDriver { get; set; }
    public required IServiceProvider Services { get; set; }

    public CoreService(ScadaContext scadaContext, ISimulationDriver simulationDriver, IRealTimeDriver realTimeDriver, IServiceProvider services)
    {
        Context = scadaContext;
        threads = new List<Thread>();
        SimulationDriver = simulationDriver;
        RealTimeDriver = realTimeDriver;
        Services = services;
    }

    public List<Thread> threads { get; set; }

    private void LogTriggeredAlarm(TriggeredAlarm triggeredAlarm, Alarm alarm)
    {
        lock (_alarmsLogLock)
        {
            using (StreamWriter sw = File.AppendText("alarmsLog.txt"))
            {
                String line = triggeredAlarm.Time.ToString("dd/MM/yyyy HH:ss:fff")
                    + ", alarmId: " + triggeredAlarm.AlarmId
                    + ", tagValue: " + triggeredAlarm.TagValue
                    + ", alarmType: " + alarm.Type
                    + ", threshold: " + alarm.Threshold
                    + ", priority: " + alarm.Priority;
                sw.WriteLine(line);
            }
        }
    }

    private void TriggerAlarm(Alarm alarm, float value, ScadaContext Context)
    {
        TriggeredAlarm triggeredAlarm = new TriggeredAlarm();
        triggeredAlarm.AlarmId = alarm.Id;
        triggeredAlarm.TagValue = value;
        triggeredAlarm.Time = DateTime.Now;
        Context.TriggeredAlarms.Add(triggeredAlarm);
        Context.SaveChanges();
        LogTriggeredAlarm(triggeredAlarm, alarm);
    }

    public async void AnalogInputWorker(object? analogInputObj)
    {
        using (var scope = Services.CreateScope())
        {
            var Context = scope.ServiceProvider.GetRequiredService<ScadaContext>();

            AnalogInput? analogInput = analogInputObj as AnalogInput;
            if (analogInput != null)
            {
                while (true)
                {
                    Thread.Sleep(analogInput.ScanTime);
                    analogInput = Context.AnalogInputs.First(x => x.Id == analogInput.Id);
                    if (!analogInput.IsOn) continue;

                    AnalogValue analogValue = new AnalogValue();
                    analogValue.TagId = analogInput.Id;
                    analogValue.DateTime = DateTime.Now;
                    if (analogInput.UseRtu)
                    {
                        analogValue.Value = await RealTimeDriver.GetAnalogInputValue(analogInput);
                    }
                    else
                    {
                        analogValue.Value = await SimulationDriver.GetAnalogInputValue(analogInput);
                    }
                    Context.AnalogValues.Add(analogValue);
                    Context.SaveChanges();
                    List<Alarm> alarms = Context.Alarms.Where(x => x.TagId == analogInput.Id).ToList();
                    foreach (Alarm alarm in alarms)
                    {
                        if (alarm.Type == AlarmType.HIGH)
                        {
                            if (alarm.Threshold < analogValue.Value)
                            {
                                TriggerAlarm(alarm, analogValue.Value, Context);
                            }
                        }
                        else
                        {
                            if (alarm.Threshold > analogValue.Value)
                            {
                                TriggerAlarm(alarm, analogValue.Value, Context);
                            }
                        }
                    }
                }
            }
        }
    }

    public async void DigitalInputWorker(object? digitalInputObj)
    {
        using (var scope = Services.CreateScope())
        {
            var Context = scope.ServiceProvider.GetRequiredService<ScadaContext>();

            DigitalInput? digitalInput = digitalInputObj as DigitalInput;
            if (digitalInput != null)
            {
                while (true)
                {
                    Thread.Sleep(digitalInput.ScanTime);
                    digitalInput = Context.DigitalInputs.First(x => x.Id == digitalInput.Id);
                    if (!digitalInput.IsOn) continue;

                    DigitalValue digitalValue = new DigitalValue();
                    digitalValue.TagId = digitalInput.Id;
                    digitalValue.DateTime = DateTime.Now;
                    if (digitalInput.UseRtu)
                    {
                        digitalValue.Value = await RealTimeDriver.GetDigitalInputValue(digitalInput);
                    }
                    else
                    {
                        digitalValue.Value = await SimulationDriver.GetDigitalInputValue(digitalInput);
                    }
                    Context.DigitalValues.Add(digitalValue);
                    Context.SaveChanges();
                }
            }
        }
    }

    public void StartAnalogInput(AnalogInput analogInput)
    {
        Thread thread = new Thread(this.AnalogInputWorker);
        thread.Start(analogInput);
        threads.Add(thread);
    }
    public void StartDigitalInput(DigitalInput digitalInput)
    {
        Thread thread = new Thread(this.DigitalInputWorker);
        thread.Start(digitalInput);
        threads.Add(thread);
    }
    private async void StartInputTags()
    {
        List<AnalogInput> analogInputs = Context.AnalogInputs.ToList();
        foreach (AnalogInput analogInput in analogInputs)
        {
            StartAnalogInput(analogInput);
        }
        List<DigitalInput> digitalInputs = await Context.DigitalInputs.ToListAsync();
        foreach (DigitalInput digitalInput in digitalInputs)
        {
            StartDigitalInput(digitalInput);
        }
    }

    public async Task<bool> StartSystem()
    {
        if (threads.Count > 0)
        {
            return false;
        }
        StartInputTags();
        RealTimeDriver.Start();
        return true;
    }

    public async Task<bool> StopSystem()
    {
        threads.Clear();
        RealTimeDriver.Stop();
        return true;
    }

    public async Task<TrendingStateDto> GetTrendingState()
    {
        TrendingStateDto dto = new TrendingStateDto();
        List<AnalogInput> analogInputs = Context.AnalogInputs.ToList();
        foreach (AnalogInput analogInput in analogInputs)
        {
            AnalogValue? analogValue = Context.AnalogValues.OrderBy(x => x.DateTime).LastOrDefault(x => x.TagId == analogInput.Id);
            float value = 0;
            string time = "";
            if (analogValue != null)
            {
                value = analogValue.Value;
                time = analogValue.DateTime.ToString("dd/MM/yyyy HH:ss:ff");
            }
            List<Alarm> alarms = Context.Alarms.Where(x => x.TagId == analogInput.Id).ToList();
            dto.AnalogInputs.Add(new AnalogInputDto(analogInput, alarms, value, time));
        }
        List<DigitalInput> digitalInputs = Context.DigitalInputs.ToList();
        foreach (DigitalInput digitalInput in digitalInputs)
        {
            DigitalValue? digitalValue = Context.DigitalValues.OrderBy(x => x.DateTime).LastOrDefault(x => x.TagId == digitalInput.Id);
            bool value = false;
            string time = "";
            if (digitalValue != null)
            {
                value = digitalValue.Value;
                time = digitalValue.DateTime.ToString("dd/MM/yyyy HH:ss:ff");
            }
            dto.DigitalInputs.Add(new DigitalInputDto(digitalInput, value, time));
        }
        return dto;
    }

    public async Task<RealTimeUnit> CreateRealTimeUnit(CreateRealTimeUnitDto dto)
    {
        RealTimeUnit rtu = new RealTimeUnit();
        rtu.TagId = dto.TagId;
        rtu.WriteTime = dto.WriteTime;
        rtu.IsAnalog = dto.IsAnalog;
        EntityEntry<RealTimeUnit> result = await Context.RealTimeUnits.AddAsync(rtu);
        Context.SaveChanges();
        return result.Entity;
    }

    public async Task<RealTimeUnit> UpdateRealTimeUnit(CreateRealTimeUnitDto dto, int id)
    {
        RealTimeUnit rtu = await Context.RealTimeUnits.FirstAsync(x => x.Id == id);
        rtu.TagId = dto.TagId;
        rtu.WriteTime = dto.WriteTime;
        rtu.IsAnalog = dto.IsAnalog;
        Context.RealTimeUnits.Update(rtu);
        Context.SaveChanges();
        return rtu;
    }

    public async Task<RealTimeUnit> DeleteRealTimeUnit(int id)
    {
        RealTimeUnit rtu = await Context.RealTimeUnits.FirstAsync(x => x.Id == id);
        Context.RealTimeUnits.Remove(rtu);
        Context.SaveChanges();
        return rtu;
    }

    public async Task<List<RealTimeUnitDto>> GetAllRealTimeUnits()
    {
        List<RealTimeUnit> rtus = await Context.RealTimeUnits.ToListAsync();
        List<RealTimeUnitDto> result = new List<RealTimeUnitDto>();
        foreach (RealTimeUnit rtu in rtus)
        {
            result.Add(new RealTimeUnitDto(rtu));
        }
        return result;
    }
}