using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface ITagService
{
    Task<AnalogInput> CreateAnalogInput(CreateAnalogInputDto dto);
    Task<AnalogInput> OnOffScanAnalogInput(int id, bool scan);
    Task<AnalogInput> UpdateAnalogInput(CreateAnalogInputDto dto, int id);
    Task<AnalogInput> DeleteAnalogInput(int id);
    Task<AnalogOutput> CreateAnalogOutput(CreateAnalogOutputDto dto);
    Task<AnalogOutput> UpdateAnalogOutput(CreateAnalogOutputDto dto, int id);
    Task<AnalogOutput> DeleteAnalogOutput(int id);
    Task<DigitalInput> CreateDigitalInput(CreateDigitalInputDto dto);
    Task<DigitalInput> OnOffScanDigitalInput(int id, bool scan);
    Task<DigitalInput> UpdateDigitalInput(CreateDigitalInputDto dto, int id);
    Task<DigitalInput> DeleteDigitalInput(int id);
    Task<DigitalOutput> CreateDigitalOutput(CreateDigitalOutputDto dto);
    Task<DigitalOutput> UpdateDigitalOutput(CreateDigitalOutputDto dto, int id);
    Task<DigitalOutput> DeleteDigitalOutput(int id);

    Task<Alarm> CreateAlarm(CreateAlarmDto dto);
    Task<Alarm> DeleteAlarm(int id);

    Task<List<AnalogInputDto>> GetAnalogInputs();
    Task<List<AnalogOutputDto>> GetAnalogOutputs();
    Task<List<DigitalInputDto>> GetDigitalInputs();
    Task<List<DigitalOutputDto>> GetDigitalOutputs();
}

public class TagService : ITagService
{

    public required ScadaContext Context { get; set; }
    public required ICoreService CoreService { get; set; }

    public TagService(ScadaContext scadaContext, ICoreService coreService)
    {
        Context = scadaContext;
        CoreService = coreService;
    }

    private bool ShouldUseRtuAnalog(int address)
    {
        AnalogOutput? analogOutput = Context.AnalogOutputs.FirstOrDefault(x => x.Address == address);
        if (analogOutput != null)
        {
            RealTimeUnit? rtu = Context.RealTimeUnits.FirstOrDefault(x => x.TagId == analogOutput.Id);
            return rtu != null;
        }
        return false;
    }
    private bool ShouldUseRtuDigital(int address)
    {
        DigitalOutput? digitalOutput = Context.DigitalOutputs.FirstOrDefault(x => x.Address == address);
        if (digitalOutput != null)
        {
            RealTimeUnit? rtu = Context.RealTimeUnits.FirstOrDefault(x => x.TagId == digitalOutput.Id);
            return rtu != null;
        }
        return false;
    }

    public async Task<AnalogInput> CreateAnalogInput(CreateAnalogInputDto dto)
    {
        AnalogInput analogInput = new AnalogInput();
        analogInput.IsOn = true;
        analogInput.Address = dto.Address;
        analogInput.Units = dto.Units;
        analogInput.Description = dto.Description;
        analogInput.HighLimit = dto.HighLimit;
        analogInput.LowLimit = dto.LowLimit;
        analogInput.ScanTime = dto.ScanTime;
        analogInput.UseRtu = ShouldUseRtuAnalog(dto.Address);
        analogInput.Function = dto.Function.Equals("sin") ? SimulationFunction.SINE
            : dto.Function.Equals("cos") ? SimulationFunction.COSINE : SimulationFunction.RAMP;
        EntityEntry<AnalogInput> result = await Context.AnalogInputs.AddAsync(analogInput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogInputCacheLock)
        {
            GlobalVariables.AnalogInputCache[result.Entity.Id] = result.Entity;
        }
        CoreService.StartAnalogInput(result.Entity);
        Thread.Sleep(100);
        return result.Entity;
    }
    public async Task<AnalogInput> OnOffScanAnalogInput(int id, bool scan)
    {
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == id);
        analogInput.IsOn = scan;
        Context.AnalogInputs.Update(analogInput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogInputCacheLock)
        {
            GlobalVariables.AnalogInputCache[analogInput.Id] = analogInput;
        }
        return analogInput;
    }
    public async Task<AnalogInput> UpdateAnalogInput(CreateAnalogInputDto dto, int id)
    {
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == id);
        analogInput.Address = dto.Address;
        analogInput.Units = dto.Units;
        analogInput.Description = dto.Description;
        analogInput.HighLimit = dto.HighLimit;
        analogInput.LowLimit = dto.LowLimit;
        analogInput.ScanTime = dto.ScanTime;
        analogInput.UseRtu = ShouldUseRtuAnalog(dto.Address);
        analogInput.Function = dto.Function.Equals("sin") ? SimulationFunction.SINE
            : dto.Function.Equals("cos") ? SimulationFunction.COSINE : SimulationFunction.RAMP;
        Context.AnalogInputs.Update(analogInput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogInputCacheLock)
        {
            GlobalVariables.AnalogInputCache[analogInput.Id] = analogInput;
        }
        return analogInput;
    }

    public async Task<AnalogInput> DeleteAnalogInput(int id)
    {
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == id);
        Context.AnalogInputs.Remove(analogInput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogInputCacheLock)
        {
            if (GlobalVariables.AnalogInputCache.ContainsKey(analogInput.Id))
            {
                GlobalVariables.AnalogInputCache.Remove(analogInput.Id);
            }
        }
        return analogInput;
    }

    public async Task<AnalogOutput> CreateAnalogOutput(CreateAnalogOutputDto dto)
    {
        AnalogOutput analogOutput = new AnalogOutput();
        analogOutput.Address = dto.Address;
        analogOutput.Units = dto.Units;
        analogOutput.InitialValue = dto.InitialValue;
        analogOutput.HighLimit = dto.HighLimit;
        analogOutput.LowLimit = dto.LowLimit;
        analogOutput.Description = dto.Description;
        EntityEntry<AnalogOutput> result = await Context.AnalogOutputs.AddAsync(analogOutput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogOutputCacheLock)
        {
            GlobalVariables.AnalogOutputCache[result.Entity.Id] = result.Entity;
        }
        return result.Entity;
    }
    public async Task<AnalogOutput> UpdateAnalogOutput(CreateAnalogOutputDto dto, int id)
    {
        AnalogOutput analogOutput = await Context.AnalogOutputs.FirstAsync(x => x.Id == id);
        analogOutput.Address = dto.Address;
        analogOutput.Units = dto.Units;
        analogOutput.InitialValue = dto.InitialValue;
        analogOutput.HighLimit = dto.HighLimit;
        analogOutput.LowLimit = dto.LowLimit;
        analogOutput.Description = dto.Description;
        Context.AnalogOutputs.Update(analogOutput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogOutputCacheLock)
        {
            GlobalVariables.AnalogOutputCache[analogOutput.Id] = analogOutput;
        }
        return analogOutput;
    }

    public async Task<AnalogOutput> DeleteAnalogOutput(int id)
    {
        AnalogOutput analogOutput = await Context.AnalogOutputs.FirstAsync(x => x.Id == id);
        Context.AnalogOutputs.Remove(analogOutput);
        Context.SaveChanges();
        lock (GlobalVariables.AnalogOutputCacheLock)
        {
            if (GlobalVariables.AnalogOutputCache.ContainsKey(analogOutput.Id))
            {
                GlobalVariables.AnalogOutputCache.Remove(analogOutput.Id);
            }
        }
        return analogOutput;
    }

    public async Task<DigitalInput> CreateDigitalInput(CreateDigitalInputDto dto)
    {
        DigitalInput digitalInput = new DigitalInput();
        digitalInput.Address = dto.Address;
        digitalInput.Description = dto.Description;
        digitalInput.ScanTime = dto.ScanTime;
        digitalInput.UseRtu = ShouldUseRtuDigital(dto.Address);
        digitalInput.IsOn = true;
        EntityEntry<DigitalInput> result = await Context.DigitalInputs.AddAsync(digitalInput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalInputCacheLock)
        {
            GlobalVariables.DigitalInputCache[result.Entity.Id] = result.Entity;
        }
        CoreService.StartDigitalInput(result.Entity);
        Thread.Sleep(100);
        return result.Entity;
    }
    public async Task<DigitalInput> OnOffScanDigitalInput(int id, bool scan)
    {
        DigitalInput digitalInput = await Context.DigitalInputs.FirstAsync(x => x.Id == id);
        digitalInput.IsOn = scan;
        Context.DigitalInputs.Update(digitalInput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalInputCacheLock)
        {
            GlobalVariables.DigitalInputCache[digitalInput.Id] = digitalInput;
        }
        return digitalInput;
    }
    public async Task<DigitalInput> UpdateDigitalInput(CreateDigitalInputDto dto, int id)
    {
        DigitalInput digitalInput = await Context.DigitalInputs.FirstAsync(x => x.Id == id);
        digitalInput.Address = dto.Address;
        digitalInput.Description = dto.Description;
        digitalInput.ScanTime = dto.ScanTime;
        digitalInput.UseRtu = ShouldUseRtuDigital(dto.Address);
        Context.DigitalInputs.Update(digitalInput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalInputCacheLock)
        {
            GlobalVariables.DigitalInputCache[digitalInput.Id] = digitalInput;
        }
        return digitalInput;
    }

    public async Task<DigitalInput> DeleteDigitalInput(int id)
    {
        DigitalInput digitalInput = await Context.DigitalInputs.FirstAsync(x => x.Id == id);
        Context.DigitalInputs.Remove(digitalInput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalInputCacheLock)
        {
            if (GlobalVariables.DigitalInputCache.ContainsKey(digitalInput.Id))
            {
                GlobalVariables.DigitalInputCache.Remove(digitalInput.Id);
            }
        }
        return digitalInput;
    }

    public async Task<DigitalOutput> CreateDigitalOutput(CreateDigitalOutputDto dto)
    {
        DigitalOutput digitalOutput = new DigitalOutput();
        digitalOutput.Address = dto.Address;
        digitalOutput.Description = dto.Description;
        digitalOutput.InitialValue = dto.InitialValue == 1;
        EntityEntry<DigitalOutput> result = await Context.DigitalOutputs.AddAsync(digitalOutput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalOutputCacheLock)
        {
            GlobalVariables.DigitalOutputCache[result.Entity.Id] = result.Entity;
        }
        return result.Entity;
    }
    public async Task<DigitalOutput> UpdateDigitalOutput(CreateDigitalOutputDto dto, int id)
    {
        DigitalOutput digitalOutput = await Context.DigitalOutputs.FirstAsync(x => x.Id == id);
        digitalOutput.Address = dto.Address;
        digitalOutput.Description = dto.Description;
        digitalOutput.InitialValue = dto.InitialValue == 1;
        Context.DigitalOutputs.Update(digitalOutput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalOutputCacheLock)
        {
            GlobalVariables.DigitalOutputCache[digitalOutput.Id] = digitalOutput;
        }
        return digitalOutput;
    }

    public async Task<DigitalOutput> DeleteDigitalOutput(int id)
    {
        DigitalOutput digitalOutput = await Context.DigitalOutputs.FirstAsync(x => x.Id == id);
        Context.DigitalOutputs.Remove(digitalOutput);
        Context.SaveChanges();
        lock (GlobalVariables.DigitalOutputCacheLock)
        {
            if (GlobalVariables.DigitalOutputCache.ContainsKey(digitalOutput.Id))
            {
                GlobalVariables.DigitalOutputCache.Remove(digitalOutput.Id);
            }
        }
        return digitalOutput;
    }

    public async Task<Alarm> CreateAlarm(CreateAlarmDto dto)
    {
        Alarm alarm = new Alarm();
        alarm.Priority = dto.Priority;
        alarm.Threshold = dto.Threshold;
        alarm.TagId = dto.TagId;
        alarm.Type = dto.Type == 0 ? AlarmType.LOW : AlarmType.HIGH;
        EntityEntry<Alarm> result = await Context.Alarms.AddAsync(alarm);
        Context.SaveChanges();
        return result.Entity;
    }

    public async Task<Alarm> DeleteAlarm(int id)
    {
        Alarm alarm = await Context.Alarms.FirstAsync(x => x.Id == id);
        Context.Alarms.Remove(alarm);
        Context.SaveChanges();
        return alarm;
    }

    public async Task<List<AnalogInputDto>> GetAnalogInputs()
    {
        List<AnalogInput> analogInputs = await Context.AnalogInputs.ToListAsync();
        List<AnalogInputDto> result = new List<AnalogInputDto>();
        foreach (AnalogInput analogInput in analogInputs)
        {
            List<Alarm> alarms = Context.Alarms.Where(x => x.TagId == analogInput.Id).ToList();
            result.Add(new AnalogInputDto(analogInput, alarms, 0, ""));
        }
        return result;
    }

    public async Task<List<AnalogOutputDto>> GetAnalogOutputs()
    {
        List<AnalogOutput> analogOutputs = await Context.AnalogOutputs.ToListAsync();
        List<AnalogOutputDto> result = new List<AnalogOutputDto>();
        foreach (AnalogOutput analogOutput in analogOutputs)
        {
            result.Add(new AnalogOutputDto(analogOutput));
        }
        return result;
    }

    public async Task<List<DigitalInputDto>> GetDigitalInputs()
    {
        List<DigitalInput> digitalInputs = await Context.DigitalInputs.ToListAsync();
        List<DigitalInputDto> result = new List<DigitalInputDto>();
        foreach (DigitalInput digitalInput in digitalInputs)
        {
            result.Add(new DigitalInputDto(digitalInput, false, ""));
        }
        return result;
    }

    public async Task<List<DigitalOutputDto>> GetDigitalOutputs()
    {
        List<DigitalOutput> digitalOutputs = await Context.DigitalOutputs.ToListAsync();
        List<DigitalOutputDto> result = new List<DigitalOutputDto>();
        foreach (DigitalOutput digitalOutput in digitalOutputs)
        {
            result.Add(new DigitalOutputDto(digitalOutput));
        }
        return result;
    }
}