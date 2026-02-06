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

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkarController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkarController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkaGlobalGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if(param.Parameters.Idkeg.ToString() != "0")
            {
                Kegunit kegunit = await _uow.KegunitRepo.Get(w => w.Idkegunit == param.Parameters.Idkeg);
                if(kegunit != null)
                {
                    param.Parameters.Idkeg = kegunit.Idkeg;
                }
            }
            try
            {
                PrimengTableResult<RkarView> data = await _uow.RkarRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<RkarView> views = new List<RkarView> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Kegunit kegunit = await _uow.KegunitRepo.Get(w => w.Idkegunit == param.Idkeg);
                        Rkar insert = await _uow.RkarRepo.Add(new Rkar
                        {
                            Idunit = param.Idunit,
                            Kdtahap = param.Kdtahap,
                            Idkegunit = kegunit.Idkegunit,
                            Idkeg = kegunit.Idkeg,
                            Idrek = param.Idrek[i],
                            Nilai = 0,
                            Createdby = User.Claims.FirstOrDefault().Value,
                            Createddate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.RkarRepo.ViewData(insert.Idrkar));
                        }
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]RkarUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkar Post = _mapper.Map<Rkar>(param);
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;

            Rkar dataRka = await _uow.RkarRepo.Get(w => w.Idrkar == param.Idrkar);
            Kegunit cKeg = await _uow.KegunitRepo.Get((long)dataRka.Idkegunit);
            var PaguKegiatan = cKeg.Pagu;

            RkarView Rkarviewpar = new RkarView
            {
                Idrkar = Post.Idrkar
            };
            var TotalNilai = await _uow.RkarRepo.TotalNilaiKeg(dataRka.Idunit,dataRka.Idkeg, dataRka.Kdtahap);
            TotalNilai = TotalNilai - dataRka.Nilai;
            TotalNilai = TotalNilai + param.Nilai;
            if (TotalNilai > PaguKegiatan)
            {
                return BadRequest("Total Nilai Rekening : " + TotalNilai.ToString() + ", Melebihi Pagu Kegiatan : " + PaguKegiatan.ToString());
            }
            try
            {
                bool Update = await _uow.RkarRepo.Update(Post);
                if (Update)
                {

                    return Ok();
                }
                else
                {
                    return BadRequest("Update Nilai Gagal");
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrkar}")]
        public async Task<IActionResult> Delete(long Idrkar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkar data = await _uow.RkarRepo.Get(w => w.Idrkar == Idrkar);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long rkadetrs = await _uow.RkadetrRepo.Count(w => w.Idrkar == Idrkar);
                long rkadanars = await _uow.RkadanarRepo.Count(w => w.Idrkar == Idrkar);
                if (rkadetrs > 0 || rkadanars > 0)
                {
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                }
                _uow.RkarRepo.Remove(data);
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