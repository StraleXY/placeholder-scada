
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class DigitalInputDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        // Address tag is writing to (number from 1 to 20)
        public int Address { get; set; }
        public int ScanTime { get; set; }
        public bool IsOn { get; set; }
        public bool UseRtu { get; set; }
        public bool CurrentValue { get; set; }
        public string ReadTime { get; set; }

        public DigitalInputDto(DigitalInput digitalInput, bool currentValue, string readTime)
        {
            Id = digitalInput.Id;
            Description = digitalInput.Description;
            Address = digitalInput.Address;
            ScanTime = digitalInput.ScanTime;
            IsOn = digitalInput.IsOn;
            CurrentValue = currentValue;
            ReadTime = readTime;
            UseRtu = digitalInput.UseRtu;
        }
    }
}