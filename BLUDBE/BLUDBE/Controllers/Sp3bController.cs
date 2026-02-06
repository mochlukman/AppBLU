using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp3bController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp3bController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]Sp3bGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp3b> datas = await _uow.Sp3BRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Sp3bPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp3b post = _mapper.Map<Sp3b>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                Sp3b insert = await _uow.Sp3BRepo.Add(post);
                if (insert != null)
                    return Ok();
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody]Sp3bPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp3b post = _mapper.Map<Sp3b>(param);
            post.Validby = User.Claims.FirstOrDefault().Value;
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.Sp3BRepo.Pengesahan(post);
                if (update)
                    return Ok();
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsp3b}")]
        public async Task<IActionResult> Delete(long Idsp3b)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp3b data = await _uow.Sp3BRepo.Get(w => w.Idsp3b == Idsp3b);
                if (data != null)
                {
                    _uow.Sp3BRepo.Remove(data);
                    if (await _uow.Complete()) return Ok();
                }
                return Ok("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}