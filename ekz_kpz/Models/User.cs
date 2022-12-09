using System.ComponentModel.DataAnnotations;

namespace Ekz_kpz.Models
{
    public class User
    {
        [Key]
        public int IdOfUser { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
