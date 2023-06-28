
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class AlarmDto
    {
        public int Id { get; set; }
        // 0 - LOW, 1 - HIGH
        public int Type { get; set; }
        // 1, 2 or 3
        public int Priority { get; set; }
        // Id of tag that contains this alarm
        public int TagId { get; set; }
        public float Threshold { get; set; }

        public AlarmDto(Alarm alarm) 
        {
            Id = alarm.Id;
            Type = alarm.Type == AlarmType.LOW ? 0 : 1;
            Priority = alarm.Priority;
            TagId = alarm.TagId;
            Threshold = alarm.Threshold;
        }
    }
}