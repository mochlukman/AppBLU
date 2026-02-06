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
    public class JkegController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JkegController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jkeg> datas = await _uow.JkegRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Jnskeg}")]
        public async Task<IActionResult> Get(int Jnskeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jkeg data = await _uow.JkegRepo.Get( w => w.Jnskeg == Jnskeg);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jkeg post = _mapper.Map<Jkeg>(param);
            try
            {
                Jkeg insert = await _uow.JkegRepo.Add(post);
                if (insert != null) return Ok(insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jkeg post = _mapper.Map<Jkeg>(param);
            try
            {
                bool update = await _uow.JkegRepo.Update(post);
                if (update) return Ok(post);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Jnskeg}")]
        public async Task<IActionResult> Delete(int Jnskeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Mkegiatan> mkegiatans = await _uow.MkegiatanRepo.Gets(w => w.Jnskeg == Jnskeg);
            if (mkegiatans.Count() > 0)
                return BadRequest("Hapus Gagal, Jenis Kegiatan telah digunakan");
            try
            {
                Jkeg data = await _uow.JkegRepo.Get(w => w.Jnskeg == Jnskeg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JkegRepo.Remove(data);
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