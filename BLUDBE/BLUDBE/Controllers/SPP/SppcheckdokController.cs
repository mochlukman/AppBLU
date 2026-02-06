using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPP
{
    [Route("api/[controller]")]
    [ApiController]
    public class SppcheckdokController : ControllerBase
    {
        private readonly IUow _uow;
        public SppcheckdokController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]SppcheckdokGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sppcheckdok> data = await _uow.SppcheckdokRepo.ViewDatas(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SppcheckdokPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sppcheckdok> Result = new List<Sppcheckdok>();
                if(param.Idcheck.Count() > 0)
                {
                    for (var i = 0; i < param.Idcheck.Count(); i++)
                    {
                        bool exist = await _uow.SppcheckdokRepo.isExist(w => w.Idspp == param.Idspp && w.Idcheck == param.Idcheck[i]);
                        if (!exist)
                        {
                            Sppcheckdok insert = await _uow.SppcheckdokRepo.Add(new Sppcheckdok
                            {
                                Createby = User.Claims.FirstOrDefault().Value,
                                Createdate = DateTime.Now,
                                Idcheck = param.Idcheck[i],
                                Idspp = param.Idspp,
                            });
                            if (insert != null)
                            {
                                Result.Add(await _uow.SppcheckdokRepo.ViewData(insert.Idspp, insert.Idcheck));
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
        public async Task<IActionResult> Delete([FromBody] SppcheckdokGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppcheckdok data = await _uow.SppcheckdokRepo.Get(w => w.Idspp == param.Idspp && w.Idcheck == param.Idcheck);
                if (data == null)
                    return BadRequest("Data Tidak Ditemunkan");
                _uow.SppcheckdokRepo.Remove(data);
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