
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    public enum AlarmType 
    {
        LOW, HIGH
    }

    [Table("alarm")]
    public class Alarm
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("type")]
        public AlarmType Type { get; set; }

        [Column("priority")]
        public int Priority { get; set; }

        [Column("tag_id")]
        public int TagId { get; set; }
    }
}