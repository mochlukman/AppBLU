using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.BPK
{
    [Route("api/[controller]")]
    [ApiController]
    public class BpkpajakController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public BpkpajakController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] BpkpajakGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<BpkpajakView> data = await _uow.BpkpajakRepo.ViewDatas(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbpkpajak}")]
        public async Task<IActionResult> Get(long Idbpkpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                BpkpajakView data = await _uow.BpkpajakRepo.ViewData(Idbpkpajak);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BpkPajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajak post = _mapper.Map<Bpkpajak>(param);
            post.Datecreate = DateTime.Now;
            try
            {
                Bpkpajak insert = await _uow.BpkpajakRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.BpkpajakRepo.ViewData(insert.Idbpkpajak));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] BpkPajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajak post = _mapper.Map<Bpkpajak>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.BpkpajakRepo.Update(post);
                if (update)
                    return Ok(await _uow.BpkpajakRepo.ViewData(post.Idbpkpajak));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbpkpajak}")]
        public async Task<IActionResult> Delete(long Idbpkpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkpajak data = await _uow.BpkpajakRepo.Get(w => w.Idbpkpajak == Idbpkpajak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long det = await _uow.BpkpajakdetRepo.Count(w => w.Idbpkpajak == data.Idbpkpajak);
                if (det > 0) return BadRequest("Gagal Hapus, Data Memiliki Rincian");
                long str = await _uow.BpkpajakstrdetRepo.Count(w => w.Idbpkpajak == data.Idbpkpajak);
                if (str > 0) return BadRequest("Gagal Hapus, Data Telah Digunakan Pada Setoran");
                _uow.BpkpajakRepo.Remove(data);
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