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

namespace BLUDBE.Controllers.SPD
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpddetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpddetbController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idspd
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spddetb> datas = await _uow.SpddetbRepo.Gets(w => w.Idspd == Idspd);
                List<SpddetbView> views = _mapper.Map<List<SpddetbView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
                        {
                            v.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == v.Idrek);
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
        [HttpGet("total-nilai")]
        public async Task<IActionResult> GetTotalNilai(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idspd
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                decimal? totalSpd = 0;
                Spd data = await _uow.SpdRepo.Get(w => w.Idspd == Idspd && w.Idunit == Idunit);
                if (data != null)
                {
                    totalSpd = await _uow.SpddetbRepo.TotalNilaiSpd(data.Idspd);
                }
                return Ok(new { totalSpd });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}