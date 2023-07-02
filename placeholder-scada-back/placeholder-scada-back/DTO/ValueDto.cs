
using placeholder_scada_back.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.DTO
{
    public class ValueDto
    {
        public int TagId { get; set; }
        public string Value { get; set; }
        public string Time { get; set; }
        public ValueDto(AnalogValue analogValue)
        {
            TagId = analogValue.TagId;
            Value = analogValue.Value.ToString();
            Time = analogValue.DateTime.ToString("dd/MM/yyyy HH:ss:fff");
        }
        public ValueDto(DigitalValue digitalValue)
        {
            TagId = digitalValue.TagId;
            Value = digitalValue.Value.ToString();
            Time = digitalValue.DateTime.ToString("dd/MM/yyyy HH:ss:fff");
        }
    }
}