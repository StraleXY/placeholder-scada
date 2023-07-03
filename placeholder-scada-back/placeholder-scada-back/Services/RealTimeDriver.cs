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
    void StartRtu(RealTimeUnit rtu);
}

public class RealTimeDriver : IRealTimeDriver
{

    public required ScadaContext Context { get; set; }
    public required IServiceProvider Services { get; set; }
    
    public RealTimeDriver(ScadaContext scadaContext, IServiceProvider services)
    {
        Context = scadaContext;
        Services = services;
    }

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
                    rtu = Context.RealTimeUnits.FirstOrDefault(x => x.Id == rtu.Id);
                    if (rtu == null) return;

                    if (rtu.IsAnalog)
                    {
                        AnalogOutput? analogOutput = null;
                        lock (GlobalVariables.AnalogOutputCacheLock)
                        {
                            if (GlobalVariables.AnalogOutputCache.ContainsKey(rtu.TagId))
                            {
                                analogOutput = GlobalVariables.AnalogOutputCache[rtu.TagId];
                            }
                            else
                            {
                                analogOutput = Context.AnalogOutputs.FirstOrDefault(x => x.Id == rtu.TagId);
                            }
                        }
                        if (analogOutput != null)
                        {
                            RunRtu(analogOutput);
                        }
                    }
                    else
                    {
                        DigitalOutput? digitalOutput = null;
                        lock (GlobalVariables.DigitalOutputCacheLock)
                        {
                            if (GlobalVariables.DigitalOutputCache.ContainsKey(rtu.TagId))
                            {
                                digitalOutput = GlobalVariables.DigitalOutputCache[rtu.TagId];
                            }
                            else
                            {
                                digitalOutput = Context.DigitalOutputs.First(x => x.Id == rtu.TagId);
                            }
                        }
                        if (digitalOutput != null)
                        {
                            RunRtu(digitalOutput);
                        }
                    }
                }
            }
        }
    }

    public async Task<float> GetAnalogInputValue(AnalogInput analogInput)
    {
        return Math.Max(analogInput.LowLimit, Math.Min(analogInput.HighLimit, GlobalVariables.AnalogTable[analogInput.Address]));
    }

    public async Task<bool> GetDigitalInputValue(DigitalInput digitalInput)
    {
        return GlobalVariables.DigitalTable[digitalInput.Address];
    }

    public void StartRtu(RealTimeUnit rtu)
    {
        lock (GlobalVariables.WorkersLock)
        {
            if (!GlobalVariables.RTUWorkers.ContainsKey(rtu.Id))
            {
                Thread thread = new Thread(RealTimeUnitWorker);
                thread.Start(rtu);
                thread.IsBackground = true;
                GlobalVariables.RTUWorkers[rtu.Id] = thread;
            }
        }
    }
    public void Start()
    {
        List<AnalogOutput> analogOutputs = Context.AnalogOutputs.ToList();
        foreach (AnalogOutput analogOutput in analogOutputs)
        {
            GlobalVariables.AnalogTable[analogOutput.Address] = analogOutput.InitialValue;
        }
        List<DigitalOutput> digitalOutputs = Context.DigitalOutputs.ToList();
        foreach (DigitalOutput digitalOutput in digitalOutputs)
        {
            GlobalVariables.DigitalTable[digitalOutput.Address] = digitalOutput.InitialValue;
        }
        List<RealTimeUnit> rtus = Context.RealTimeUnits.ToList();
        foreach (RealTimeUnit rtu in rtus)
        {
            StartRtu(rtu);
        }
    }

    public void Stop()
    {
        lock (GlobalVariables.WorkersLock)
        {
            GlobalVariables.RTUWorkers.Clear();
        }
    }

    public void RunRtu(AnalogOutput analogOutput)
    {
        lock (GlobalVariables.RngLock)
        {
            GlobalVariables.AnalogTable[analogOutput.Address] = (float)GlobalVariables.Rng.NextDouble()
                * (analogOutput.HighLimit - analogOutput.LowLimit)
                + analogOutput.LowLimit;
        }
    }

    public void RunRtu(DigitalOutput digitalOutput)
    {
        lock (GlobalVariables.RngLock)
        {
            GlobalVariables.DigitalTable[digitalOutput.Address] = GlobalVariables.Rng.Next(2) == 0;
        }
    }
}