
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class AnalogInputDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        // Address tag is writing to (number from 1 to 20)
        public int Address { get; set; }
        public float ScanTime { get; set; }
        public float LowLimit { get; set; }
        public float HighLimit { get; set; }
        public string? Units { get; set; }
        public List<AlarmDto> Alarms { get; set; }
        public bool IsOn { get; set; }
        public float CurrentValue { get; set; }
        public string ReadTime { get; set; }

        public AnalogInputDto(AnalogInput analogInput, float currentValue, string readTime) 
        {
            Id = analogInput.Id;
            Description = analogInput.Description;
            Address = analogInput.Address;
            ScanTime = analogInput.ScanTime;
            LowLimit = analogInput.LowLimit;
            HighLimit = analogInput.HighLimit;
            Units = analogInput.Units;
            Alarms = new List<AlarmDto>();
            if (analogInput.Alarms != null)
            {
                foreach(Alarm alarm in analogInput.Alarms)
                {
                    Alarms.Add(new AlarmDto(alarm));
                }
            }
            IsOn = analogInput.IsOn;
            CurrentValue = currentValue;
            ReadTime = readTime;
        }
    }
}