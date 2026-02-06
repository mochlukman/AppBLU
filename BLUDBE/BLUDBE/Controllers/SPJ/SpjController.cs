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
    public class SpjController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpjController(IUow uow, IMapper mapper)
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
                List<Spj> data = await _uow.SpjRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-lpj")]
        public async Task<IActionResult> ForLpj([FromQuery]SpjGetsForLpjParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spj> data = await _uow.SpjRepo.ForLpj(param);
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
                PrimengTableResult<Spj> data = await _uow.SpjRepo.Paging(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spj post = _mapper.Map<Spj>(param);
            string[] splitNo = param.Nospj.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.SpjRepo.isExist(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Spj Insert = await _uow.SpjRepo.Add(post);
                if(Insert != null)
                {
                    return Ok(await _uow.SpjRepo.ViewData(Insert.Idspj));
                }
                return BadRequest("Insert Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spj post = _mapper.Map<Spj>(param);
            post.Dateupdate = DateTime.Now;
            Spj Old = await _uow.SpjRepo.Get(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend == post.Idbend && w.Idunit == post.Idunit);
            if (Old != null)
            {
                if (Old.Idspj != post.Idspj) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.SpjRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SpjRepo.ViewData(post.Idspj));
                }
                return BadRequest("Update Data Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody] SpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spj post = _mapper.Map<Spj>(param);
            post.Dateupdate = DateTime.Now;
            post.Sahby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool pengesahan = await _uow.SpjRepo.Pengesahan(post);
                if (pengesahan)
                {
                    return Ok(await _uow.SpjRepo.ViewData(post.Idspj));
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("validasi")]
        public async Task<IActionResult> Validasi([FromBody] SpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spj post = _mapper.Map<Spj>(param);
            if (param.Valid == true && String.IsNullOrEmpty(param.Tglvalid.ToString()))
            {
                return BadRequest("Tanggal Jurnal Harus Diisi");
            }
            if (param.Valid == false || param.Valid == null)
            {
                param.Tglvalid = null;
            }
            post.Dateupdate = DateTime.Now;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool validasi = await _uow.SpjRepo.Validasi(post);
                if (validasi)
                {
                    return Ok(await _uow.SpjRepo.ViewData(post.Idspj));
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspj}")]
        public async Task<IActionResult> Delete(long Idspj)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spj data = await _uow.SpjRepo.Get(w => w.Idspj == Idspj);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                List<Bpkspj> bpkspjs = await _uow.BpkspjRepo.Gets(w => w.Idspj == Idspj);
                List<Spjspp> spjspps = await _uow.SpjsppRepo.Gets(w => w.Idspj == Idspj);
                if (bpkspjs.Count() > 0 || spjspps.Count() > 0)
                {
                    return BadRequest("Gagal Hapus, SPJ Telah Digunakan");
                }
                _uow.SpjRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("lookup-for-spp")]
        public async Task<IActionResult> LookupForSpp(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idspp,
            [FromQuery]string Kdstatus
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (String.IsNullOrEmpty(Kdstatus)) Kdstatus = "42";
            try
            {
                List<SpjLookupForSpp> datas = await _uow.SpjRepo.LookupForSpp(Idunit, Idspp, Kdstatus);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}