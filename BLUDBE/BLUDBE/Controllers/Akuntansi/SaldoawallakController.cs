using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaldoawallakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SaldoawallakController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]SaldoawallakGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Saldoawallak> data = await _uow.SaldoawallakRepo.ViewDatas(param.Idunit);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SaldoawallakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawallak post = _mapper.Map<Saldoawallak>(param);
            bool exist = await _uow.SaldoawallakRepo.isExist(w => w.Idunit == param.Idunit && w.Idrek == param.Idrek);
            if (exist)
            {
                return BadRequest("Rekening Telah Ditambahkan, Silahkan Edit Nilai");
            }
            post.Datecreate = DateTime.Now;
            try
            {
                Saldoawallak insert = await _uow.SaldoawallakRepo.Add(post);
                if (insert != null)
                {
                    return Ok();
                }
                return Ok("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SaldoawallakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawallak post = _mapper.Map<Saldoawallak>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.SaldoawallakRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SaldoawalnrcRepo.ViewData(post.Idsaldo));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsaldo}")]
        public async Task<IActionResult> Delete(long Idsaldo)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Saldoawallak data = await _uow.SaldoawallakRepo.Get(w => w.Idsaldo == Idsaldo);
                if (data == null) return BadRequest("Data Tidak Tersedia");
                _uow.SaldoawallakRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
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