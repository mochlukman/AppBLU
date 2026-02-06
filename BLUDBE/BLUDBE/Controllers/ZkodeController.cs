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
    public class ZkodeController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public ZkodeController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Zkode> datas = await _uow.ZkodeRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idxkode}")]
        public async Task<IActionResult> Get(int Idxkode)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Zkode data = await _uow.ZkodeRepo.Get(w => w.Idxkode == Idxkode);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ZkodePost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Zkode post = _mapper.Map<Zkode>(param);
            Zkode check = await _uow.ZkodeRepo.Get(w => w.Idxkode == param.Idxkode);
            if (check != null) return BadRequest("Kode Sudah Digunakan");
            try
            {
                Zkode insert = await _uow.ZkodeRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] ZkodePost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Zkode post = _mapper.Map<Zkode>(param);
            try
            {
                bool update = await _uow.ZkodeRepo.Update(post);
                if (update) return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idxkode}")]
        public async Task<IActionResult> Delete(int Idxkode)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Zkode data = await _uow.ZkodeRepo.Get(w => w.Idxkode == Idxkode);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.ZkodeRepo.Remove(data);
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