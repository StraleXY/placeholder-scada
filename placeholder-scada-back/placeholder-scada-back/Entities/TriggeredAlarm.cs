
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("triggered_alarm")]
    public class TriggeredAlarm
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("time")]
        public DateTime Time { get; set; }
        
        [Column("tag_value")]
        public float TagValue { get; set; }

        [Column("alarm_id")]
        public int AlarmId { get; set; }
    }
}