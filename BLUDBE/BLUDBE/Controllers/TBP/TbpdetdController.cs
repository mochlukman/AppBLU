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
    public class TbpdetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public TbpdetdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idtbp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpdetd> datas = await _uow.TbpdetdRepo.ViewDatas(Idtbp);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idtbpdetd}")]
        public async Task<IActionResult> Get(long Idtbpdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdetd data = await _uow.TbpdetdRepo.ViewData(Idtbpdetd);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TbpdetdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Tbpdetd> views = new List<Tbpdetd> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Tbpdetd insert = await _uow.TbpdetdRepo.Add(new Tbpdetd
                        {
                            Idnojetra = 11,
                            Idrek = param.Idrek[i],
                            Idtbp = param.Idtbp,
                            Nilai = param.Nilai[i],
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.TbpdetdRepo.ViewData(insert.Idtbpdetd));
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
        public async Task<IActionResult> Put([FromBody]TbpdetdUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbpdetd post = _mapper.Map<Tbpdetd>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.TbpdetdRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.TbpdetdRepo.ViewData(post.Idtbpdetd));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idtbpdetd}")]
        public async Task<IActionResult> Delete(long Idtbpdetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdetd data = await _uow.TbpdetdRepo.Get(w => w.Idtbpdetd == Idtbpdetd);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.TbpdetdRepo.Remove(data);
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