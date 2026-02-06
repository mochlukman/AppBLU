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
    public class SpmdetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpmdetbController(IUow uow, IMapper mapper)
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
                List<Spmdetb> datas = await _uow.SpmdetbRepo.ViewDatas(Idspm);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idspmdetb}")]
        public async Task<IActionResult> Get(long Idspmdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spmdetb data = await _uow.SpmdetbRepo.ViewData(Idspmdetb);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SpmdetbPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Spmdetb> views = new List<Spmdetb> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Spmdetb insert = await _uow.SpmdetbRepo.Add(new Spmdetb
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
                            views.Add(await _uow.SpmdetbRepo.ViewData(insert.Idspmdetb));
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
        public async Task<IActionResult> Put([FromBody]SpmdetbUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spmdetb post = _mapper.Map<Spmdetb>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool Update = await _uow.SpmdetbRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.SpmdetbRepo.ViewData(post.Idspmdetb));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspmdetb}")]
        public async Task<IActionResult> Delete(long Idspmdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spmdetb data = await _uow.SpmdetbRepo.Get(w => w.Idspmdetb == Idspmdetb);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.SpmdetbRepo.Remove(data);
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