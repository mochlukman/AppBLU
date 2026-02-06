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

namespace BLUDBE.Controllers.SP2DONLINE
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp2dNtpnController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp2dNtpnController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required] PrimengTableParam<Sp2dGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Sp2dntpn> data = await _uow.Sp2dNtpnRepo.Paging(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Sp2dNtpnPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2dntpn post = _mapper.Map<Sp2dntpn>(param);
            Sp2d sp2d = await _uow.Sp2dRepo.Get(w => w.Idsp2d == param.Idsp2d);
            post.Nosp2d = sp2d.Nosp2d;
            post.Tglsp2d = sp2d.Tglsp2d;
            post.Kdstatus = sp2d.Kdstatus;
            post.Idxkode = sp2d.Idxkode;
            try
            {
                Sp2dntpn insert = await _uow.Sp2dNtpnRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.Sp2dNtpnRepo.ViewData(insert.Idntpn));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Sp2dNtpnPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2dntpn post = _mapper.Map<Sp2dntpn>(param);
            Sp2d sp2d = await _uow.Sp2dRepo.Get(w => w.Idsp2d == param.Idsp2d);
            post.Nosp2d = sp2d.Nosp2d;
            post.Tglsp2d = sp2d.Tglsp2d;
            post.Kdstatus = sp2d.Kdstatus;
            post.Idxkode = sp2d.Idxkode;
            try
            {
                bool update = await _uow.Sp2dNtpnRepo.Update(post);
                if (update)
                    return Ok(await _uow.Sp2dNtpnRepo.ViewData(post.Idntpn));
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idntpn}")]
        public async Task<IActionResult> Delete(long Idntpn)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp2dntpn data = await _uow.Sp2dNtpnRepo.Get(w => w.Idntpn == Idntpn);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.Sp2dNtpnRepo.Remove(data);
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