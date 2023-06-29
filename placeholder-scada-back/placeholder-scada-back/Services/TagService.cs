using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace placeholder_scada_back.Services;

public interface ITagService
{
    Task<AnalogInput> CreateAnalogInput(CreateAnalogInputDto dto);
    Task<AnalogInput> UpdateAnalogInput(CreateAnalogInputDto dto, int id);
    Task<AnalogInput> DeleteAnalogInput(int id);
    Task<AnalogOutput> CreateAnalogOutput(CreateAnalogOutputDto dto);
    Task<AnalogOutput> UpdateAnalogOutput(CreateAnalogOutputDto dto, int id);
    Task<AnalogOutput> DeleteAnalogOutput(int id);
    Task<DigitalInput> CreateDigitalInput(CreateDigitalInputDto dto);
    Task<DigitalInput> UpdateDigitalInput(CreateDigitalInputDto dto, int id);
    Task<DigitalInput> DeleteDigitalInput(int id);
    Task<DigitalOutput> CreateDigitalOutput(CreateDigitalOutputDto dto);
    Task<DigitalOutput> UpdateDigitalOutput(CreateDigitalOutputDto dto, int id);
    Task<DigitalOutput> DeleteDigitalOutput(int id);

    Task<Alarm> CreateAlarm(CreateAlarmDto dto);
    Task<Alarm> DeleteAlarm(int id);
}

public class TagService : ITagService
{

    public required ScadaContext Context { get; set; }

    public TagService(ScadaContext scadaContext) { Context = scadaContext; }

    public async Task<AnalogInput> CreateAnalogInput(CreateAnalogInputDto dto)
    {
        AnalogInput analogInput = new AnalogInput();
        analogInput.Alarms = new List<Alarm>();
        analogInput.IsOn = true;
        analogInput.Address = dto.Address;
        analogInput.Units = dto.Units;
        analogInput.Description = dto.Description;
        analogInput.HighLimit = dto.HighLimit;
        analogInput.LowLimit = dto.LowLimit;
        analogInput.ScanTime = dto.ScanTime;
        EntityEntry<AnalogInput> result = await Context.AnalogInputs.AddAsync(analogInput);
        Context.SaveChanges();
        return result.Entity;
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
        Context.AnalogInputs.Update(analogInput);
        Context.SaveChanges();
        return analogInput;
    }

    public async Task<AnalogInput> DeleteAnalogInput(int id)
    {
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == id);
        Context.AnalogInputs.Remove(analogInput);
        Context.SaveChanges();
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
        return analogOutput;
    }

    public async Task<AnalogOutput> DeleteAnalogOutput(int id)
    {
        AnalogOutput analogOutput = await Context.AnalogOutputs.FirstAsync(x => x.Id == id);
        Context.AnalogOutputs.Remove(analogOutput);
        Context.SaveChanges();
        return analogOutput;
    }

    public async Task<DigitalInput> CreateDigitalInput(CreateDigitalInputDto dto)
    {
        DigitalInput digitalInput = new DigitalInput();
        digitalInput.Address = dto.Address;
        digitalInput.Description = dto.Description;
        digitalInput.ScanTime = dto.ScanTime;
        digitalInput.IsOn = true;
        EntityEntry<DigitalInput> result = await Context.DigitalInputs.AddAsync(digitalInput);
        Context.SaveChanges();
        return result.Entity;
    }
    public async Task<DigitalInput> UpdateDigitalInput(CreateDigitalInputDto dto, int id)
    {
        DigitalInput digitalInput = await Context.DigitalInputs.FirstAsync(x => x.Id == id);
        digitalInput.Address = dto.Address;
        digitalInput.Description = dto.Description;
        digitalInput.ScanTime = dto.ScanTime;
        digitalInput.IsOn = true;
        Context.DigitalInputs.Update(digitalInput);
        Context.SaveChanges();
        return digitalInput;
    }

    public async Task<DigitalInput> DeleteDigitalInput(int id)
    {
        DigitalInput digitalInput = await Context.DigitalInputs.FirstAsync(x => x.Id == id);
        Context.DigitalInputs.Remove(digitalInput);
        Context.SaveChanges();
        return digitalInput;
    }

    public async Task<DigitalOutput> CreateDigitalOutput(CreateDigitalOutputDto dto)
    {
        DigitalOutput digitalOutput = new DigitalOutput();
        digitalOutput.Address = dto.Address;
        digitalOutput.Description = dto.Description;
        digitalOutput.InitialValue = dto.InitialValue;
        EntityEntry<DigitalOutput> result = await Context.DigitalOutputs.AddAsync(digitalOutput);
        Context.SaveChanges();
        return result.Entity;
    }
    public async Task<DigitalOutput> UpdateDigitalOutput(CreateDigitalOutputDto dto, int id)
    {
        DigitalOutput digitalOutput = await Context.DigitalOutputs.FirstAsync(x => x.Id == id);
        digitalOutput.Address = dto.Address;
        digitalOutput.Description = dto.Description;
        digitalOutput.InitialValue = dto.InitialValue;
        Context.DigitalOutputs.Update(digitalOutput);
        Context.SaveChanges();
        return digitalOutput;
    }

    public async Task<DigitalOutput> DeleteDigitalOutput(int id)
    {
        DigitalOutput digitalOutput = await Context.DigitalOutputs.FirstAsync(x => x.Id == id);
        Context.DigitalOutputs.Remove(digitalOutput);
        Context.SaveChanges();
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
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == alarm.TagId);
        analogInput.Alarms?.Add(result.Entity);
        Context.AnalogInputs.Update(analogInput);
        Context.SaveChanges();
        return result.Entity;
    }

    public async Task<Alarm> DeleteAlarm(int id)
    {
        Alarm alarm = await Context.Alarms.FirstAsync(x => x.Id == id);
        AnalogInput analogInput = await Context.AnalogInputs.FirstAsync(x => x.Id == alarm.TagId);
        analogInput.Alarms?.Remove(alarm);
        Context.AnalogInputs.Update(analogInput);
        Context.Alarms.Remove(alarm);
        Context.SaveChanges();
        return alarm;
    }
}