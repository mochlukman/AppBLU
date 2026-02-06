using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JsatuanController : ControllerBase
    {
        private readonly IUow _uow;
        public JsatuanController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jsatuan> datas = await _uow.JsatuanRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(long Id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jsatuan data = await _uow.JsatuanRepo.Get(w => w.Idsatuan == Id);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody][Required] Jsatuan param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jsatuan Insert = await _uow.JsatuanRepo.Add(param);
                return Ok(Insert);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody][Required] Jsatuan param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                bool update = await _uow.JsatuanRepo.Update(param);
                if (update)
                    return Ok(param);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(long Id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jsatuan data = await _uow.JsatuanRepo.Get(w => w.Idsatuan == Id);
                _uow.JsatuanRepo.Remove(data);
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