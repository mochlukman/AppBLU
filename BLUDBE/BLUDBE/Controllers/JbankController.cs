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
    public class JbankController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JbankController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jbank> datas = await _uow.JbankRepo.Gets();
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbank}")]
        public async Task<IActionResult> Get(long Idbank)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbank data = await _uow.JbankRepo.Get(w => w.Idbank == Idbank);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbank cekKode = await _uow.JbankRepo.Get(w => w.Kdbank.Trim() == param.Kdbank.Trim());
                if (cekKode != null)
                    return BadRequest("Kode Bank Sudah Digunakan");
                Jbank post = _mapper.Map<Jbank>(param);
                post.Datecreate = DateTime.Now;
                Jbank Insert = await _uow.JbankRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] JbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbank cekKode = await _uow.JbankRepo.Get(w => w.Kdbank.Trim() == param.Kdbank.Trim());
                if (cekKode != null)
                {
                    if (cekKode.Idbank != param.Idbank)
                    {
                        return BadRequest("Kode Bank Sudah Digunakan");
                    }
                }
                Jbank post = _mapper.Map<Jbank>(param);
                bool update = await _uow.JbankRepo.Update(post);
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
        [HttpDelete("{Idbank}")]
        public async Task<IActionResult> Put(long Idbank)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbank data = await _uow.JbankRepo.Get(w => w.Idbank == Idbank);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JbankRepo.Remove(data);
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