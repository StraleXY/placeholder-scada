
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class TrendingStateDto
    {
        public List<AnalogInputDto> AnalogInputs { get; set; }
        public List<DigitalInputDto> DigitalInputs { get; set; }
        public TrendingStateDto() 
        {
            AnalogInputs = new List<AnalogInputDto>();
            DigitalInputs = new List<DigitalInputDto>();
        }
    }
}