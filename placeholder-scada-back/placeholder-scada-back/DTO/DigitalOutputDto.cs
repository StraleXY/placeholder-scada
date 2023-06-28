
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class DigitalOutputDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        // Address tag is reading from (number from 1 to 20)
        public int Address { get; set; }
        public bool InitialValue { get; set; }

        public DigitalOutputDto(DigitalOutput digitalOutput) 
        {
            Id = digitalOutput.Id;
            Description = digitalOutput.Description;
            Address = digitalOutput.Address;
            InitialValue = digitalOutput.InitialValue;
        }
    }
}