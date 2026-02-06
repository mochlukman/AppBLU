using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPP
{
    [Route("api/[controller]")]
    [ApiController]
    public class SppdetrpotController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public SppdetrpotController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idsppdetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sppdetrpot> datas = await _uow.SppdetrpotRepo.ViewDatas(Idsppdetr);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idsppdetrpot}")]
        public async Task<IActionResult> Get(long Idsppdetrpot)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetrpot data = await _uow.SppdetrpotRepo.ViewData(Idsppdetrpot);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SppdetrpotPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sppdetrpot post = _mapper.Map<Sppdetrpot>(param);
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value;
            bool isExist = await _uow.SppdetrpotRepo.isExist(w => w.Idsppdetr == param.Idsppdetr && w.Idpot == param.Idpot);
            if (isExist)
                return BadRequest("Potongan Telah Ditambakahn");
            try
            {
                Sppdetrpot insert = await _uow.SppdetrpotRepo.Add(post);
                if (insert != null)
                {
                    return Ok(await _uow.SppdetrpotRepo.ViewData(insert.Idsppdetrpot));
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]SppdetrpotUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sppdetrpot post = _mapper.Map<Sppdetrpot>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool update = await _uow.SppdetrpotRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SppdetrpotRepo.ViewData(post.Idsppdetrpot));
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsppdetrpot}")]
        public async Task<IActionResult> Delete(long Idsppdetrpot)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetrpot data = await _uow.SppdetrpotRepo.Get(w => w.Idsppdetrpot == Idsppdetrpot);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SppdetrpotRepo.Remove(data);
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