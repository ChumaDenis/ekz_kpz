using Ekz_kpz.Models;
using lab04_kpz.Context;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lab04kpp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private PersonContext _context;
        public UserController(PersonContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.users.ToList());
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            User user= _context.users.Find(id);
            if (user != null)
            {
                return Ok(user);
            }
            return BadRequest();
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            _context.users.Add(user);
            _context.SaveChanges();
            return Ok();

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            User findUser= _context.users.Find(id);
            if (findUser != null)
            {
                _context.users.Remove(findUser);
                user.IdOfUser = id;
                _context.users.Add(user);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();

        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User findUser = _context.users.Find(id);
            if (findUser != null)
            {
                _context.users.Remove(findUser);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();

        }
    }
}
