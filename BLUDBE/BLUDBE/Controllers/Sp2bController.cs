using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp2bController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp2bController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]Sp2bGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2b> datas = await _uow.Sp2BRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Sp2bPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2b post = _mapper.Map<Sp2b>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                Sp2b insert = await _uow.Sp2BRepo.Add(post);
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
        public async Task<IActionResult> Pengesahan([FromBody]Sp2bPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2b post = _mapper.Map<Sp2b>(param);
            post.Validby = User.Claims.FirstOrDefault().Value;
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.Sp2BRepo.Pengesahan(post);
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
        [HttpDelete("{Idsp2b}")]
        public async Task<IActionResult> Delete(long Idsp2b)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            long det = await _uow.Sp2BdetRepo.Count(w => w.Idsp2b == Idsp2b);
            if(det > 0)
            {
                return BadRequest("Gagal Hapus, Data Mempunyai Rincian");
            }
            try
            {
                Sp2b data = await _uow.Sp2BRepo.Get(w => w.Idsp2b == Idsp2b);
                if (data != null)
                {
                    _uow.Sp2BRepo.Remove(data);
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