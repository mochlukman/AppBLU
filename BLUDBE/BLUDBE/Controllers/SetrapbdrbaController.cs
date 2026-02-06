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
    public class SetrapbdrbaController : ControllerBase
    {
        private readonly IUow _uow;
        public SetrapbdrbaController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idrekapbd
            )
        {
            try
            {
                List<Setrapbdrba> datas = await _uow.SetrapbdrbaRepo.ViewDatas(Idrekapbd);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(SetrapbdrbaPost param)
        {
            bool succes = false;
            try
            {
                List<Setrapbdrba> post = new List<Setrapbdrba>();
                if (param.Idrekrba.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekrba.Count(); i++)
                    {
                        bool check = await _uow.SetrapbdrbaRepo.isExist(w => w.Idrekapbd == param.Idrekapbd && w.Idrekrba == param.Idrekrba[i]);
                        if (!check)
                        {
                            post.Add(new Setrapbdrba
                            {
                                Idrekrba = param.Idrekrba[i],
                                Idrekapbd = param.Idrekapbd
                            });
                        }
                    }
                    _uow.SetrapbdrbaRepo.AddRange(post);
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
        [HttpDelete("{Idsetrapbdrba}")]
        public async Task<IActionResult> Delete(long Idsetrapbdrba)
        {
            try
            {
                Setrapbdrba data = await _uow.SetrapbdrbaRepo.Get(w => w.Idsetrapbdrba == Idsetrapbdrba);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetrapbdrbaRepo.Remove(data);
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