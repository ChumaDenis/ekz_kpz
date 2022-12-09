using System.ComponentModel.DataAnnotations;

namespace Ekz_kpz.Models
{
    public class Event
    {
        [Key]
        public int IdOfIvent { get; set; }
        public string Header { get; set; }
        public DateTime Time { get; set; }
        public string Frequency { get; set; }
        public int IdOfCalendar { get; set; }
    }
}
