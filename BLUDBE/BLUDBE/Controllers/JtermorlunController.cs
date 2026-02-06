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
    public class JtermorlunController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JtermorlunController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jtermorlun> datas = await _uow.JtermorlunRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjtermorlun}")]
        public async Task<IActionResult> Get(long Idjtermorlun)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtermorlun data = await _uow.JtermorlunRepo.Get(w => w.Idjtermorlun == Idjtermorlun);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody][Required]JtermorlunPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtermorlun post = _mapper.Map<Jtermorlun>(param);
            try
            {
                Jtermorlun Insert = await _uow.JtermorlunRepo.Add(post);
                if (Insert != null)
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
        public async Task<IActionResult> Put([FromBody][Required]JtermorlunPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtermorlun post = _mapper.Map<Jtermorlun>(param);
            try
            {
                bool Update = await _uow.JtermorlunRepo.Update(post);
                if (Update)
                    return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjtermorlun}")]
        public async Task<IActionResult> Delete(long Idjtermorlun)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtermorlun data = await _uow.JtermorlunRepo.Get(w => w.Idjtermorlun == Idjtermorlun);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Kontrakdetr> kontrakdetrs = await _uow.KontrakdetrRepo.Gets(w => w.Idjtermorlun == Idjtermorlun);
                if (kontrakdetrs.Count() > 0) return BadRequest("Hapus Gagal, data telah digunakan pada Kontrak");
                _uow.JtermorlunRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
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