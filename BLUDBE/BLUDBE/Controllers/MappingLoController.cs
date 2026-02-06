using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MappingLoController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingLoController(IUow uow)
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
                if(Idjnsakun == "7") // pendapatan
                {
                    List<Setdlralo> datas = await _uow.SetdlraloRepo.ViewDatas(Idreklo);
                    return Ok(datas);
                } else // belanja
                {
                    List<Setrlralo> datas = await _uow.SetrlraloRepo.ViewDatas(Idreklo);
                    return Ok(datas);
                }
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MapLoPost param)
        {
            bool succes = false;
            try
            {
                if (param.Idjnsakun == "7") // pendapatan
                {
                    List<Setdlralo> post = new List<Setdlralo>();
                    if(param.Idreklra.Count() > 0)
                    {
                        for(var i = 0; i < param.Idreklra.Count(); i++)
                        {
                            bool check = await _uow.SetdlraloRepo.isExist(w => w.Idreklo == param.Idreklo && w.Idreklra == param.Idreklra[i]);
                            if (!check)
                            {
                                post.Add(new Setdlralo
                                {
                                    Idreklra = param.Idreklra[i],
                                    Idreklo = param.Idreklo
                                });
                            }
                        }
                        _uow.SetdlraloRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
                else // belanja
                {
                    List<Setrlralo> post = new List<Setrlralo>();
                    if (param.Idreklra.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreklra.Count(); i++)
                        {
                            bool check = await _uow.SetrlraloRepo.isExist(w => w.Idreklo == param.Idreklo && w.Idreklra == param.Idreklra[i]);
                            if (!check)
                            {
                                post.Add(new Setrlralo
                                {
                                    Idreklra = param.Idreklra[i],
                                    Idreklo = param.Idreklo
                                });
                            }
                        }
                        _uow.SetrlraloRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjnsakun}/{Idsetlralo}")]
        public async Task<IActionResult> Delete(string Idjnsakun, long Idsetlralo)
        {
            try
            {
                if(Idjnsakun == "7")
                {
                    Setdlralo data = await _uow.SetdlraloRepo.Get(w => w.Idsetdlralo == Idsetlralo);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetdlraloRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                } else
                {
                    Setrlralo data = await _uow.SetrlraloRepo.Get(w => w.Idsetrlralo == Idsetlralo);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetrlraloRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}