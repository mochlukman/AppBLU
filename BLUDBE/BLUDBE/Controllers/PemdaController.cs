using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PemdaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public PemdaController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet("get_config"), AllowAnonymous]
        public async Task<IActionResult> GetSetting([FromQuery][Required] string Keyset)
        {
            try
            {
                string valset = await _uow.PemdaRepo.GetPemda(Keyset);
                return Ok(new { value = valset });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}