
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class CreateAlarmDto
    {
        // 0 - LOW, 1 - HIGH
        public int Type { get; set; }
        // 1, 2 or 3
        public int Priority { get; set; }
        // Id of tag that contains this alarm
        public int TagId { get; set; }
        public float Threshold { get; set; }
    }
}