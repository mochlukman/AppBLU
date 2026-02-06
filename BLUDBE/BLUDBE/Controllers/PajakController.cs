using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PajakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public PajakController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]PajakGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Pajak> datas = await _uow.PajakRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpajak}")]
        public async Task<IActionResult> Get(long Idpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Pajak data = await _uow.PajakRepo.Get(w => w.Idpajak == Idpajak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                if (!String.IsNullOrEmpty(data.Idjnspajak.ToString()) || data.Idjnspajak.ToString() != "0")
                {
                    data.IdjnspajakNavigation = await _uow.JnspajakRepo.Get(w => w.Idjnspajak == data.Idjnspajak);
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
        public async Task<IActionResult> Post([FromBody]PajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pajak post = _mapper.Map<Pajak>(param);
            bool kode = await _uow.PajakRepo.isExist(w => w.Kdpajak.Trim() == post.Kdpajak.Trim());
            if (kode) return BadRequest("Duplikasi Kode Pajak / Kode Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Pajak insert = await _uow.PajakRepo.Add(post);
                if(insert != null)
                {
                    if (!String.IsNullOrEmpty(insert.Idjnspajak.ToString()) || insert.Idjnspajak.ToString() != "0")
                    {
                        insert.IdjnspajakNavigation = await _uow.JnspajakRepo.Get(w => w.Idjnspajak == insert.Idjnspajak);
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
        public async Task<IActionResult> Update([FromBody]PajakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pajak post = _mapper.Map<Pajak>(param);
            bool kode = await _uow.PajakRepo.isExist(w => w.Idpajak == param.Idpajak && w.Kdpajak.Trim() == post.Kdpajak.Trim());
            if (kode) return BadRequest("Duplikasi Kode Pajak / Kode Sudah Digunakan");
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.PajakRepo.Update(post);
                if (update)
                {
                    if (!String.IsNullOrEmpty(post.Idjnspajak.ToString()) || post.Idjnspajak.ToString() != "0")
                    {
                        post.IdjnspajakNavigation = await _uow.JnspajakRepo.Get(w => w.Idjnspajak == post.Idjnspajak);
                    }
                    return Ok(post);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpajak}")]
        public async Task<IActionResult> Delete(long Idpajak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Pajak data = await _uow.PajakRepo.Get(w => w.Idpajak == Idpajak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.PajakRepo.Remove(data);
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