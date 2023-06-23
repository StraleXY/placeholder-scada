
using placeholder_scada_back.Entities;

namespace placeholder_scada_back.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public UserDto(User user)
        {
            Id = user.Id;
            Username = user.Username;
        }
    }
}