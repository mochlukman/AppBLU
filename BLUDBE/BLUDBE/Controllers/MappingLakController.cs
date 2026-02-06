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
    public class MappingLakController : ControllerBase
    {
        private readonly IUow _uow;
        public MappingLakController(IUow uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery][Required] string Idjnslak,
            [FromQuery]long Idreklak
            )
        {
            try
            {
                if (Idjnslak == "1") // Peneriamaan
                {
                    List<Setdlak> datas = await _uow.SetdlakRepo.ViewDatas(Idreklak);
                    return Ok(datas);
                }
                else if (Idjnslak == "2") // Pengeluaran
                {
                    List<Setrlak> datas = await _uow.SetrlakRepo.ViewDatas(Idreklak);
                    return Ok(datas);
                }
                else // 6 Pembiayaan
                {
                    List<Setblak> datas = await _uow.SetblakRepo.ViewDatas(Idreklak);
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
        public async Task<IActionResult> Post(MappingLakPost param)
        {
            bool succes = false;
            try
            {
                if (param.Idjnslak == "1") // Penerimaan
                {
                    List<Setdlak> post = new List<Setdlak>();
                    if (param.Idreklra.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreklra.Count(); i++)
                        {
                            bool check = await _uow.SetdlakRepo.isExist(w => w.Idreklak == param.Idreklak && w.Idreklra == param.Idreklra[i]);
                            if (!check)
                            {
                                post.Add(new Setdlak
                                {
                                    Idreklra = param.Idreklra[i],
                                    Idreklak = param.Idreklak
                                });
                            }
                        }
                        _uow.SetdlakRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
                else if (param.Idjnslak == "2") // Pengeluaran
                {
                    List<Setrlak> post = new List<Setrlak>();
                    if (param.Idreklra.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreklra.Count(); i++)
                        {
                            bool check = await _uow.SetrlakRepo.isExist(w => w.Idreklak == param.Idreklak && w.Idreklra == param.Idreklra[i]);
                            if (!check)
                            {
                                post.Add(new Setrlak
                                {
                                    Idreklra = param.Idreklra[i],
                                    Idreklak = param.Idreklak
                                });
                            }
                        }
                        _uow.SetrlakRepo.AddRange(post);
                        if (await _uow.Complete())
                            succes = true;
                    }
                    if (succes)
                        return Ok();
                    return BadRequest();
                }
                else // Pembiayaan
                {
                    List<Setblak> post = new List<Setblak>();
                    if (param.Idreklra.Count() > 0)
                    {
                        for (var i = 0; i < param.Idreklra.Count(); i++)
                        {
                            bool check = await _uow.SetblakRepo.isExist(w => w.Idreklak == param.Idreklak && w.Idreklra == param.Idreklra[i]);
                            if (!check)
                            {
                                post.Add(new Setblak
                                {
                                    Idreklra = param.Idreklra[i],
                                    Idreklak = param.Idreklak
                                });
                            }
                        }
                        _uow.SetblakRepo.AddRange(post);
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
        [HttpDelete("{Idjnslak}/{Idsetlak}")]
        public async Task<IActionResult> Delete(string Idjnslak, long Idsetlak)
        {
            try
            {
                if (Idjnslak == "1")
                {
                    Setdlak data = await _uow.SetdlakRepo.Get(w => w.Idsetdlak == Idsetlak);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetdlakRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                } else if (Idjnslak == "2")
                {
                    Setrlak data = await _uow.SetrlakRepo.Get(w => w.Idsetrlak == Idsetlak);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetrlakRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest();
                }
                else
                {
                    Setblak data = await _uow.SetblakRepo.Get(w => w.Idsetblak == Idsetlak);
                    if (data == null)
                        return BadRequest("Data Tidak Ditemukan");
                    _uow.SetblakRepo.Remove(data);
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