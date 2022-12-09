
using Ekz_kpz.Models;
using Microsoft.EntityFrameworkCore;

namespace lab04_kpz.Context
{
    public class PersonContext:DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options) : base(options)
        {

        }

        public DbSet<Calendar> calendars{ get; set; }
        public DbSet<Event> events { get; set; }
        public DbSet<User> users { get; set; }
    }
}
