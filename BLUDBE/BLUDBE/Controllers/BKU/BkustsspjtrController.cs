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

namespace BLUDBE.Controllers.BKU
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkustsspjtrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkustsspjtrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] long Idspjtr
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<BkustsspjtrView> data = await _uow.BkustsspjtrRepo.ViewDatas(Idspjtr);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkustsspjtrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<BkustsspjtrView> views = new List<BkustsspjtrView> { };
            try
            {
                if (param.Idbkusts.Count() > 0)
                {
                    for (var i = 0; i < param.Idbkusts.Count(); i++)
                    {
                        Bkustsspjtr insert = await _uow.BkustsspjtrRepo.Add(new Bkustsspjtr
                        {
                            Idbkusts = param.Idbkusts[i],
                            Idspjtr = param.Idspjtr,
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.BkustsspjtrRepo.ViewData(insert.Idbkustsspjtr));
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
        [HttpDelete("{Idbkustsspjtr}")]
        public async Task<IActionResult> Delete(long Idbkustsspjtr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkustsspjtr data = await _uow.BkustsspjtrRepo.Get(w => w.Idbkustsspjtr == Idbkustsspjtr);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.BkustsspjtrRepo.Remove(data);
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