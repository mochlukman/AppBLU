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
    public class BkpajakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkpajakController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idbend,
            [FromQuery][Required]string Kdstatus
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkpajak> datas = await _uow.BkpajakRepo.ViewDatas(Idunit, Idbend, Kdstatus);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbkpajak}")]
        public async Task<IActionResult> Get(long Idbkpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkpajak data = await _uow.BkpajakRepo.ViewData(Idbkpajak);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("For-Bku")]
        public async Task<IActionResult> GetForBku([FromQuery] BkuParamRef param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkpajak> datas = await _uow.BkpajakRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !String.IsNullOrEmpty(w.Tglvalid.ToString()));
                List<Bkpajak> views = new List<Bkpajak>();
                if (datas.Count() > 0)
                {
                    foreach (var i in datas)
                    {
                        Bkpajak data = await _uow.BkpajakRepo.ViewData(i.Idbkpajak);
                        views.Add(data);
                    }
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BkpajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkpajak post = _mapper.Map<Bkpajak>(param);
            post.Idttd = 0;
            post.Kdrilis = 0;
            post.Stcair = 0;
            post.Stkirim = 0;
            post.Datecreate = DateTime.Now;
            bool checkNo = await _uow.BkpajakRepo.isExist(w => w.Nobkpajak.Trim() == param.Nobkpajak.Trim());
            if (checkNo) return BadRequest("No BK Pajak Telah Digunakan");
            try
            {
                Bkpajak insert = await _uow.BkpajakRepo.Add(post);
                if (insert != null)
                {
                    Bkpajak view = await _uow.BkpajakRepo.ViewData(insert.Idbkpajak);
                    return Ok(view);
                }
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] BkpajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkpajak post = _mapper.Map<Bkpajak>(param);
            post.Dateupdate = DateTime.Now;
            Bkpajak old = await _uow.BkpajakRepo.Get(w => w.Nobkpajak.Trim() == param.Nobkpajak.Trim());
            if (old != null)
            {
                if (old.Idbkpajak != param.Idbkpajak)
                {
                    return BadRequest("No BK Pajak Telah Digunakan");
                }
            }
            try
            {
                bool Update = await _uow.BkpajakRepo.Update(post);
                if (Update)
                {
                    Bkpajak view = await _uow.BkpajakRepo.ViewData(param.Idbkpajak);
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
        [HttpDelete("{Idbkpajak}")]
        public async Task<IActionResult> Delete(long Idbkpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkpajak data = await _uow.BkpajakRepo.Get(w => w.Idbkpajak == Idbkpajak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Bkpajakdetstr> dets = await _uow.BkpajakdetstrRepo.Gets(w => w.Idbkpajak == data.Idbkpajak);
                if (dets.Count() > 0) return BadRequest("Gagal Hapus, Pajak Memiliki Detail");
                _uow.BkpajakRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
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