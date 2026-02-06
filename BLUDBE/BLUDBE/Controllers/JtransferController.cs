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
    public class JtransferController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public JtransferController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jtransfer> datas = await _uow.JtransferRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjtransfer}")]
        public async Task<IActionResult> Get(long Idjtransfer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtransfer data = await _uow.JtransferRepo.Get(w => w.Idjtransfer == Idjtransfer);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]JtransferPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtransfer post = _mapper.Map<Jtransfer>(param);
            bool kode = await _uow.JtransferRepo.isExist(w => w.Kdtransfer == param.Kdtransfer);
            if (kode) return BadRequest("Kode Telah Digunakan");
            try
            {
                Jtransfer Insert = await _uow.JtransferRepo.Add(post);
                if (Insert != null) return Ok(Insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JtransferPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtransfer post = _mapper.Map<Jtransfer>(param);
            Jtransfer old = await _uow.JtransferRepo.Get(w => w.Kdtransfer == param.Kdtransfer);
            if(old.Idjtransfer != param.Idjtransfer)
            {
                if (old.Kdtransfer == param.Kdtransfer) return BadRequest("Kode Telah Digunakan");
            }
            try
            {
                bool Update = await _uow.JtransferRepo.Update(post);
                if (Update) return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjtransfer}")]
        public async Task<IActionResult> Delete(long Idjtransfer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtransfer data = await _uow.JtransferRepo.Get(w => w.Idjtransfer == Idjtransfer);
                if (data == null) return BadRequest("Data Tidak Tersedia");
                _uow.JtransferRepo.Remove(data);
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