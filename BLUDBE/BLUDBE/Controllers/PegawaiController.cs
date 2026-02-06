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

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PegawaiController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public PegawaiController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("by-tabel-pemda")]
        public async Task<IActionResult> GetsByPemda()
        {
            Pemda pemda = await _uow.PemdaRepo.Get(w => w.Configid.Trim() == "curskpkd");
            try
            {
                List<Pegawai> datas = await _uow.PegawaiRepo.Gets(w => w.Idunit == Int64.Parse(pemda.Configval));
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if (!String.IsNullOrEmpty(d.Kdgol))
                        {
                            d.KdgolNavigation = await _uow.GolonganRepo.Get(w => w.Kdgol.Trim() == d.Kdgol.Trim());
                        }
                    }
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
           }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]PegawaiGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Pegawai> datas = await _uow.PegawaiRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpeg}")]
        public async Task<IActionResult> Get(long Idpeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Pegawai data = await _uow.PegawaiRepo.ViewData(Idpeg);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<PegawaiGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Pegawai> data = await _uow.PegawaiRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PegawaiPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pegawai post = _mapper.Map<Pegawai>(param);
            post.Datecreate = DateTime.Now;
            bool check_nip = await _uow.PegawaiRepo.isExist(w => w.Nip.Trim() == param.Nip.Trim());
            if (check_nip)
                return BadRequest("Nip Telah Digunakan");
            try
            {
                Pegawai insert = await _uow.PegawaiRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.PegawaiRepo.ViewData(insert.Idpeg));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PegawaiPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pegawai post = _mapper.Map<Pegawai>(param);
            post.Datecreate = DateTime.Now;
            Pegawai check = await _uow.PegawaiRepo.Get(w => w.Nip.Trim() == param.Nip.Trim());
            if(check != null)
            {
                if(check.Idpeg != post.Idpeg)
                {
                    return BadRequest("Nip Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.PegawaiRepo.Update(post);
                if (update)
                    return Ok(await _uow.PegawaiRepo.ViewData(post.Idpeg));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpeg}")]
        public async Task<IActionResult> Delete(long Idpeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Pegawai data = await _uow.PegawaiRepo.Get(w => w.Idpeg == Idpeg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long user = await _uow.WebuserRepo.Count(w => w.Idpeg == Idpeg);
                long bend = await _uow.BendRepo.Count(w => w.Idpeg == Idpeg);
                if(user > 0 || bend > 0)
                {
                    return BadRequest("Hapus Gagal, Data Telah Digunakan");
                }
                _uow.PegawaiRepo.Remove(data);
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