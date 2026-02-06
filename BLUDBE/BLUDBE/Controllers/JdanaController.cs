using System;
using System.Collections.Generic;
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
    public class JdanaController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JdanaController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jdana> datas = await _uow.JdanaRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjdana}")]
        public async Task<IActionResult> Get(long Idjdana)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jdana data = await _uow.JdanaRepo.Get(w => w.Idjdana == Idjdana);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JdanaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jdana post = _mapper.Map<Jdana>(param);
            Jdana checkKode = await _uow.JdanaRepo.Get(w => w.Kddana.Trim() == param.Kddana);
            if (checkKode != null) return BadRequest("Kode Dana Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Jdana insert = await _uow.JdanaRepo.Add(post);
                if (insert != null)
                {
                    return Ok(insert);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JdanaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jdana post = _mapper.Map<Jdana>(param);
            Jdana checkKode = await _uow.JdanaRepo.Get(w => w.Kddana.Trim() == param.Kddana);
            if (checkKode != null)
            {
                if(checkKode.Idjdana != post.Idjdana)
                {
                    return BadRequest("Kode Dana Sudah Digunakan");
                }
            }
            post.Datecreate = DateTime.Now;
            try
            {
                bool update = await _uow.JdanaRepo.Udpate(post);
                if (update)
                {
                    return Ok(post);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjdana}")]
        public async Task<IActionResult> Delete (long Idjdana)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jdana data = await _uow.JdanaRepo.Get(w => w.Idjdana == Idjdana);
                if(data != null)
                {
                    _uow.JdanaRepo.Remove(data);
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