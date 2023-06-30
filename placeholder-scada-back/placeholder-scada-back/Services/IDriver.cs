using placeholder_scada_back.Entities;

namespace placeholder_scada_back.Services;

public interface IDriver
{
    Task<float> GetAnalogInputValue(AnalogInput analogInput);
    Task<bool> GetDigitalInputValue(DigitalInput digitalInput);
}