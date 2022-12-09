using Ekz_kpz.Models;
using lab04_kpz.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lab04kpp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private PersonContext _context;
        public CalendarController(PersonContext context)
        {
            _context = context;
        }

        [HttpGet("{idOfUser}")]
        public IActionResult Get(int idOfUser)
        {
            User findUser = _context.users.Find(idOfUser);
            if (findUser != null)
            {
                return Ok(_context.calendars.ToList().FindAll(x=>x.IdOfUser==idOfUser));
            }
            return BadRequest();
        }

        [HttpGet("{idOfUser}/{id}")]
        public IActionResult Get(int id, int idOfUser)
        {

            User findUser = _context.users.Find(idOfUser);
            if (findUser != null)
            {
                return Ok(_context.calendars.ToList().Find(x => x.IdOfUser == idOfUser && x.IdOfCalendar==id));
            }
            return BadRequest();
        }

        [HttpPost("{idOfUser}")]
        public IActionResult Post(int idOfUser, [FromBody] Calendar calendar)
        {
            calendar.IdOfUser = idOfUser;
            _context.calendars.Add(calendar);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut("{idOfUser}/{id}")]
        public IActionResult Put(int idOfUser, int id, [FromBody] Calendar calendar)
        {
            
                Calendar _calendar = _context.calendars.ToList().Find(x => x.IdOfUser == idOfUser && x.IdOfCalendar == id);

                if (_calendar == null) 
                    return BadRequest();

            _context.calendars.Remove(_calendar);
            calendar.IdOfUser = idOfUser;
            _context.calendars.Add(calendar);
            _context.SaveChanges();
            return Ok();
            

        }

        [HttpDelete("{idOfUser}/{id}")]
        public IActionResult Delete(int idOfUser, int id)
        {
           
                Calendar _calendar = _context.calendars.ToList().Find(x => x.IdOfUser == idOfUser && x.IdOfCalendar == id);
                if (_calendar == null)
                    return BadRequest();
                _context.calendars.Remove(_calendar);
                _context.SaveChanges();
                return Ok();
            

        }
    }
}
