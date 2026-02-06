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
    public class DaftbankController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DaftbankController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Daftbank> datas = await _uow.DaftbankRepo.Gets();
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
                Daftbank data = await _uow.DaftbankRepo.Get(w => w.Idbank == Idbank);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DaftbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftbank cekKode = await _uow.DaftbankRepo.Get(w => w.Kdbank.Trim() == param.Kdbank.Trim());
                if (cekKode != null)
                    return BadRequest("Kode Bank Sudah Digunakan");
                Daftbank post = _mapper.Map<Daftbank>(param);
                post.Datecreate = DateTime.Now;
                Daftbank Insert = await _uow.DaftbankRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] DaftbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftbank cekKode = await _uow.DaftbankRepo.Get(w => w.Kdbank.Trim() == param.Kdbank.Trim());
                if (cekKode != null)
                {
                    if(cekKode.Idbank != param.Idbank)
                    {
                        return BadRequest("Kode Bank Sudah Digunakan");
                    }
                }
                Daftbank post = _mapper.Map<Daftbank>(param);
                bool update = await _uow.DaftbankRepo.Update(post);
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
                Daftbank data = await _uow.DaftbankRepo.Get(w => w.Idbank == Idbank);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.DaftbankRepo.Remove(data);
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