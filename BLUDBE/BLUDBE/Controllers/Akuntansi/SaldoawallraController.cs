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

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaldoawallraController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SaldoawallraController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idjnsakun
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Saldoawallra> data = await _uow.SaldoawallraRepo.ViewDatas(Idunit, Idjnsakun);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SaldoawallraPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawallra post = _mapper.Map<Saldoawallra>(param);
            bool exist = await _uow.SaldoawallraRepo.isExist(w => w.Idunit == param.Idunit && w.Idrek == param.Idrek && w.Idjnsakun == param.Idjnsakun);
            if (exist)
            {
                return BadRequest("Rekening Telah Ditambahkan, Silahkan Edit Nilai");
            }
            post.Datecreate = DateTime.Now;
            try
            {
                Saldoawallra insert = await _uow.SaldoawallraRepo.Add(post);
                if (insert != null)
                {
                    return Ok(await _uow.SaldoawallraRepo.ViewData(insert.Idsaldo));
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
        public async Task<IActionResult> Put([FromBody] SaldoawallraPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawallra post = _mapper.Map<Saldoawallra>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.SaldoawallraRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SaldoawallraRepo.ViewData(post.Idsaldo));
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
                Saldoawallra data = await _uow.SaldoawallraRepo.Get(w => w.Idsaldo == Idsaldo);
                if (data == null) return BadRequest("Data Tidak Tersedia");
                _uow.SaldoawallraRepo.Remove(data);
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