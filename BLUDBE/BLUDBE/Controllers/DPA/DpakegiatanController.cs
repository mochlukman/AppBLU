using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpakegiatanController : ControllerBase
    {
        private readonly IUow _uow;
        public DpakegiatanController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet("tree")]
        public async Task<IActionResult> Tree(
            [FromQuery][Required] long Idunit,
            [FromQuery][Required] string Kdtahap,
            [FromQuery] bool Header,
            [FromQuery] int? Jnskeg
            )
        {
            try
            {
                List<LookupTreeDto> datas = await _uow.DpakegiatanRepo.Tree(Idunit,Kdtahap, Header, Jnskeg);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}