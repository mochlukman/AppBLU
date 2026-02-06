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
    public class SetdapbdrbaController : ControllerBase
    {
        private readonly IUow _uow;
        public SetdapbdrbaController(IUow uow)
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
                List<Setdapbdrba> datas = await _uow.SetdapbdrbaRepo.ViewDatas(Idrekapbd);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(SetdapbdrbaPost param)
        {
            bool succes = false;
            try
            {
                List<Setdapbdrba> post = new List<Setdapbdrba>();
                if (param.Idrekrba.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekrba.Count(); i++)
                    {
                        bool check = await _uow.SetdapbdrbaRepo.isExist(w => w.Idrekapbd == param.Idrekapbd && w.Idrekrba == param.Idrekrba[i]);
                        if (!check)
                        {
                            post.Add(new Setdapbdrba
                            {
                                Idrekrba = param.Idrekrba[i],
                                Idrekapbd = param.Idrekapbd
                            });
                        }
                    }
                    _uow.SetdapbdrbaRepo.AddRange(post);
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
        [HttpDelete("{Idsetdapbdrba}")]
        public async Task<IActionResult> Delete(long Idsetdapbdrba)
        {
            try
            {
                Setdapbdrba data = await _uow.SetdapbdrbaRepo.Get(w => w.Idsetdapbdrba == Idsetdapbdrba);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetdapbdrbaRepo.Remove(data);
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