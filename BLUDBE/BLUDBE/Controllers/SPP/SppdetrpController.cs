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
    public class SppdetrpController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SppdetrpController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idsppdetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sppdetrp> datas = await _uow.SppdetrpRepo.Gets(w => w.Idsppdetr == Idsppdetr);
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if(!String.IsNullOrEmpty(d.Idpajak.ToString()) || d.Idpajak.ToString() != "0")
                        {
                            d.IdpajakNavigation = await _uow.PajakRepo.Get(w => w.Idpajak == d.Idpajak);
                        }
                    }
                }
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idsppdetrp}")]
        public async Task<IActionResult> Get(long Idsppdetrp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetrp data = await _uow.SppdetrpRepo.Get(w => w.Idsppdetrp == Idsppdetrp);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                if (!String.IsNullOrEmpty(data.Idpajak.ToString()) || data.Idpajak.ToString() != "0")
                {
                    data.IdpajakNavigation = await _uow.PajakRepo.Get(w => w.Idpajak == data.Idpajak);
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SppdetrpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sppdetrp post = _mapper.Map<Sppdetrp>(param);
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value;
            try
            {
                Sppdetrp insert = await _uow.SppdetrpRepo.Add(post);
                if(insert != null)
                {
                    if (!String.IsNullOrEmpty(insert.Idpajak.ToString()) || insert.Idpajak.ToString() != "0")
                    {
                        insert.IdpajakNavigation = await _uow.PajakRepo.Get(w => w.Idpajak == insert.Idpajak);
                    }
                    return Ok(insert);
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
        public async Task<IActionResult> Put([FromBody]SppdetrpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sppdetrp post = _mapper.Map<Sppdetrp>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool update = await _uow.SppdetrpRepo.Update(post);
                if (update)
                {
                    if (!String.IsNullOrEmpty(post.Idpajak.ToString()) || post.Idpajak.ToString() != "0")
                    {
                        post.IdpajakNavigation = await _uow.PajakRepo.Get(w => w.Idpajak == post.Idpajak);
                    }
                    return Ok(post);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsppdetrp}")]
        public async Task<IActionResult> Delete(long Idsppdetrp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetrp data = await _uow.SppdetrpRepo.Get(w => w.Idsppdetrp == Idsppdetrp);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SppdetrpRepo.Remove(data);
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