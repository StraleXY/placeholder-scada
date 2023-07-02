
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class RealTimeUnitDto
    {
        public int Id { get; set; }
        public bool IsAnalog { get; set; }
        public int TagId { get; set; }
        public int WriteTime { get; set; }
        public RealTimeUnitDto(RealTimeUnit rtu)
        {
            Id = rtu.Id;
            IsAnalog = rtu.IsAnalog;
            TagId = rtu.TagId;
            WriteTime = rtu.WriteTime;
        }
    }
}