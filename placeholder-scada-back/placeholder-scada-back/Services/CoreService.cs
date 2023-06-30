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
}

public class CoreService : ICoreService
{
    private readonly object _alarmsLogLock = new object();
    public required ScadaContext Context { get; set; }
    public required ISimulationDriver SimulationDriver { get; set; }
    public required IRealTimeDriver RealTimeDriver { get; set; }

    public CoreService(ScadaContext scadaContext, ISimulationDriver simulationDriver, IRealTimeDriver realTimeDriver)
    {
        Context = scadaContext;
        threads = new List<Thread>();
        SimulationDriver = simulationDriver;
        RealTimeDriver = realTimeDriver;
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

    private void TriggerAlarm(Alarm alarm, float value)
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
                if (analogInput.Alarms != null)
                {
                    foreach (Alarm alarm in analogInput.Alarms)
                    {
                        if (alarm.Type == AlarmType.HIGH)
                        {
                            if (alarm.Threshold < analogValue.Value)
                            {
                                TriggerAlarm(alarm, analogValue.Value);
                            }
                        } else
                        {
                            if (alarm.Threshold > analogValue.Value)
                            {
                                TriggerAlarm(alarm, analogValue.Value);
                            }
                        }
                    }
                }
            }
        }
    }

    public async void DigitalInputWorker(object? digitalInputObj)
    {
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

    public async void AnalogOutputWorker(object? analogOutputObj)
    {
        AnalogOutput? analogOutput = analogOutputObj as AnalogOutput;
        if (analogOutput != null)
        {
            while (true)
            {
                Thread.Sleep(3000);
                RealTimeDriver.RunRtu(analogOutput);
            }
        }
    }
    public async void DigitalOutputWorker(object? digitalOutputObj)
    {
        DigitalOutput? digitalOutput = digitalOutputObj as DigitalOutput;
        if (digitalOutput != null)
        {
            while (true)
            {
                Thread.Sleep(3000);
                RealTimeDriver.RunRtu(digitalOutput);
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
    public void StartAnalogOutput(AnalogOutput analogOutput)
    {
        Thread thread = new Thread(this.AnalogOutputWorker);
        thread.Start(analogOutput);
        threads.Add(thread);
    }
    public void StartDigitalOutput(DigitalOutput digitalOutput)
    {
        Thread thread = new Thread(this.DigitalOutputWorker);
        thread.Start(digitalOutput);
        threads.Add(thread);
    }
    private async void StartInputTags()
    {
        List<AnalogInput> analogInputs = await Context.AnalogInputs.ToListAsync();
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

    private async void StartOutputTags()
    {
        RealTimeDriver.Init();
        List<AnalogOutput> analogOutputs = await Context.AnalogOutputs.ToListAsync();
        foreach (AnalogOutput analogOutput in analogOutputs)
        {
            StartAnalogOutput(analogOutput);
        }
        List<DigitalOutput> digitalOutputs = await Context.DigitalOutputs.ToListAsync();
        foreach (DigitalOutput digitalOutput in digitalOutputs)
        {
            StartDigitalOutput(digitalOutput);
        }
    }

    public async Task<bool> StartSystem()
    {
        StartInputTags();
        StartOutputTags();
        return true;
    }

    public async Task<bool> StopSystem()
    {
        threads.Clear();
        return true;
    }

    public async Task<TrendingStateDto> GetTrendingState()
    {
        TrendingStateDto dto = new TrendingStateDto();
        List<AnalogInput> analogInputs = await Context.AnalogInputs.ToListAsync();
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
            dto.AnalogInputs.Add(new AnalogInputDto(analogInput, value, time));
        }
        List<DigitalInput> digitalInputs = await Context.DigitalInputs.ToListAsync();
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
}