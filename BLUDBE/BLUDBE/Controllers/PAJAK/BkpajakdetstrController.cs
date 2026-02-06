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

namespace BLUDBE.Controllers.PAJAK
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkpajakdetstrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkpajakdetstrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idbkpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkpajakdetstr> data = await _uow.BkpajakdetstrRepo.ViewDatas(Idbkpajak);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbkpajakdetstr}")]
        public async Task<IActionResult> Get(long Idbkpajakdetstr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkpajakdetstr data = await _uow.BkpajakdetstrRepo.ViewData(Idbkpajakdetstr);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkpajakdetstrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkpajakdetstr post = _mapper.Map<Bkpajakdetstr>(param);
            post.Datecreate = DateTime.Now;
            post.Idbpkpajakstr = 0;
            bool checkPajak = await _uow.BkpajakdetstrRepo.isExist(w => w.Idpajak == param.Idpajak && w.Idbkpajak == param.Idbkpajak);
            if (checkPajak) return BadRequest("Pajak Telah Diinput, Silahkan Update data");
            try
            {
                Bkpajakdetstr Insert = await _uow.BkpajakdetstrRepo.Add(post);
                if(Insert != null)
                {
                    Bkpajakdetstr view = await _uow.BkpajakdetstrRepo.ViewData(Insert.Idbkpajakdetstr);
                    return Ok(view);
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
        public async Task<IActionResult> Put([FromBody]BkpajakdetstrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkpajakdetstr post = _mapper.Map<Bkpajakdetstr>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.BkpajakdetstrRepo.Update(post);
                if (Update)
                {
                    Bkpajakdetstr view = await _uow.BkpajakdetstrRepo.ViewData(param.Idbkpajakdetstr);
                    return Ok(view);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbkpajakdetstr}")]
        public async Task<IActionResult> Delete(long Idbkpajakdetstr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkpajakdetstr data = await _uow.BkpajakdetstrRepo.Get(w => w.Idbkpajakdetstr == Idbkpajakdetstr);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.BkpajakdetstrRepo.Remove(data);
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