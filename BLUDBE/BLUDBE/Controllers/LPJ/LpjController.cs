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

namespace BLUDBE.Controllers.LPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class LpjController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public LpjController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<LpjGetsParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Lpj> data = await _uow.LpjRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Lpj post = _mapper.Map<Lpj>(param);
            string[] splitNo = param.Nolpj.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.LpjRepo.isExist(w => w.Nolpj.Trim() == post.Nolpj.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Lpj Insert = await _uow.LpjRepo.Add(post);
                if (Insert != null)
                {
                    return Ok(await _uow.LpjRepo.ViewData(Insert.Idlpj));
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
        public async Task<IActionResult> Put([FromBody] LpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Lpj post = _mapper.Map<Lpj>(param);
            post.Dateupdate = DateTime.Now;
            Lpj Old = await _uow.LpjRepo.Get(w => w.Nolpj.Trim() == post.Nolpj.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (Old != null)
            {
                if (Old.Idlpj != post.Idlpj) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.LpjRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.LpjRepo.ViewData(post.Idlpj));
                }
                return BadRequest("Update Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idlpj}")]
        public async Task<IActionResult> Delete(long Idlpj)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Lpj data = await _uow.LpjRepo.Get(w => w.Idlpj == Idlpj);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                //List<Bpkspj> bpkspjs = await _uow.BpkspjRepo.Gets(w => w.Idspj == Idspj);
                //List<Spjspp> spjspps = await _uow.SpjsppRepo.Gets(w => w.Idspj == Idspj);
                //if (bpkspjs.Count() > 0 || spjspps.Count() > 0)
                //{
                //    return BadRequest("Gagal Hapus, SPJ Telah Digunakan");
                //}
                _uow.LpjRepo.Remove(data);
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
        public async Task<IActionResult> Pengesahan([FromBody] LpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Lpj post = _mapper.Map<Lpj>(param);
            post.Dateupdate = DateTime.Now;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool pengesahan = await _uow.LpjRepo.Pengesahan(post);
                if (pengesahan)
                {
                    return Ok(await _uow.LpjRepo.ViewData(post.Idlpj));
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