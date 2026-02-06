using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class RkatapddController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkatapddController(IUow uow, IMapper mapper)
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
                PrimengTableResult<RkatapddView> data = await _uow.RkatapddRepo.Paging(param);
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
                string Nomor = await _uow.RkatapddRepo.GenerateNomor(idrka);
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
            Rkatapdd post = _mapper.Map<Rkatapdd>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            bool check_peg = await _uow.RkatapddRepo.isExist(w => w.Idrkad == post.Idrkad && w.Idpeg == post.Idpeg);
            if (check_peg)
                return BadRequest("Data TAPD telah digunakan");
            bool check_nomor = await _uow.RkatapddRepo.isExist(w => w.Idrkad == post.Idrkad && w.Nomor.Trim() == post.Nomor.Trim());
            if (check_nomor)
                return BadRequest("Nomor Telah Digunakan");
            try
            {
                Rkatapdd Insert = await _uow.RkatapddRepo.Add(post);
                if (Insert != null)
                    return Ok(await _uow.RkatapddRepo.ViewData(Insert.Idtapdd));
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
            Rkatapdd post = _mapper.Map<Rkatapdd>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            Rkatapdd checkNomor = await _uow.RkatapddRepo.Get(w => w.Idrkad == post.Idrkad && w.Nomor.Trim() == post.Nomor.Trim());
            if(checkNomor != null)
            {
                if(checkNomor.Idtapdd != post.Idtapdd)
                {
                    return BadRequest("Nomor Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.RkatapddRepo.Update(post);
                if (update)
                    return Ok(await _uow.RkatapddRepo.ViewData(post.Idtapdd));
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
                Rkatapdd data = await _uow.RkatapddRepo.Get(w => w.Idtapdd == Idtapd);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkatapddRepo.Remove(data);
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