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
    public class MappingKorolariController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingKorolariController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idrek
            )
        {
            try
            {
                List<Setkorolari> datas = await _uow.SetkorolariRepo.ViewDatas(Idrek);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MapBelanjaModalPost param)
        {
            bool succes = false;
            try
            {
                List<Setkorolari> post = new List<Setkorolari>();
                if (param.Idreknrc.Count() > 0)
                {
                    for (var i = 0; i < param.Idreknrc.Count(); i++)
                    {
                        bool check = await _uow.SetkorolariRepo.isExist(w => w.Idrek == param.Idrek && w.Idreknrc == param.Idreknrc[i]);
                        if (!check)
                        {
                            post.Add(new Setkorolari
                            {
                                Idreknrc = param.Idreknrc[i],
                                Idrek = param.Idrek,
                                Kdpers = param.Kdpers
                            });
                        }
                    }
                    _uow.SetkorolariRepo.AddRange(post);
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
        [HttpDelete("{Idkorolari}")]
        public async Task<IActionResult> Delete(long Idkorolari)
        {
            try
            {
                Setkorolari data = await _uow.SetkorolariRepo.Get(w => w.Idkorolari == Idkorolari);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetkorolariRepo.Remove(data);
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