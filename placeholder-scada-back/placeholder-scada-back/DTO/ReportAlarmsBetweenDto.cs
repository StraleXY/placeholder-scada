
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class ReportAlarmsBetweenDto
    {
        public string From { get; set; }
        public string To { get; set; }
        public int SortBy { get; set; }
        
    }
}