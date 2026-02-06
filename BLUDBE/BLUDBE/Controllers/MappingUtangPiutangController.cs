using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class MappingUtangPiutangController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingUtangPiutangController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery][Required] string Idjnsakun,
            [FromQuery]long Idreklo
            )
        {
            try
            {
                if (Idjnsakun == "7") // piutang
                {
                    List<Setupdlo> datas = await _uow.SetupdloRepo.ViewDatas(Idreklo);
                    return Ok(datas);
                }
                else // utang
                {
                    List<Setuprlo> datas = await _uow.SetuprloRepo.ViewDatas(Idreklo);
                    return Ok(datas);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MapPiutangPost param)
        {
            bool succes = false;
            try
            {
                if (param.Idjnsakun == "7") // Piutang
                {
                    List<Setupdlo> post = new List<Setupdlo>();
                    if (param.Idreknrc.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreknrc.Count(); i++)
                        {
                            bool check = await _uow.SetupdloRepo.isExist(w => w.Idreklo == param.Idreklo && w.Idreknrc == param.Idreknrc[i]);
                            if (!check)
                            {
                                post.Add(new Setupdlo
                                {
                                    Idreknrc = param.Idreknrc[i],
                                    Idreklo = param.Idreklo
                                });
                            }
                        }
                        _uow.SetupdloRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
                else // utang
                {
                    List<Setuprlo> post = new List<Setuprlo>();
                    if (param.Idreknrc.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreknrc.Count(); i++)
                        {
                            bool check = await _uow.SetuprloRepo.isExist(w => w.Idreklo == param.Idreklo && w.Idreknrc == param.Idreknrc[i]);
                            if (!check)
                            {
                                post.Add(new Setuprlo
                                {
                                    Idreknrc = param.Idreknrc[i],
                                    Idreklo = param.Idreklo
                                });
                            }
                        }
                        _uow.SetuprloRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjnsakun}/{Idsetuplo}")]
        public async Task<IActionResult> Delete(string Idjnsakun, long Idsetuplo)
        {
            try
            {
                if (Idjnsakun == "7")
                {
                    Setupdlo data = await _uow.SetupdloRepo.Get(w => w.Idsetupdlo == Idsetuplo);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetupdloRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                }
                else
                {
                    Setuprlo data = await _uow.SetuprloRepo.Get(w => w.Idsetuprlo == Idsetuplo);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetuprloRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}