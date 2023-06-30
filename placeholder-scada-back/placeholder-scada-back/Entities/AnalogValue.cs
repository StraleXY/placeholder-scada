
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("analog_value")]
    public class AnalogValue
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("tag_id")]
        public int TagId { get; set; }

        [Column("value")]
        public float Value { get; set; }

        [Column("date_time")]
        public DateTime DateTime { get; set; }
    }
}