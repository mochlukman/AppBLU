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
    public class JusahaController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JusahaController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jusaha> datas = await _uow.JusahaRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjusaha}")]
        public async Task<IActionResult> Get(long Idjusaha)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jusaha data = await _uow.JusahaRepo.Get(w => w.Idjusaha == Idjusaha);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JusahaPost param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jusaha post = _mapper.Map<Jusaha>(param);
                Jusaha Insert = await _uow.JusahaRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] JusahaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jusaha post = _mapper.Map<Jusaha>(param);
                bool update = await _uow.JusahaRepo.Update(post);
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
        [HttpDelete("{Idjusaha}")]
        public async Task<IActionResult> Put(long Idjusaha)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jusaha data = await _uow.JusahaRepo.Get(w => w.Idjusaha == Idjusaha);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JusahaRepo.Remove(data);
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