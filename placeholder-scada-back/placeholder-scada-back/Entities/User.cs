
using System.ComponentModel.DataAnnotations.Schema;

namespace placeholder_scada_back.Entities
{
    public enum Role
    {
        USER, ADMIN
    }
    [Table("user")]
    public class User
    {
        public User(string username, string password, Role role)
        {
            Username = username;
            Password = password;
            Role = role;
        }

        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password")]
        public string Password { get; set; }
        [Column("role")]
        public Role Role { get; set; }

    }
}