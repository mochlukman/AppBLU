using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpjtrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpjtrController(IUow uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]SpjGetsParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spjtr> data = await _uow.SpjtrRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<SpjGetsParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Spjtr> data = await _uow.SpjtrRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SpjtrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjtr post = _mapper.Map<Spjtr>(param);
            string[] splitNo = param.Nospj.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.SpjtrRepo.isExist(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Spjtr Insert = await _uow.SpjtrRepo.Add(post);
                if (Insert != null)
                {
                    return Ok(await _uow.SpjtrRepo.ViewData(Insert.Idspjtr));
                }
                return BadRequest("Insert Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SpjtrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjtr post = _mapper.Map<Spjtr>(param);
            post.Dateupdate = DateTime.Now;
            Spjtr Old = await _uow.SpjtrRepo.Get(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (Old != null)
            {
                if (Old.Idspjtr != post.Idspjtr) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.SpjtrRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SpjtrRepo.ViewData(post.Idspjtr));
                }
                return BadRequest("Update Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspjtr}")]
        public async Task<IActionResult> Delete(long Idspjtr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spjtr data = await _uow.SpjtrRepo.Get(w => w.Idspjtr == Idspjtr);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                List<Bkustsspjtr> bkustsspjtr = await _uow.BkustsspjtrRepo.Gets(w => w.Idspjtr == Idspjtr);
                List<Bkutbpspjtr> bkutbpspjtr = await _uow.BkutbpspjtrRepo.Gets(w => w.Idspjtr == Idspjtr);
                if (bkustsspjtr.Count() > 0 || bkutbpspjtr.Count() > 0)
                {
                    return BadRequest("Gagal Hapus, SPJ Telah Digunakan");
                }
                _uow.SpjtrRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody] SpjtrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjtr post = _mapper.Map<Spjtr>(param);
            post.Dateupdate = DateTime.Now;
            post.Sahby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool pengesahan = await _uow.SpjtrRepo.Pengesahan(post);
                if (pengesahan)
                {
                    return Ok(await _uow.SpjtrRepo.ViewData(post.Idspjtr));
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}