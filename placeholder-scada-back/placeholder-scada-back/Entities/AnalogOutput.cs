
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("analog_output")]
    public class AnalogOutput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("tag_name")]
        public int TagName { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("address")]
        public int Address { get; set; }

        [Column("initial_value")]
        public float InitialValue { get; set; }
        
        [Column("low_limit")]
        public float LowLimit { get; set; }

        [Column("high_limit")]
        public float HighLimit { get; set; }

        [Column("units")]
        public string? Units { get; set; }
    }
}