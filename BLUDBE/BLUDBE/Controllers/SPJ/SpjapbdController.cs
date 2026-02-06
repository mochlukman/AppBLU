using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers.SPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpjapbdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpjapbdController(IUow uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]SpjapbdGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spjapbd> data = await _uow.SpjapbdRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<SpjapbdGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Spjapbd> data = await _uow.SpjapbdRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SpjapbdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjapbd post = _mapper.Map<Spjapbd>(param);
            string[] splitNo = param.Nospj.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.SpjapbdRepo.isExist(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idkeg == post.Idkeg && w.Idunit == post.Idunit);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Spjapbd Insert = await _uow.SpjapbdRepo.Add(post);
                if (Insert != null)
                {
                    return Ok(await _uow.SpjapbdRepo.ViewData(Insert.Idspjapbd));
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
        public async Task<IActionResult> Put([FromBody] SpjapbdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjapbd post = _mapper.Map<Spjapbd>(param);
            post.Dateupdate = DateTime.Now;
            Spjapbd Old = await _uow.SpjapbdRepo.Get(w => w.Nospj.Trim() == post.Nospj.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idkeg == post.Idkeg && w.Idunit == post.Idunit);
            if (Old != null)
            {
                if (Old.Idspjapbd != post.Idspjapbd) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.SpjapbdRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SpjapbdRepo.ViewData(post.Idspjapbd));
                }
                return BadRequest("Update Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody] SpjapbdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjapbd post = _mapper.Map<Spjapbd>(param);
            post.Dateupdate = DateTime.Now;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool pengesahan = await _uow.SpjapbdRepo.Pengesahan(post);
                if (pengesahan)
                {
                    return Ok(await _uow.SpjapbdRepo.ViewData(post.Idspjapbd));
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        
        [HttpDelete("{Idspjapbd}")]
        public async Task<IActionResult> Delete(long Idspjapbd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spjapbd data = await _uow.SpjapbdRepo.Get(w => w.Idspjapbd == Idspjapbd);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                _uow.SpjapbdRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}