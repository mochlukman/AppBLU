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

namespace BLUDBE.Controllers.TBP
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbpdettkegController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public TbpdettkegController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] long Idtbpdett)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpdettkeg> datas = await _uow.TbpdettkegRepo.ViewDatas(Idtbpdett);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idtbpdettkeg}")]
        public async Task<IActionResult> Get(long Idtbpdettkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdettkeg data = await _uow.TbpdettkegRepo.ViewData(Idtbpdettkeg);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TbpdettkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbpdettkeg post = _mapper.Map<Tbpdettkeg>(param);
            post.Datecreate = DateTime.Now;
            post.Nilai = 0;
            Tbpdettkeg check = await _uow.TbpdettkegRepo.Get(w => w.Idtbpdett == post.Idtbpdett && w.Idkeg == post.Idkeg);
            if(check != null)
            {
                Mkegiatan mkegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == check.Idkeg);
                return BadRequest("Gagal Input, " + mkegiatan.Nmkegunit + " Telah Ditambahkan");
            }
            try
            {
                Tbpdettkeg insert = await _uow.TbpdettkegRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.TbpdettkegRepo.ViewData(insert.Idtbpdettkeg));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TbpdettkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbpdettkeg post = _mapper.Map<Tbpdettkeg>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.TbpdettkegRepo.Update(post);
                if (update)
                {
                    Tbpdettkeg view = await _uow.TbpdettkegRepo.ViewData(post.Idtbpdettkeg);
                    return Ok(view);
                }
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idtbpdettkeg}")]
        public async Task<IActionResult> Delete(long Idtbpdettkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdettkeg data = await _uow.TbpdettkegRepo.ViewData(Idtbpdettkeg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.TbpdettkegRepo.Remove(data);
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