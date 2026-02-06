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
    public class BpkpajakstrController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public BpkpajakstrController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] BpkpajakstrGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<BpkpajakstrView> data = await _uow.BpkpajakstrRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbpkpajakstr}")]
        public async Task<IActionResult> Get(long Idbpkpajakstr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                BpkpajakstrView data = await _uow.BpkpajakstrRepo.ViewData(Idbpkpajakstr);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BpkPajakstrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajakstr post = _mapper.Map<Bpkpajakstr>(param);
            post.Datecreate = DateTime.Now;
            try
            {
                Bpkpajakstr insert = await _uow.BpkpajakstrRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.BpkpajakstrRepo.ViewData(insert.Idbpkpajakstr));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] BpkPajakstrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajakstr post = _mapper.Map<Bpkpajakstr>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.BpkpajakstrRepo.Update(post);
                if (update)
                    return Ok(await _uow.BpkpajakstrRepo.ViewData(post.Idbpkpajakstr));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Verifikasi([FromBody]BpkPajakstrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajakstr post = _mapper.Map<Bpkpajakstr>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.BpkpajakstrRepo.Pengesahan(post);
                if (update)
                    return Ok(await _uow.BpkpajakstrRepo.ViewData(post.Idbpkpajakstr));
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbpkpajakstr}")]
        public async Task<IActionResult> Delete(long Idbpkpajakstr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkpajakstr data = await _uow.BpkpajakstrRepo.Get(w => w.Idbpkpajakstr == Idbpkpajakstr);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long det = await _uow.BpkpajakstrdetRepo.Count(w => w.Idbpkpajakstr == data.Idbpkpajakstr);
                if (det > 0) return BadRequest("Gagal Hapus, Data Memiliki Rincian");
                _uow.BpkpajakstrRepo.Remove(data);
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