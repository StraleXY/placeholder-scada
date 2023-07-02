
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class CreateDigitalOutputDto
    {
        public string Description { get; set; }
        // Address tag is reading from (number from 1 to 20)
        public int Address { get; set; }
        public int InitialValue { get; set; }
    }
}