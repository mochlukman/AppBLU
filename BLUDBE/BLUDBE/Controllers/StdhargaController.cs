using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StdhargaController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public StdhargaController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<Stdharga> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Stdharga> data = await _uow.StdhargaRepo.Paging(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstdharga}")]
        public async Task<IActionResult> Get(long Idstdharga)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stdharga data = await _uow.StdhargaRepo.Get(w => w.Idstdharga == Idstdharga);
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