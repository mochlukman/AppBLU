using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class JnslakController : ControllerBase
    {
        private readonly IUow _uow;
        public JnslakController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet("byListId")]
        public async Task<IActionResult> ByListId([FromQuery][Required]string Idjnslak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string[] Idsplit = Idjnslak.Split(',');
            int[] Ids = Idsplit.Select(int.Parse).ToArray();
            try
            {
                List<Jnslak> data = await _uow.JnslakRepo.Gets(w => Ids.Contains(w.Idjnslak));
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}