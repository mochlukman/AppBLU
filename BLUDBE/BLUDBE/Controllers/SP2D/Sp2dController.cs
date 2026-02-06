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

namespace BLUDBE.Controllers.SP2D
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sp2dController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Sp2dController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] Sp2dGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2d> datas = new List<Sp2d>() { };
                List<long> Sp2dIds = new List<long>();
                if (param.Forbpk)
                {
                    Sp2dIds = await _uow.Sp2dbpkRepo.Sp2dIds();
                } 
                datas.AddRange(await _uow.Sp2dRepo.ViewDatas(param, Sp2dIds));
                return Ok(datas);
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
                List<Bkusp2d> bkusp2Ds = await _uow.Bkusp2DRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<long> Idsp2d = new List<long>();
                if(bkusp2Ds.Count() > 0)
                {
                    bkusp2Ds.ForEach(f =>
                    {
                        Idsp2d.Add(f.Idsp2d);
                    });
                }
                List<Sp2d> datas = await _uow.Sp2dRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !Idsp2d.Contains(w.Idsp2d) && !String.IsNullOrEmpty(w.Tglvalid.ToString()));
                if (datas.Count() > 0)
                {
                    foreach (var d in datas)
                    {
                        d.IdspmNavigation = await _uow.SpmRepo.Get(w => w.Idspm == d.Idspm);
                        if (d.IdspmNavigation != null)
                        {
                            if (!String.IsNullOrEmpty(d.IdspmNavigation.Idphk3.ToString()) || d.IdspmNavigation.Idphk3 != 0)
                            {
                                d.IdspmNavigation.Idphk3Navigation = await _uow.Daftphk3Repo.Get(w => w.Idphk3 == d.IdspmNavigation.Idphk3);
                            }
                            d.IdspmNavigation.IdsppNavigation = await _uow.SppRepo.Get(w => w.Idspp == d.IdspmNavigation.Idspp);
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
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<Sp2dGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Sp2d> data = await _uow.Sp2dRepo.Paging(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("noreg")]
        public async Task<IActionResult> GenerateNoReg([FromQuery][Required]long Idunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                string Noreg = await _uow.Sp2dRepo.GenerateNoReg(Idunit);
                return Ok(new { Noreg });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Sp2dPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2d post = _mapper.Map<Sp2d>(param);
            if (post.Kdstatus.Trim() != "24") post.Idkeg = 0;
            if (post.Idttd == 0) post.Idttd = null;
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value;
            bool check = await _uow.Sp2dRepo.isExist(w =>
                w.Idunit == param.Idunit && w.Kdstatus.Trim() == param.Kdstatus.Trim() &&
                w.Idxkode == param.Idxkode && w.Idspm == param.Idspm);
            if (check) return BadRequest("No. SPM & No. SPD telah digunakan");
            try
            {
                Sp2d insert = await _uow.Sp2dRepo.Add(post);
                if (insert != null)
                {
                    return Ok(await _uow.Sp2dRepo.ViewData(insert.Idsp2d));
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]Sp2dPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2d post = _mapper.Map<Sp2d>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            Sp2d check = await _uow.Sp2dRepo.Get(w =>
                w.Idunit == param.Idunit && w.Kdstatus.Trim() == param.Kdstatus.Trim() &&
                w.Idxkode == param.Idxkode && w.Idspm == param.Idspm);
            if (check != null)
            {
                if (check.Idsp2d != param.Idsp2d)
                {
                    return BadRequest("No. SPM & No. SPD telah digunakan");
                }
            }
            if (check.Tglvalid != null)
            {
                return BadRequest("Gagal Update, SPM Telah Disahkan");
            }
            try
            {
                bool update = await _uow.Sp2dRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.Sp2dRepo.ViewData(post.Idsp2d));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Verifikasi([FromBody]Sp2dPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sp2d post = _mapper.Map<Sp2d>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                if (post.Tglvalid < post.Tglsp2d)
                {
                    return BadRequest("Tanggal Pengesahan tidak boleh mendahului tanggal Transaksi SPD!");
                }
                bool update = await _uow.Sp2dRepo.Pengesahan(post);
                if (update)
                {
                    return Ok(await _uow.Sp2dRepo.ViewData(post.Idsp2d));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsp2d}")]
        public async Task<IActionResult> Delete(long Idsp2d)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sp2d data = await _uow.Sp2dRepo.Get(w => w.Idsp2d == Idsp2d);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.Sp2dRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-bku-bud")]
        public async Task<IActionResult> GetsBkuBud([FromQuery][Required] PrimengTableParam<Sp2dGetForBkuBud> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Sp2d> data = await _uow.Sp2dRepo.ForBkuBud(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-dp")]
        public async Task<IActionResult> ForDp(
            [FromQuery][Required]long Iddp,
            [FromQuery][Required]int? Idxkode
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sp2d> data = await _uow.Sp2dRepo.ForDp(Iddp, Idxkode);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-dp")]
        public async Task<IActionResult> ByDp([FromQuery][Required]PrimengTableParam<Sp2dGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Sp2d> data = await _uow.Sp2dRepo.ByDp(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}