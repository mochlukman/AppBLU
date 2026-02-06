using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp3bdetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp3bdetController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]Sp3bdetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp3bdet> datas = await _uow.Sp3BdetRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsp3bdet}")]
        public async Task<IActionResult> Delete(long Idsp3bdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp3bdet data = await _uow.Sp3BdetRepo.Get(w => w.Idsp3bdet == Idsp3bdet);
                if (data != null)
                {
                    _uow.Sp3BdetRepo.Remove(data);
                    if (await _uow.Complete()) return Ok();
                }
                return Ok("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}