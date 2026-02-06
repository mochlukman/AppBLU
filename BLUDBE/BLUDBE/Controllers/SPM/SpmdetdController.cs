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

namespace BLUDBE.Controllers.SPM
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpmdetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpmdetdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idspm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spmdetd> datas = await _uow.SpmdetdRepo.ViewDatas(Idspm);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idspmdetd}")]
        public async Task<IActionResult> Get(long Idspmdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spmdetd data = await _uow.SpmdetdRepo.ViewData(Idspmdetd);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SpmdetdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Spmdetd> views = new List<Spmdetd> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Spmdetd insert = await _uow.SpmdetdRepo.Add(new Spmdetd
                        {
                            Idnojetra = 21,
                            Idrek = param.Idrek[i],
                            Idspm = param.Idspm,
                            Nilai = 0,
                            Createdate = DateTime.Now,
                            Createby = User.Claims.FirstOrDefault().Value
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.SpmdetdRepo.ViewData(insert.Idspmdetd));
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
        public async Task<IActionResult> Put([FromBody]SpmdetdUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spmdetd post = _mapper.Map<Spmdetd>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool Update = await _uow.SpmdetdRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.SpmdetdRepo.ViewData(post.Idspmdetd));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspmdetd}")]
        public async Task<IActionResult> Delete(long Idspmdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spmdetd data = await _uow.SpmdetdRepo.Get(w => w.Idspmdetd == Idspmdetd);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.SpmdetdRepo.Remove(data);
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