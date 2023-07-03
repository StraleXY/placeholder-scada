using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface ISimulationDriver : IDriver
{
}

public class SimulationDriver : ISimulationDriver
{

    public required ScadaContext Context { get; set; }

    public SimulationDriver(ScadaContext scadaContext)
    {
        Context = scadaContext;
    }

    private static float Fix(float value, float currLow, float currHigh, float newLow, float newHigh)
    {
        return (value - currLow) / (currHigh - currLow) * (newHigh - newLow) + newLow;
    }
    private static float Sine(float low, float high)
    {
        return Fix((float)Math.Sin((float)DateTime.Now.Second / 60 * Math.PI), -1, 1, low, high);
    }
    private static float Cosine(float low, float high)
    {
        return Fix((float)Math.Cos((float)DateTime.Now.Second / 60 * Math.PI), -1, 1, low, high);
    }
    private static float Ramp(float low, float high)
    {
        return Fix((float)DateTime.Now.Second / 60, 0, 1, low, high);
    }

    public async Task<float> GetAnalogInputValue(AnalogInput analogInput)
    {
        if (analogInput.Function == SimulationFunction.SINE)
        {
            return Sine(analogInput.LowLimit, analogInput.HighLimit);
        }
        else if (analogInput.Function == SimulationFunction.COSINE)
        {
            return Cosine(analogInput.LowLimit, analogInput.HighLimit);
        }
        else
        {
            return Ramp(analogInput.LowLimit, analogInput.HighLimit);
        }
    }

    public async Task<bool> GetDigitalInputValue(DigitalInput digitalInput)
    {
        return (DateTime.Now.Second % 10 <= 5 ? true : false) ^ (DateTime.Now.Minute % 2 == 0);
    }
}