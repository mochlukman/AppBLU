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
    public class JnspajakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JnspajakController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jnspajak> datas = await _uow.JnspajakRepo.Gets();
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjnspajak}")]
        public async Task<IActionResult> Get(long Idjnspajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jnspajak data = await _uow.JnspajakRepo.Get(w => w.Idjnspajak == Idjnspajak);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JnspajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jnspajak cekKode = await _uow.JnspajakRepo.Get(w => w.Kdjnspajak.Trim() == param.Kdjnspajak.Trim());
                if (cekKode != null)
                    return BadRequest("Kode Bank Sudah Digunakan");
                Jnspajak post = _mapper.Map<Jnspajak>(param);
                Jnspajak Insert = await _uow.JnspajakRepo.Add(post);
                if (post != null)
                    return Ok(Insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JnspajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jnspajak cekKode = await _uow.JnspajakRepo.Get(w => w.Kdjnspajak.Trim() == param.Kdjnspajak.Trim());
                if (cekKode != null)
                {
                    if (cekKode.Idjnspajak != param.Idjnspajak)
                    {
                        return BadRequest("Kode Bank Sudah Digunakan");
                    }
                }
                Jnspajak post = _mapper.Map<Jnspajak>(param);
                bool update = await _uow.JnspajakRepo.Update(post);
                if (update)
                    return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjnspajak}")]
        public async Task<IActionResult> Put(long Idjnspajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jnspajak data = await _uow.JnspajakRepo.Get(w => w.Idjnspajak == Idjnspajak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JnspajakRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}