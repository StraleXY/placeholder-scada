
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    public enum SimulationFunction
    {
        SINE, COSINE, RAMP
    }

    [Table("analog_input")]
    public class AnalogInput
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
        [Column("function")]
        public SimulationFunction Function { get; set; }

        [Column("low_limit")]
        public float LowLimit { get; set; }

        [Column("high_limit")]
        public float HighLimit { get; set; }

        [Column("units")]
        public string? Units { get; set; }
    }
}