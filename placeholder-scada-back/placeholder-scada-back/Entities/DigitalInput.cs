
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("digital_input")]
    public class DigitalInput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("address")]
        public int Address { get; set; }

        [Column("scan_time")]
        public int ScanTime { get; set; }

        [Column("is_on")]
        public bool IsOn { get; set; }
        [Column("use_rtu")]
        public bool UseRtu { get; set; }
    }
}