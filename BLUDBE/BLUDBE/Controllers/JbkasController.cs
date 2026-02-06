using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JbkasController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public JbkasController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jbkas> data = await _uow.JbkasRepo.Gets();
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbkas}")]
        public async Task<IActionResult> Get(long Idbkas)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbkas data = await _uow.JbkasRepo.Get(w => w.Idbkas == Idbkas);
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