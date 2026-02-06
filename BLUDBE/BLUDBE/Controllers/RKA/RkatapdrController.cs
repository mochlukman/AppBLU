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

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkatapdrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkatapdrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery] PrimengTableParam<RkatapdGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<RkatapdrView> data = await _uow.RkatapdrRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("nomor/{idrka}")]
        public async Task<IActionResult> GenerateNomor(long idrka)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                string Nomor = await _uow.RkatapdrRepo.GenerateNomor(idrka);
                return Ok(new { Nomor });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RkatapdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkatapdr post = _mapper.Map<Rkatapdr>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            bool check_peg = await _uow.RkatapdrRepo.isExist(w => w.Idrkar == post.Idrkar && w.Idpeg == post.Idpeg);
            if (check_peg)
                return BadRequest("Data TAPD telah digunakan");
            bool check_nomor = await _uow.RkatapdrRepo.isExist(w => w.Idrkar == post.Idrkar && w.Nomor.Trim() == post.Nomor.Trim());
            if (check_nomor)
                return BadRequest("Nomor Telah Digunakan");
            try
            {
                Rkatapdr Insert = await _uow.RkatapdrRepo.Add(post);
                if (Insert != null)
                    return Ok(await _uow.RkatapdrRepo.ViewData(Insert.Idtapdr));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] RkatapdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkatapdr post = _mapper.Map<Rkatapdr>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            Rkatapdr checkNomor = await _uow.RkatapdrRepo.Get(w => w.Idrkar == post.Idrkar && w.Nomor.Trim() == post.Nomor.Trim());
            if (checkNomor != null)
            {
                if (checkNomor.Idtapdr != post.Idtapdr)
                {
                    return BadRequest("Nomor Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.RkatapdrRepo.Update(post);
                if (update)
                    return Ok(await _uow.RkatapdrRepo.ViewData(post.Idtapdr));
                return BadRequest("Update Gagal");

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idtapd}")]
        public async Task<IActionResult> Delete(long Idtapd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkatapdr data = await _uow.RkatapdrRepo.Get(w => w.Idtapdr == Idtapd);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkatapdrRepo.Remove(data);
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