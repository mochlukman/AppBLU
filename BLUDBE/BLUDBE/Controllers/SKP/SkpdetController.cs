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

namespace BLUDBE.Controllers.SKP
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkpdetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SkpdetController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idskp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Skpdet> datas = await _uow.SkpdetRepo.ViewDatas(Idskp);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idskpdet}")]
        public async Task<IActionResult> Get(long Idskpdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Skpdet data = await _uow.SkpdetRepo.ViewData(Idskpdet);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SkpdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Skpdet> views = new List<Skpdet> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Skpdet insert = await _uow.SkpdetRepo.Add(new Skpdet
                        {
                            Idnojetra = 11,
                            Idrek = param.Idrek[i],
                            Idskp = param.Idskp,
                            Nilai = 0
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.SkpdetRepo.ViewData(insert.Idskpdet));
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
        public async Task<IActionResult> Put([FromBody]SkpdetUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Skpdet post = _mapper.Map<Skpdet>(param);
            try
            {
                bool Update = await _uow.SkpdetRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.SkpdetRepo.ViewData(post.Idskpdet));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idskpdet}")]
        public async Task<IActionResult> Delete(long Idskpdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Skpdet data = await _uow.SkpdetRepo.Get(w => w.Idskpdet == Idskpdet);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.SkpdetRepo.Remove(data);
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