using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface IRealTimeDriver : IDriver
{
    void Start();
    void Stop();
    void RunRtu(AnalogOutput analogOutput);
    void RunRtu(DigitalOutput digitalOutput);
}

public class RealTimeDriver : IRealTimeDriver
{

    public required ScadaContext Context { get; set; }
    public Random Rng { get; set; }
    public required IServiceProvider Services { get; set; }
    
    public RealTimeDriver(ScadaContext scadaContext, IServiceProvider services)
    {
        Context = scadaContext;
        AnalogTable = new float[21];
        DigitalTable = new bool[21];
        Rng = new Random();
        Threads = new List<Thread>();
        Services = services;
    }

    public float[] AnalogTable { get; set; }
    public bool[] DigitalTable { get; set; }

    public List<Thread> Threads { get; set; }

    public async void RealTimeUnitWorker(object? realTimeUnitObj)
    {
        using (var scope = Services.CreateScope())
        {
            var Context = scope.ServiceProvider.GetRequiredService<ScadaContext>();

            RealTimeUnit? rtu = realTimeUnitObj as RealTimeUnit;
            if (rtu != null)
            {
                while (true)
                {
                    Thread.Sleep(rtu.WriteTime);
                    rtu = Context.RealTimeUnits.First(x => x.Id == rtu.Id);
                    if (rtu.IsAnalog)
                    {
                        AnalogOutput analogOutput = Context.AnalogOutputs.First(x => x.Id == rtu.TagId);
                        RunRtu(analogOutput);
                    }
                    else
                    {
                        DigitalOutput digitalOutput = Context.DigitalOutputs.First(x => x.Id == rtu.TagId);
                        RunRtu(digitalOutput);
                    }
                }
            }
        }
    }

    public async Task<float> GetAnalogInputValue(AnalogInput analogInput)
    {
        return Math.Max(analogInput.LowLimit, Math.Min(analogInput.HighLimit, AnalogTable[analogInput.Address]));
    }

    public async Task<bool> GetDigitalInputValue(DigitalInput digitalInput)
    {
        return DigitalTable[digitalInput.Address];
    }

    public void Start()
    {
        List<AnalogOutput> analogOutputs = Context.AnalogOutputs.ToList();
        foreach (AnalogOutput analogOutput in analogOutputs)
        {
            AnalogTable[analogOutput.Address] = analogOutput.InitialValue;
        }
        List<DigitalOutput> digitalOutputs = Context.DigitalOutputs.ToList();
        foreach (DigitalOutput digitalOutput in digitalOutputs)
        {
            DigitalTable[digitalOutput.Address] = digitalOutput.InitialValue;
        }
        List<RealTimeUnit> rtus = Context.RealTimeUnits.ToList();
        foreach (RealTimeUnit rtu in rtus)
        {
            Thread thread = new Thread(RealTimeUnitWorker);
            thread.Start(rtu);
            Threads.Add(thread);
        }
    }

    public void Stop()
    {
        Threads.Clear();
    }

    public void RunRtu(AnalogOutput analogOutput)
    {
        AnalogTable[analogOutput.Address] = (float)Rng.NextDouble() 
            * (analogOutput.HighLimit - analogOutput.LowLimit) 
            + analogOutput.LowLimit;
    }

    public void RunRtu(DigitalOutput digitalOutput)
    {
        DigitalTable[digitalOutput.Address] = Rng.Next(2) == 0;
    }
}