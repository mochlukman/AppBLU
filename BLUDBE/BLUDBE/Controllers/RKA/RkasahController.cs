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
    public class RkasahController : ControllerBase
    {
        private readonly IMapper _mapper;
        private IUow _uow;
        public RkasahController(IMapper mapper, IUow uow)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkaGlobalGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<RkasahView> data = await _uow.RkasahRepo.Paging(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RkasahPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkasah post = _mapper.Map<Rkasah>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            try
            {
                Rkasah insert = await _uow.RkasahRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.RkasahRepo.ViewData(insert.Idrkasah));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] RkasahPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkasah post = _mapper.Map<Rkasah>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            try
            {
                bool update = await _uow.RkasahRepo.Update(post);
                if (update)
                    return Ok(await _uow.RkasahRepo.ViewData(post.Idrkasah));
                return BadRequest("Ubah Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrkasah}")]
        public async Task<IActionResult> Delete(long Idrkasah)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkasah data = await _uow.RkasahRepo.Get(w => w.Idrkasah == Idrkasah);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkasahRepo.Remove(data);
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