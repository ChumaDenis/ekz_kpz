using System.ComponentModel.DataAnnotations;

namespace Ekz_kpz.Models
{
    public class Calendar
    {
        [Key]
        public int IdOfCalendar { get; set; }
        public string Name { get; set; }
        public int IdOfUser { get; set; }
    }
}
