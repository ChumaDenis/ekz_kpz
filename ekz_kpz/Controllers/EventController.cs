using Ekz_kpz.Models;
using lab04_kpz.Context;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lab04kpp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private PersonContext _context;
        public EventController(PersonContext context)
        {
            _context = context;
        }

        [HttpGet("{idOfCalendar}")]
        public IActionResult Get(int idOfCalendar)
        {
            Calendar findCalendar = _context.calendars.Find(idOfCalendar);
            if (findCalendar != null)
            {
                return Ok(_context.events.ToList().FindAll(x => x.IdOfCalendar == idOfCalendar));
            }
            return BadRequest();
        }

        [HttpGet("{idOfCalendar}/{id}")]
        public IActionResult Get(int id, int idOfCalendar)
        {

            Calendar findCalendar = _context.calendars.Find(idOfCalendar);
            if (findCalendar != null)
            {
                return Ok(_context.events.ToList().Find(x => x.IdOfCalendar == idOfCalendar && x.IdOfCalendar == id));
            }
            return BadRequest();
        }

        [HttpPost("{idOfCalendar}")]
        public IActionResult Post(int idOfCalendar, [FromBody] Event _event)
        {
            _event.IdOfCalendar = idOfCalendar;
            _context.events.Add(_event);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut("{idOfCalendar}/{id}")]
        public IActionResult Put(int idOfCalendar, int id, [FromBody] Event _event)
        {
            
                Event __event = _context.events.ToList().Find(x => x.IdOfCalendar == idOfCalendar && x.IdOfIvent == id);

                if (__event == null)
                    return BadRequest();

            _context.events.Remove(__event);
            _event.IdOfCalendar = idOfCalendar;
            _context.events.Add(_event);
            _context.SaveChanges();
            return Ok();

        }

        [HttpDelete("{idOfCalendar}/{id}")]
        public IActionResult Delete(int idOfCalendar, int id)
        {
            Calendar findCalendar = _context.calendars.Find(idOfCalendar);
            if (findCalendar != null) 
            { 

                Event _event = _context.events.ToList().Find(x => x.IdOfCalendar == idOfCalendar && x.IdOfIvent == id);
                if (_event == null)
                    return BadRequest();
                _context.events.Remove(_event);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();

        }
    }
}
