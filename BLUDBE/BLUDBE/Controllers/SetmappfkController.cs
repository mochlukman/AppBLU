using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using BLUDBE.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetmappfkController : ControllerBase
    {
        private readonly IUow _uow;
        public SetmappfkController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idreknrc
            )
        {
            try
            {
                List<Setmappfk> datas = await _uow.SetmappfkRepo.ViewDatas(Idreknrc);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(SetmappfkPost param)
        {
            bool succes = false;
            try
            {
                List<Setmappfk> post = new List<Setmappfk>();
                if (param.Idrekpot.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekpot.Count(); i++)
                    {
                        bool check = await _uow.SetmappfkRepo.isExist(w => w.Idreknrc == param.Idreknrc && w.Idrekpot == param.Idrekpot[i]);
                        if (!check)
                        {
                            post.Add(new Setmappfk
                            {
                                Idrekpot = param.Idrekpot[i],
                                Idreknrc = param.Idreknrc
                            });
                        }
                    }
                    _uow.SetmappfkRepo.AddRange(post);
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
        [HttpDelete("{Idmappfk}")]
        public async Task<IActionResult> Delete(long Idmappfk)
        {
            try
            {
                Setmappfk data = await _uow.SetmappfkRepo.Get(w => w.Idmappfk == Idmappfk);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetmappfkRepo.Remove(data);
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