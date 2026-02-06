using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JkinkegController : ControllerBase
    {
        private readonly IUow _uow;
        public JkinkegController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jkinkeg> data = await _uow.JkinkegRepo.Gets();
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Kdjkk}")]
        public async Task<IActionResult> Get(string Kdjkk)
        {
            try
            {
                Jkinkeg data = await _uow.JkinkegRepo.Get(w => w.Kdjkk.Trim() == Kdjkk);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<Jkinkeg> param)
        {
            try
            {
                PrimengTableResult<Jkinkeg> data = await _uow.JkinkegRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody][Required] Jkinkeg param)
        {
            bool exist = await _uow.JkinkegRepo.isExist(w => w.Kdjkk.Trim() == param.Kdjkk.Trim());
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            try
            {
                Jkinkeg Insert = await _uow.JkinkegRepo.Add(param);
                if (Insert != null)
                    return Ok(await _uow.JkinkegRepo.Get(w => w.Kdjkk.Trim() == Insert.Kdjkk.Trim()));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody][Required] Jkinkeg param)
        {
            try
            {
                bool Update = await _uow.JkinkegRepo.Update(param);
                if (Update)
                    return Ok(await _uow.JkinkegRepo.Get(w => w.Kdjkk.Trim() == param.Kdjkk.Trim()));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Kdjkk}")]
        public async Task<IActionResult> Delete(string Kdjkk)
        {
            try
            {
                Jkinkeg data = await _uow.JkinkegRepo.Get(w => w.Kdjkk.Trim() == Kdjkk);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukank");
                _uow.JkinkegRepo.Remove(data);
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