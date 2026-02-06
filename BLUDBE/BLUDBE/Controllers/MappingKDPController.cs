using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MappingKDPController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingKDPController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idrekkdp
            )
        {
            try
            {
                List<Setkdp> datas = await _uow.SetkdpRepo.ViewDatas(Idrekkdp);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MapKDPPost param)
        {
            bool succes = false;
            try
            {
                List<Setkdp> post = new List<Setkdp>();
                if (param.Idrekbm.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekbm.Count(); i++)
                    {
                        bool check = await _uow.SetkdpRepo.isExist(w => w.Idrekkdp == param.Idrekkdp && w.Idrekbm == param.Idrekbm[i]);
                        if (!check)
                        {
                            post.Add(new Setkdp
                            {
                                Idrekbm = param.Idrekbm[i],
                                Idrekkdp = param.Idrekkdp
                            });
                        }
                    }
                    _uow.SetkdpRepo.AddRange(post);
                    if (await _uow.Complete())
                        succes = true;
                }
                if (succes)
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsetkdp}")]
        public async Task<IActionResult> Delete(long Idsetkdp)
        {
            try
            {
                Setkdp data = await _uow.SetkdpRepo.Get(w => w.Idsetkdp == Idsetkdp);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetkdpRepo.Remove(data);
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