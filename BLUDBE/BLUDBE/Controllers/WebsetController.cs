using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsetController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public WebsetController(IMapper mapper, IUow uow)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("bykdset")]
        public async Task<IActionResult> Bykdset([FromQuery][Required]string Kdset)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Webset data = await _uow.WebsetRepo.Get(w => w.Kdset.Trim() == Kdset.Trim());
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WebsetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Webset post = _mapper.Map<Webset>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.WebsetRepo.Update(post);
                if (update)
                    return Ok(await _uow.WebsetRepo.Get(w => w.Idwebset == post.Idwebset));
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}