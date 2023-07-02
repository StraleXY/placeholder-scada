
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class CreateRealTimeUnitDto
    {
        public bool IsAnalog { get; set; }
        public int TagId { get; set; }
        // RTU will write to table every WriteTime ms
        public int WriteTime { get; set; }
    }
}