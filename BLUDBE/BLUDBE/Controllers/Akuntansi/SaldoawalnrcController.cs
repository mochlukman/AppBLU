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
    public class SaldoawalnrcController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SaldoawalnrcController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Saldoawalnrc> data = await _uow.SaldoawalnrcRepo.ViewDatas(Idunit);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SaldoawalnrcPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawalnrc post = _mapper.Map<Saldoawalnrc>(param);
            bool exist = await _uow.SaldoawalnrcRepo.isExist(w => w.Idunit == param.Idunit && w.Idrek == param.Idrek);
            if (exist)
            {
                return BadRequest("Rekening Telah Ditambahkan, Silahkan Edit Nilai");
            }
            post.Datecreate = DateTime.Now;
            try
            {
                Saldoawalnrc insert = await _uow.SaldoawalnrcRepo.Add(post);
                if(insert != null)
                {
                    return Ok(await _uow.SaldoawalnrcRepo.ViewData(insert.Idsaldo));
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
        public async Task<IActionResult> Put([FromBody] SaldoawalnrcPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Saldoawalnrc post = _mapper.Map<Saldoawalnrc>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.SaldoawalnrcRepo.Update(post);
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
                Saldoawalnrc data = await _uow.SaldoawalnrcRepo.Get(w => w.Idsaldo == Idsaldo);
                if (data == null) return BadRequest("Data Tidak Tersedia");
                _uow.SaldoawalnrcRepo.Remove(data);
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