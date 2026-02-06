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
    public class RkatapddetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkatapddetdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery] PrimengTableParam<RkatapddetGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<RkatapddetdView> data = await _uow.RkatapddetdRepo.Paging(param);
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
                string Nomor = await _uow.RkatapddetdRepo.GenerateNomor(idrka);
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
            Rkatapddetd post = _mapper.Map<Rkatapddetd>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            bool check_peg = await _uow.RkatapddetdRepo.isExist(w => w.Idrkadetd == post.Idrkadetd && w.Idpeg == post.Idpeg);
            if (check_peg)
                return BadRequest("Data TAPD telah digunakan");
            bool check_nomor = await _uow.RkatapddetdRepo.isExist(w => w.Idrkadetd  == post.Idrkadetd && w.Nomor.Trim() == post.Nomor.Trim());
            if (check_nomor)
                return BadRequest("Nomor Telah Digunakan");
            try
            {
                Rkatapddetd Insert = await _uow.RkatapddetdRepo.Add(post);
                if (Insert != null)
                    return Ok(await _uow.RkatapddetdRepo.ViewData(Insert.Idtapddetd));
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
            Rkatapddetd post = _mapper.Map<Rkatapddetd>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            Rkatapddetd checkNomor = await _uow.RkatapddetdRepo.Get(w => w.Idrkadetd == post.Idrkadetd && w.Nomor.Trim() == post.Nomor.Trim());
            if (checkNomor != null)
            {
                if (checkNomor.Idtapddetd != post.Idtapddetd)
                {
                    return BadRequest("Nomor Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.RkatapddetdRepo.Update(post);
                if (update)
                    return Ok(await _uow.RkatapddetdRepo.ViewData(post.Idtapddetd));
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
                Rkatapddetd data = await _uow.RkatapddetdRepo.Get(w => w.Idtapddetd == Idtapd);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkatapddetdRepo.Remove(data);
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