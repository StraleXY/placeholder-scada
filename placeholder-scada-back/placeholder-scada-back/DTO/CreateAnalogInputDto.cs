
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class CreateAnalogInputDto
    {
        public string Description { get; set; }
        // Address tag is writing to (number from 1 to 20)
        public int Address { get; set; }
        public float ScanTime { get; set; }
        public float LowLimit { get; set; }
        public float HighLimit { get; set; }
        public string Units { get; set; }
    }
}