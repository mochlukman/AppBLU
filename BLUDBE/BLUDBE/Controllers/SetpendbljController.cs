using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetpendbljController : ControllerBase
    {
        private readonly IUow _uow;
        public SetpendbljController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idrekd
            )
        {
            try
            {
                List<Setpendblj> datas = await _uow.SetpendbljRepo.ViewDatas(Idrekd);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(SetpendbljPost param)
        {
            bool succes = false;
            try
            {
                List<Setpendblj> post = new List<Setpendblj>();
                if (param.Idrekr.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekr.Count(); i++)
                    {
                        bool check = await _uow.SetpendbljRepo.isExist(w => w.Idrekd == param.Idrekd && w.Idrekr == param.Idrekr[i]);
                        if (!check)
                        {
                            post.Add(new Setpendblj
                            {
                                Idrekr = param.Idrekr[i],
                                Idrekd = param.Idrekd
                            });
                        }
                    }
                    _uow.SetpendbljRepo.AddRange(post);
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
        [HttpDelete("{Idsetpendblj}")]
        public async Task<IActionResult> Delete(long Idsetpendblj)
        {
            try
            {
                Setpendblj data = await _uow.SetpendbljRepo.Get(w => w.Idsetpendblj == Idsetpendblj);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetpendbljRepo.Remove(data);
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