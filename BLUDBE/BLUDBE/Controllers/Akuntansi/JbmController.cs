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

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class JbmController : ControllerBase
    {
        private readonly IUow _u;
        private readonly IMapper _map; 
        public JbmController(IUow uow, IMapper mapper)
        {
            _u = uow;
            _map = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jbm> datas = await _u.JbmRepo.Gets();
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjbm}")]
        public async Task<IActionResult> Get(long Idjbm)
        {
            try
            {
                Jbm datas = await _u.JbmRepo.Get(w => w.Idjbm == Idjbm);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("bykode")]
        public async Task<IActionResult> GetByKode([FromQuery][Required] string Kdbm)
        {
            string[] kode = Kdbm.Split(",");
            try
            {
                List<Jbm> datas = await _u.JbmRepo.Gets(w => kode.Contains(w.Kdbm.Trim()));
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JbmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jbm post = _map.Map<Jbm>(param);
            try
            {
                Jbm insert = await _u.JbmRepo.Add(post);
                if (insert != null)
                {
                    return Ok(insert);
                }
                return BadRequest("Gagal Input");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JbmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jbm post = _map.Map<Jbm>(param);
            try
            {
                bool Update = await _u.JbmRepo.Update(post);
                if (Update)
                {
                    Jbm data = await _u.JbmRepo.Get(w => w.Idjbm == param.Idjbm);
                    return Ok(data);
                }
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjbm}")]
        public async Task<IActionResult> Delete(long Idjbm)
        {
            try
            {
                Jbm datas = await _u.JbmRepo.Get(w => w.Idjbm == Idjbm);
                if (datas == null) return BadRequest("data tidak ditemukan");
                _u.JbmRepo.Remove(datas);
                if (await _u.Complete())
                    return Ok();
                return BadRequest("Gagal Delete");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}