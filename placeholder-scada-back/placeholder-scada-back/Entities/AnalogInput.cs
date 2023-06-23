
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("analog_input")]
    public class AnalogInput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("tag_name")]
        public int TagName { get; set; }

        [Column("description")]
        public string? Description { get; set; }
        
        [Column("driver")]
        public int Driver { get; set; }

        [Column("address")]
        public int Address { get; set; }

        [Column("scan_time")]
        public float ScanTime { get; set; }

        [Column("alarms")]
        public List<Alarm>? Alarms { get; set; }

        [Column("is_on")]
        public bool IsOn { get; set; }

        [Column("low_limit")]
        public float LowLimit { get; set; }

        [Column("high_limit")]
        public float HighLimit { get; set; }

        [Column("units")]
        public string? Units { get; set; }
    }
}