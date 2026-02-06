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
    public class RkatapdbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkatapdbController(IUow uow, IMapper mapper)
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
                PrimengTableResult<RkatapdbView> data = await _uow.RkatapdbRepo.Paging(param);
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
                string Nomor = await _uow.RkatapdbRepo.GenerateNomor(idrka);
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
            Rkatapdb post = _mapper.Map<Rkatapdb>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            bool check_peg = await _uow.RkatapdbRepo.isExist(w => w.Idrkab == post.Idrkab && w.Idpeg == post.Idpeg);
            if (check_peg)
                return BadRequest("Data TAPD telah digunakan");
            bool check_nomor = await _uow.RkatapdbRepo.isExist(w => w.Idrkab == post.Idrkab && w.Nomor.Trim() == post.Nomor.Trim());
            if (check_nomor)
                return BadRequest("Nomor Telah Digunakan");
            try
            {
                Rkatapdb Insert = await _uow.RkatapdbRepo.Add(post);
                if (Insert != null)
                    return Ok(await _uow.RkatapdbRepo.ViewData(Insert.Idtapdb));
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
            Rkatapdb post = _mapper.Map<Rkatapdb>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            Rkatapdb checkNomor = await _uow.RkatapdbRepo.Get(w => w.Idrkab == post.Idrkab && w.Nomor.Trim() == post.Nomor.Trim());
            if (checkNomor != null)
            {
                if (checkNomor.Idtapdb != post.Idtapdb)
                {
                    return BadRequest("Nomor Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.RkatapdbRepo.Update(post);
                if (update)
                    return Ok(await _uow.RkatapdbRepo.ViewData(post.Idtapdb));
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
                Rkatapdb data = await _uow.RkatapdbRepo.Get(w => w.Idtapdb == Idtapd);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkatapdbRepo.Remove(data);
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