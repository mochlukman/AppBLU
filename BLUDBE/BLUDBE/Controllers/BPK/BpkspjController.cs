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

namespace BLUDBE.Controllers.BPK
{
    [Route("api/[controller]")]
    [ApiController]
    public class BpkspjController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BpkspjController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] string By, // bpk / spj
            [FromQuery][Required] long Idref // Idbpk / idspj
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<BpkspjView> data = new List<BpkspjView>() { };
                if(By == "bpk")
                {
                    data.AddRange(await _uow.BpkspjRepo.ByBpk(Idref));
                } else if(By == "spj")
                {
                    data.AddRange(await _uow.BpkspjRepo.BySpj(Idref));
                }
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BpkspjPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<BpkspjView> views = new List<BpkspjView> { };
            try
            {
                if (param.Idbpk.Count() > 0)
                {
                    for (var i = 0; i < param.Idbpk.Count(); i++)
                    {
                        Bpkspj insert = await _uow.BpkspjRepo.Add(new Bpkspj
                        {
                            Idbpk = param.Idbpk[i],
                            Idspj = param.Idspj,
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.BpkspjRepo.ViewData(insert.Idbpkspj));
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
        [HttpDelete("{Idbpkspj}")]
        public async Task<IActionResult> Delete(long Idbpkspj)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkspj data = await _uow.BpkspjRepo.Get(w => w.Idbpkspj == Idbpkspj);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.BpkspjRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}