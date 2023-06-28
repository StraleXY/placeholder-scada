
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    [Table("digital_output")]
    public class DigitalOutput
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("address")]
        public int Address { get; set; }

        [Column("initial_value")]
        public bool InitialValue { get; set; }
    }
}