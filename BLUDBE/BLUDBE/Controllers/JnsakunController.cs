using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JnsakunController : ControllerBase
    {
        private readonly IUow _uow;
        public JnsakunController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet("byListId")]
        public async Task<IActionResult> ByListId([FromQuery][Required]string Idjnsakun)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<long> Ids = new List<long>();
            if (Idjnsakun != "x")
            {
                string[] Idsplit = Idjnsakun.Split(',');
                Ids = Idsplit.Select(long.Parse).ToList();
            }
            try
            {
                List<Jnsakun> data = new List<Jnsakun>();
                if (Ids.Count() > 0)
                {
                     data = await _uow.JnsakunRepo.Gets(w => Ids.Contains(w.Idjnsakun));
                } else
                {
                    data = await _uow.JnsakunRepo.Gets();
                }
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}