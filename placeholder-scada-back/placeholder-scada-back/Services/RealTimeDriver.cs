using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface IRealTimeDriver : IDriver
{
    void Init();
    void RunRtu(AnalogOutput analogOutput);
    void RunRtu(DigitalOutput digitalOutput);
}

public class RealTimeDriver : IRealTimeDriver
{

    public required ScadaContext Context { get; set; }
    public Random Rng { get; set; }
    
    public RealTimeDriver(ScadaContext scadaContext)
    {
        Context = scadaContext;
        AnalogTable = new float[21];
        DigitalTable = new bool[21];
        Rng = new Random();
    }

    public float[] AnalogTable { get; set; }
    public bool[] DigitalTable { get; set; }

    public async Task<float> GetAnalogInputValue(AnalogInput analogInput)
    {
        return Math.Max(analogInput.LowLimit, Math.Min(analogInput.HighLimit, AnalogTable[analogInput.Address]));
    }

    public async Task<bool> GetDigitalInputValue(DigitalInput digitalInput)
    {
        return DigitalTable[digitalInput.Address];
    }

    public void Init()
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