
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class TriggeredAlarmDto
    {
        public int Id { get; set; }
        // 0 - LOW, 1 - HIGH
        public int Type { get; set; }
        // 1, 2 or 3
        public int Priority { get; set; }
        // Id of tag that contains this alarm
        public int TagId { get; set; }
        public float Threshold { get; set; }
        public string Time { get; set; }
        public float TagValue { get; set; }

        public TriggeredAlarmDto(TriggeredAlarm triggeredAlarm, Alarm alarm)
        {
            Id = alarm.Id;
            Type = alarm.Type == AlarmType.LOW ? 0 : 1;
            Priority = alarm.Priority;
            TagId = alarm.TagId;
            Threshold = alarm.Threshold;
            TagValue = triggeredAlarm.TagValue;
            Time = triggeredAlarm.Time.ToString("dd/MM/yyyy HH:ss:fff");
        }
    }
}