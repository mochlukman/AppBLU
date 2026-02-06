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

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpabController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpabController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpa,
            [FromQuery][Required]string Kdtahap
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpab> datas = await _uow.DpabRepo.Gets(w => w.Iddpa == Iddpa && w.Kdtahap.Trim() == Kdtahap.Trim());
                List<DpabView> views = _mapper.Map<List<DpabView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if(!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
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
        [HttpGet("by-stsdetd")]
        public async Task<IActionResult> GetByStsdetd(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idsts
            )
        {
            try
            {
                List<DpabView> datas = await _uow.DpabRepo.GetByStsdetd(Idunit, Idsts);
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