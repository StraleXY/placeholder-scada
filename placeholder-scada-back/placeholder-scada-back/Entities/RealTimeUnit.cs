
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("real_time_unit")]
    public class RealTimeUnit
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("is_analog")]
        public bool IsAnalog { get; set; }

        [Column("tag_id")]
        public int TagId { get; set; }

        [Column("write_time")]
        public int WriteTime { get; set; }
    }
}