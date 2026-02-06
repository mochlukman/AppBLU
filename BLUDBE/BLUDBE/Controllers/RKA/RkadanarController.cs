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

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkadanarController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkadanarController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] long Idrkar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<RkadanarView> datas = await _uow.RkadanarRepo.ViewDatas(Idrkar);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idrkadanar}")]
        public async Task<IActionResult> Get(long Idrkadanar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                RkadanarView datas = await _uow.RkadanarRepo.ViewData(Idrkadanar);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkadanarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadanar Post = _mapper.Map<Rkadanar>(param);
            Post.Createdby = User.Claims.FirstOrDefault().Value;
            Post.Createddate = DateTime.Now;
            try
            {
                Rkadanar Insert = await _uow.RkadanarRepo.Add(Post);
                if(Insert != null)
                {
                    return Ok(await _uow.RkadanarRepo.ViewData(Insert.Idrkadanar));
                }
                return BadRequest("Input Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]RkadanarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadanar Post = _mapper.Map<Rkadanar>(param);
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            try
            {
                bool Update = await _uow.RkadanarRepo.Update(Post);
                if (Update)
                {
                    return Ok(await _uow.RkadanarRepo.ViewData(Post.Idrkadanar));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrkadanar}")]
        public async Task<IActionResult> Delete(long Idrkadanar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkadanar data = await _uow.RkadanarRepo.Get(w => w.Idrkadanar == Idrkadanar);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.RkadanarRepo.Remove(data);
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