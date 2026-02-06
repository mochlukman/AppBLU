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
    public class MappingAsetUtangController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingAsetUtangController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery]long Idrekaset
            )
        {
            try
            {
                List<Setnrcmap> datas = await _uow.SetnrcmapRepo.ViewDatas(Idrekaset);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MapAsetPost param)
        {
            bool succes = false;
            try
            {
                List<Setnrcmap> post = new List<Setnrcmap>();
                if (param.Idrekhutang.Count() > 0)
                {
                    for (var i = 0; i < param.Idrekhutang.Count(); i++)
                    {
                        bool check = await _uow.SetnrcmapRepo.isExist(w => w.Idrekaset == param.Idrekaset && w.Idrekhutang == param.Idrekhutang[i]);
                        if (!check)
                        {
                            post.Add(new Setnrcmap
                            {
                                Idrekhutang = param.Idrekhutang[i],
                                Idrekaset = param.Idrekaset
                            });
                        }
                    }
                    _uow.SetnrcmapRepo.AddRange(post);
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
        [HttpDelete("{Idsetnrcmap}")]
        public async Task<IActionResult> Delete(long Idsetnrcmap)
        {
            try
            {
                Setnrcmap data = await _uow.SetnrcmapRepo.Get(w => w.Idsetnrcmap == Idsetnrcmap);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.SetnrcmapRepo.Remove(data);
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