
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class AnalogOutputDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        // Address tag is reading from (number from 1 to 20)
        public int Address { get; set; }
        public float InitialValue { get; set; }
        public float LowLimit { get; set; }
        public float HighLimit { get; set; }
        public string? Units { get; set; }

        public AnalogOutputDto(AnalogOutput analogOutput)
        {
            Id = analogOutput.Id;
            Description = analogOutput.Description;
            Address = analogOutput.Address;
            InitialValue = analogOutput.InitialValue;
            LowLimit = analogOutput.LowLimit;
            HighLimit = analogOutput.HighLimit;
            Units = analogOutput.Units;
        }
    }
}