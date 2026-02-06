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

namespace BLUDBE.Controllers.SPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpjlpjController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpjlpjController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] long Idlpj
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<SpjlpjView> data = await _uow.SpjlpjRepo.ViewDatas(Idlpj);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SpjlpjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<SpjlpjView> views = new List<SpjlpjView> { };
            try
            {
                if (param.Idspj.Count() > 0)
                {
                    for (var i = 0; i < param.Idspj.Count(); i++)
                    {
                        Spjlpj insert = await _uow.SpjlpjRepo.Add(new Spjlpj
                        {
                            Idspj = param.Idspj[i],
                            Idlpj = param.Idlpj,
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.SpjlpjRepo.ViewData(insert.Idspjlpj));
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
        [HttpDelete("{Idspjlpj}")]
        public async Task<IActionResult> Delete(long Idspjlpj)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spjlpj data = await _uow.SpjlpjRepo.Get(w => w.Idspjlpj == Idspjlpj);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SpjlpjRepo.Remove(data);
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