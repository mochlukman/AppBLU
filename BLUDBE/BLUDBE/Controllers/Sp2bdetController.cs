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
    public class Sp2bdetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp2bdetController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]Sp2bdetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2bdet> datas = await _uow.Sp2BdetRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("RincianSP2B")]
        public async Task<IActionResult> RincianSP2B([FromQuery]Sp2bdetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<dynamic> datas = await _uow.Sp2BdetRepo.RincianSP2B(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("RincianSP3B")]
        public async Task<IActionResult> RincianSP3B([FromQuery]Sp2bdetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<dynamic> datas = await _uow.Sp2BdetRepo.RincianSP3B(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Sp2bdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2bdet post = _mapper.Map<Sp2bdet>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                Sp2bdet insert = await _uow.Sp2BdetRepo.Add(post);
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
        [HttpDelete("{idsp2bdet}")]
        public async Task<IActionResult> Delete(long idsp2bdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp2bdet data = await _uow.Sp2BdetRepo.Get(w => w.Idsp2bdet == idsp2bdet);
                if (data != null)
                {
                    _uow.Sp2BdetRepo.Remove(data);
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