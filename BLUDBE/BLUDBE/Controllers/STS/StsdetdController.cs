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

namespace BLUDBE.Controllers.STS
{
    [Route("api/[controller]")]
    [ApiController]
    public class StsdetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public StsdetdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idsts)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Stsdetd> datas = await _uow.StsdetdRepo.ViewDatas(Idsts);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstsdetd}")]
        public async Task<IActionResult> Get(long Idstsdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetd data = await _uow.StsdetdRepo.ViewData(Idstsdetd);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]StsdetdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Stsdetd> views = new List<Stsdetd> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Stsdetd insert = await _uow.StsdetdRepo.Add(new Stsdetd
                        {
                            Idnojetra = 11,
                            Idrek = param.Idrek[i],
                            Idsts = param.Idsts,
                            Nilai = 0,
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.StsdetdRepo.ViewData(insert.Idstsdetd));
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
        public async Task<IActionResult> Put([FromBody]StsdetdUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdetd post = _mapper.Map<Stsdetd>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.StsdetdRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.StsdetdRepo.ViewData(post.Idstsdetd));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idstsdetd}")]
        public async Task<IActionResult> Delete(long Idstsdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetd data = await _uow.StsdetdRepo.Get(w => w.Idstsdetd == Idstsdetd);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.StsdetdRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}