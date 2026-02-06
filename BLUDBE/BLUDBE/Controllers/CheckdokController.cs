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
    public class CheckdokController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public CheckdokController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] CheckdokGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Checkdok> data = await _uow.CheckdokRepo.ViewDatas(param);
                return Ok(data);
            }catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idcheck}")]
        public async Task<IActionResult> Get(long Idcheck)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Checkdok data = await _uow.CheckdokRepo.ViewData(Idcheck);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CheckdokPost param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            Checkdok post = _mapper.Map<Checkdok>(param);
            try
            {
                Checkdok insert = await _uow.CheckdokRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.CheckdokRepo.ViewData(insert.Idcheck));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] CheckdokPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Checkdok post = _mapper.Map<Checkdok>(param);
            try
            {
                bool update = await _uow.CheckdokRepo.Update(post);
                if (update)
                    return Ok(await _uow.CheckdokRepo.ViewData(post.Idcheck));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idcheck}")]
        public async Task<IActionResult> Delete(long Idcheck)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Checkdok data = await _uow.CheckdokRepo.Get(w => w.Idcheck == Idcheck);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                long sppcheckbox = await _uow.SppcheckdokRepo.Count(w => w.Idcheck == Idcheck);
                if (sppcheckbox > 0)
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                _uow.CheckdokRepo.Remove(data);
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