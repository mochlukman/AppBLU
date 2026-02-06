using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using System.ComponentModel.DataAnnotations;

namespace BLUDBE.Controllers.TBP
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbpController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public TbpController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]TbpGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if(param.Kdstatus == "x")
                {
                    List<Tbp> datas = await _uow.TbpRepo.ViewDatas(param.Idunit, param.Idxkode);
                    if (datas.Count() > 0)
                    {
                        foreach (var v in datas)
                        {
                            if (v.Idbend1Navigation != null)
                            {
                                if (String.IsNullOrEmpty(v.Idbend1Navigation.Idpeg.ToString()) || v.Idbend1Navigation.Idpeg != 0)
                                {
                                    v.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Idbend1Navigation.Idpeg);
                                }
                                if (!String.IsNullOrEmpty(v.Idbend1Navigation.Jnsbend))
                                {
                                    v.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == v.Idbend1Navigation.Jnsbend.Trim());
                                }
                            }
                            if(v.Skptbp != null)
                            {
                                v.Skptbp.IdskpNavigation = await _uow.SkpRepo.Get(w => w.Idskp == v.Skptbp.Idskp);
                            }
                        }
                    }
                    return Ok(datas);
                } else
                {
                    List<string> status = param.Kdstatus.Split(",").ToList();
                    List<Tbp> datas = await _uow.TbpRepo.ViewDatas(param.Idunit, status, param.Idxkode, param.Idbend, param.Isvalid, param.ExceptTbpsts);
                    if (datas.Count() > 0)
                    {
                        foreach (var v in datas)
                        {
                            if (v.Idbend1Navigation != null)
                            {
                                if (String.IsNullOrEmpty(v.Idbend1Navigation.Idpeg.ToString()) || v.Idbend1Navigation.Idpeg != 0)
                                {
                                    v.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Idbend1Navigation.Idpeg);
                                }
                                if (!String.IsNullOrEmpty(v.Idbend1Navigation.Jnsbend))
                                {
                                    v.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == v.Idbend1Navigation.Jnsbend.Trim());
                                }
                            }
                            if (v.Skptbp != null)
                            {
                                v.Skptbp.IdskpNavigation = await _uow.SkpRepo.Get(w => w.Idskp == v.Skptbp.Idskp);
                            }
                        }
                    }
                    return Ok(datas);
                }
                
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idtbp}")]
        public async Task<IActionResult> Get(long Idtbp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbp data = await _uow.TbpRepo.ViewData(Idtbp);
                if (data != null)
                {
                    if (data.Idbend1Navigation != null)
                    {
                        if (String.IsNullOrEmpty(data.Idbend1Navigation.Idpeg.ToString()) || data.Idbend1Navigation.Idpeg != 0)
                        {
                            data.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == data.Idbend1Navigation.Idpeg);
                        }
                        if (!String.IsNullOrEmpty(data.Idbend1Navigation.Jnsbend))
                        {
                            data.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == data.Idbend1Navigation.Jnsbend.Trim());
                        }
                    }
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("For-Bku")]
        public async Task<IActionResult> GetForBku([FromQuery] BkuParamRef param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkutbp> bkutbps = await _uow.BkutbpRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<long> Idtbps = new List<long>();
                if (bkutbps.Count() > 0)
                {
                    bkutbps.ForEach(f =>
                    {
                        Idtbps.Add(f.Idtbp);
                    });
                }
                List<Tbp> datas = await _uow.TbpRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend1 == param.Idbend && !Idtbps.Contains(w.Idtbp));
                List<Tbp> views = new List<Tbp>();
                if (datas.Count() > 0)
                {
                    foreach (var d in datas)
                    {
                        Tbp data = await _uow.TbpRepo.ViewData(d.Idtbp);
                        if (data != null)
                        {
                            views.Add(data);
                        }

                    }
                }
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (v.Idbend1Navigation != null)
                        {
                            if (String.IsNullOrEmpty(v.Idbend1Navigation.Idpeg.ToString()) || v.Idbend1Navigation.Idpeg != 0)
                            {
                                v.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Idbend1Navigation.Idpeg);
                            }
                            if (!String.IsNullOrEmpty(v.Idbend1Navigation.Jnsbend))
                            {
                                v.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == v.Idbend1Navigation.Jnsbend.Trim());
                            }
                        }
                    }
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TbpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbp post = _mapper.Map<Tbp>(param);
            string[] splitNo = param.Notbp.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.TbpRepo.isExist(w => w.Notbp.Trim() == post.Notbp.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend1 == post.Idbend1);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Tbp insert = await _uow.TbpRepo.Add(post);
                if (insert != null) {
                    if(param.Idskp.ToString() != "0")
                    {
                        bool isExist = await _uow.SkptbpRepo.isExist(w => w.Idskp == param.Idskp && w.Idtbp == insert.Idtbp);
                        if (!isExist)
                        {
                            Skptbp skptbp = new Skptbp
                            {
                                Idskp = param.Idskp,
                                Idtbp = insert.Idtbp
                            };
                            await _uow.SkptbpRepo.Add(skptbp);
                            await _uow.Complete();
                        }
                    }
                    Tbp data = await _uow.TbpRepo.ViewData(insert.Idtbp);
                    if (data != null)
                    {
                        if (data.Idbend1Navigation != null)
                        {
                            if (String.IsNullOrEmpty(data.Idbend1Navigation.Idpeg.ToString()) || data.Idbend1Navigation.Idpeg != 0)
                            {
                                data.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == data.Idbend1Navigation.Idpeg);
                            }
                            if (!String.IsNullOrEmpty(data.Idbend1Navigation.Jnsbend))
                            {
                                data.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == data.Idbend1Navigation.Jnsbend.Trim());
                            }
                        }
                        if (data.Skptbp != null)
                        {
                            data.Skptbp.IdskpNavigation = await _uow.SkpRepo.Get(w => w.Idskp == data.Skptbp.Idskp);
                        }
                    }
                    return Ok(data);
                }
                return BadRequest("Gagal Input");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TbpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbp post = _mapper.Map<Tbp>(param);
            post.Datecreate = DateTime.Now;
            Tbp Old = await _uow.TbpRepo.Get(w => w.Notbp.Trim() == post.Notbp.Trim() && w.Kdstatus.Trim() == post.Kdstatus.Trim() && w.Idxkode == post.Idxkode && w.Idbend1 == post.Idbend1);
            if(Old != null)
            {
                if (Old.Idtbp != post.Idtbp) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.TbpRepo.Update(post);
                if (update)
                {
                    Tbp data = await _uow.TbpRepo.ViewData(post.Idtbp);
                    if (data != null)
                    {
                        if (data.Idbend1Navigation != null)
                        {
                            if (String.IsNullOrEmpty(data.Idbend1Navigation.Idpeg.ToString()) || data.Idbend1Navigation.Idpeg != 0)
                            {
                                data.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == data.Idbend1Navigation.Idpeg);
                            }
                            if (!String.IsNullOrEmpty(data.Idbend1Navigation.Jnsbend))
                            {
                                data.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == data.Idbend1Navigation.Jnsbend.Trim());
                            }
                        }
                        if (data.Skptbp != null)
                        {
                            data.Skptbp.IdskpNavigation = await _uow.SkpRepo.Get(w => w.Idskp == data.Skptbp.Idskp);
                        }
                    }
                    return Ok(data);
                }
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idtbp}")]
        public async Task<IActionResult> Delete(long Idtbp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbp data = await _uow.TbpRepo.Get(w => w.Idtbp == Idtbp);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                long dett = await _uow.TbpdettRepo.Count(w => w.Idtbp == data.Idtbp);
                if (dett > 0) return BadRequest("Gagal Hapus, Data Telah digunakan");
                long detd = await _uow.TbpdetdRepo.Count(w => w.Idtbp == data.Idtbp);
                if (detd > 0) return BadRequest("Gagal Hapus, Data Telah digunakan");
                List <Skptbp> skptbp = await _uow.SkptbpRepo.Gets(w => w.Idtbp == data.Idtbp);
                if (skptbp.Count() > 0)
                {
                    _uow.SkptbpRepo.RemoveRange(skptbp);
                }
                _uow.TbpRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("Pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody] TbpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbp post = _mapper.Map<Tbp>(param);
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool sahkan = await _uow.TbpRepo.Pengesahan(post);
                if (sahkan)
                {
                    Tbp data = await _uow.TbpRepo.ViewData(post.Idtbp);
                    if (data != null)
                    {
                        if (data.Idbend1Navigation != null)
                        {
                            if (String.IsNullOrEmpty(data.Idbend1Navigation.Idpeg.ToString()) || data.Idbend1Navigation.Idpeg != 0)
                            {
                                data.Idbend1Navigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == data.Idbend1Navigation.Idpeg);
                            }
                            if (!String.IsNullOrEmpty(data.Idbend1Navigation.Jnsbend))
                            {
                                data.Idbend1Navigation.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == data.Idbend1Navigation.Jnsbend.Trim());
                            }
                        }
                    }
                    return Ok(data);
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("noreg")]
        public async Task<IActionResult> GenerateNoReg(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]string Kdstatus
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<string> status = Kdstatus.Split(",").ToList();
            try
            {
                string Nomor = await _uow.TbpRepo.GenerateNoReg(Idunit, status);
                return Ok(new { Nomor });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}