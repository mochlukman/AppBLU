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
    public class BkutbpspjtrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkutbpspjtrController(IUow uow, IMapper mapper)
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
                List<BkutbpspjtrView> data = await _uow.BkutbpspjtrRepo.ViewDatas(Idspjtr);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkutbpspjtrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<BkutbpspjtrView> views = new List<BkutbpspjtrView> { };
            try
            {
                if (param.Idbkutbp.Count() > 0)
                {
                    for (var i = 0; i < param.Idbkutbp.Count(); i++)
                    {
                        Bkutbpspjtr insert = await _uow.BkutbpspjtrRepo.Add(new Bkutbpspjtr
                        {
                            Idbkutbp = param.Idbkutbp[i],
                            Idspjtr = param.Idspjtr,
                            Datecreate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.BkutbpspjtrRepo.ViewData(insert.Idbkutbpspjtr));
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
        [HttpDelete("{Idbkutbpspjtr}")]
        public async Task<IActionResult> Delete(long Idbkutbpspjtr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkutbpspjtr data = await _uow.BkutbpspjtrRepo.Get(w => w.Idbkutbpspjtr == Idbkutbpspjtr);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.BkutbpspjtrRepo.Remove(data);
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