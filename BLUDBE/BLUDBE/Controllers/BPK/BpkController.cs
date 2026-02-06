using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.BPK
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class BpkController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _BludContext;
        public BpkController(IUow uow, IMapper mapper, BludContext BludContext)
        {
            _mapper = mapper;
            _uow = uow;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] BpkGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<BpkView> datas = await _uow.BpkRepo.DataViewsOld(param);
                if(datas.Count() > 0)
                {
                    foreach(var i in datas)
                    {
                        Sp2dbpk sp2Dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == i.Idbpk);
                        if(sp2Dbpk != null)
                        {
                            i.Idsp2d = sp2Dbpk.Idsp2d;
                            i.Idsp2dNavigation = await _uow.Sp2dRepo.Get(w => w.Idsp2d == i.Idsp2d);
                        }
                    }
                }
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<BpkGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Bpk> data = await _uow.BpkRepo.Paging(param);
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
                List<Bkubpk> bkubpk = await _uow.BkubpkRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<long> ids = new List<long>();
                if (bkubpk.Count() > 0)
                {
                    bkubpk.ForEach(f =>
                    {
                        ids.Add(f.Idbpk);
                    });
                }
                List<Bpk> datas = await _uow.BpkRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !ids.Contains(w.Idbpk) && !String.IsNullOrEmpty(w.Tglvalid.ToString()));
                List<BpkView> views = new List<BpkView>();
                if (datas.Count() > 0)
                {
                    foreach (var i in datas)
                    {
                        BpkView data = await _uow.BpkRepo.DataViewOld(i.Idbpk);
                        if (data != null)
                        {
                            Sp2dbpk sp2Dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == data.Idbpk);
                            if (sp2Dbpk != null)
                            {
                                data.Idsp2d = sp2Dbpk.Idsp2d;
                                data.Idsp2dNavigation = await _uow.Sp2dRepo.Get(w => w.Idsp2d == data.Idsp2d);
                            }
                        }
                        views.Add(data);
                    }
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("For-Spj")]
        public async Task<IActionResult> ForSpj([FromQuery]BpkForSpjParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bpkspj> bpkspjs = await _uow.BpkspjRepo.Gets(w => w.Idspj == param.Idspj);
                List<long> bpkIds = new List<long>();
                if (bpkspjs.Count() > 0)
                {
                    bpkspjs.ForEach(f =>
                    {
                        bpkIds.Add(f.Idbpk);
                    });
                }
                List<Bpk> datas = await _uow.BpkRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !bpkIds.Contains(w.Idbpk) && w.Kdstatus.Trim() == param.Kdstatus.Trim() && !String.IsNullOrEmpty(w.Tglvalid.ToString()));
                List<BpkView> views = new List<BpkView>();
                if (datas.Count() > 0)
                {
                    foreach (var i in datas)
                    {
                        BpkView data = await _uow.BpkRepo.DataViewOld(i.Idbpk);
                        if (data != null)
                        {
                            Sp2dbpk sp2Dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == data.Idbpk);
                            if (sp2Dbpk != null)
                            {
                                data.Idsp2d = sp2Dbpk.Idsp2d;
                                data.Idsp2dNavigation = await _uow.Sp2dRepo.Get(w => w.Idsp2d == data.Idsp2d);
                            }
                        }
                        views.Add(data);
                    }
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbpk}")]
        public async Task<IActionResult> Get(long Idbpk)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                BpkView data = await _uow.BpkRepo.DataViewOld(Idbpk);
                if(data != null)
                {
                    Sp2dbpk sp2Dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == data.Idbpk);
                    if (sp2Dbpk != null)
                    {
                        data.Idsp2d = sp2Dbpk.Idsp2d;
                        data.Idsp2dNavigation = await _uow.Sp2dRepo.Get(w => w.Idsp2d == data.Idsp2d);
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BpkPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpk post = _mapper.Map<Bpk>(param);
            string[] splitNo = param.Nobpk.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value;
            post.Stcair = 0;
            post.Stkirim = 0;
            post.Kdrilis = 0;
            try
            {
                using(var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Bpk Insert = await _uow.BpkRepo.Add(post);
                        if(param.Idsp2d != 0)
                        {
                            Sp2dbpk sp2Dbpk = new Sp2dbpk
                            {
                                Idbpk = Insert.Idbpk,
                                Idsp2d = param.Idsp2d,
                                Datecreate = DateTime.Now
                            };
                            await _uow.Sp2dbpkRepo.Add(sp2Dbpk);
                        }
                        trans.Commit();
                        return Ok(await _uow.BpkRepo.ViewData(Insert.Idbpk));
                    }
                    catch(Exception e)
                    {
                        trans.Rollback();
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        return BadRequest(ModelState);
                    }
                }
                
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] BpkPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpk post = _mapper.Map<Bpk>(param);
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value; ;
            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.BpkRepo.Update(post);
                        Sp2dbpk sp2dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == post.Idbpk);
                        if(sp2dbpk != null) _uow.Sp2dbpkRepo.Remove(sp2dbpk);
                        if (param.Idsp2d != 0)
                        {
                            Sp2dbpk sp2Dbpk = new Sp2dbpk
                            {
                                Idbpk = post.Idbpk,
                                Idsp2d = param.Idsp2d,
                                Datecreate = DateTime.Now
                            };
                            await _uow.Sp2dbpkRepo.Add(sp2Dbpk);
                        }
                        trans.Commit();
                        return Ok(await _uow.BpkRepo.ViewData(post.Idbpk));
                    }
                    catch(Exception e)
                    {
                        trans.Rollback();
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        return BadRequest(ModelState);
                    }
                }
                    
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Verifikasi([FromBody]BpkPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpk post = _mapper.Map<Bpk>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                if ( post.Tglvalid < post.Tglbpk)
                {
                    return BadRequest("Tanggal Pengesahan tidak boleh mendahului tanggal Transaksi Belanja!");
                }
                bool update = await _uow.BpkRepo.Pengesahan(post);
                if (update)
                {
                    return Ok(await _uow.BpkRepo.ViewData(post.Idbpk));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbpk}")]
        public async Task<IActionResult> Delete(long Idbpk)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpk data = await _uow.BpkRepo.Get(Idbpk);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        List<Bpkdetr> bpkdetrs = await _uow.BpkdetrRepo.Gets(w => w.Idbpk == data.Idbpk);
                        if (bpkdetrs.Count() > 0)
                            return BadRequest("Hapus Gagal, BPK Mempunyai Rincian Belanja");
                        Sp2dbpk sp2Dbpk = await _uow.Sp2dbpkRepo.Get(w => w.Idbpk == data.Idbpk);
                        if(sp2Dbpk != null)
                        {
                            _uow.Sp2dbpkRepo.Remove(sp2Dbpk);
                        }
                        _uow.BpkRepo.Remove(data);
                        await _uow.Complete();
                        trans.Commit();
                        return Ok();
                    }
                    catch (Exception e)
                    {
                        trans.Rollback();
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("new-nomor-urut")]
        public async Task<IActionResult> NewNomorUrut([FromBody]BpkGetUrutPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                return Ok(new {
                    nomor = await _uow.BpkRepo.NewNomorUrut(param)
                });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}