using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SP2D
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp2dcheckdokController : ControllerBase
    {
        private readonly IUow _uow;
        public Sp2dcheckdokController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]Sp2dcheckdokGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2dcheckdok> data = await _uow.Sp2DcheckdokRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Sp2dcheckdokPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2dcheckdok> Result = new List<Sp2dcheckdok>();
                if (param.Idcheck.Count() > 0)
                {
                    for (var i = 0; i < param.Idcheck.Count(); i++)
                    {
                        bool exist = await _uow.Sp2DcheckdokRepo.isExist(w => w.Idsp2d == param.Idsp2d && w.Idcheck == param.Idcheck[i]);
                        if (!exist)
                        {
                            Sp2dcheckdok insert = await _uow.Sp2DcheckdokRepo.Add(new Sp2dcheckdok
                            {
                                Createby = User.Claims.FirstOrDefault().Value,
                                Createdate = DateTime.Now,
                                Idcheck = param.Idcheck[i],
                                Idsp2d = param.Idsp2d,
                            });
                            if (insert != null)
                            {
                                Result.Add(await _uow.Sp2DcheckdokRepo.ViewData(insert.Idsp2d, insert.Idcheck));
                            }
                        }
                    }
                }
                return Ok(Result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] Sp2dcheckdokGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp2dcheckdok data = await _uow.Sp2DcheckdokRepo.Get(w => w.Idsp2d == param.Idsp2d && w.Idcheck == param.Idcheck);
                if (data == null)
                    return BadRequest("Data Tidak Ditemunkan");
                _uow.Sp2DcheckdokRepo.Remove(data);
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