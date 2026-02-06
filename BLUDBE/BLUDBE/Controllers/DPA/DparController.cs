using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DparController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DparController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpa,
            [FromQuery][Required]long Idkeg,
            [FromQuery][Required]string Kdtahap
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpar> datas = await _uow.DparRepo.Gets(w => w.Iddpa == Iddpa && w.Idkeg == Idkeg && w.Kdtahap.Trim() == Kdtahap.Trim());
                List<DparView> views = _mapper.Map<List<DparView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
                        {
                            v.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == v.Idrek);
                        }
                        if (!String.IsNullOrEmpty(v.Idkeg.ToString()) || v.Idkeg != 0)
                        {
                            v.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == v.Idkeg);
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
        public async Task<IActionResult> Put([FromBody] DparPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpar post = _mapper.Map<Dpar>(param);
                post.Dateupdate = DateTime.Now;
                decimal? totalUTL = post.UpGu + post.Tu + post.Ls;
                if (totalUTL > post.Nilai)
                    return BadRequest("Update Gagal, Total Up/Gu, Tu, LS melebihi Nilai");
                bool update = await _uow.DparRepo.UpdateULT(post);
                if (update)
                {
                    DparView view = _mapper.Map<DparView>(post);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    if (!String.IsNullOrEmpty(view.Idkeg.ToString()) || view.Idkeg != 0)
                    {
                        view.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == view.Idkeg);
                    }
                    return Ok(view);
                }
                return BadRequest("Update Gagal");
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-bpkdetr")]
        public async Task<IActionResult> GetByBpkdetr(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idkeg,
            [FromQuery][Required]long Idbpk
            )
        {
            try
            {
                List<DparView> datas = await _uow.DparRepo.GetByBpkdetr(Idunit, Idkeg, Idbpk);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}