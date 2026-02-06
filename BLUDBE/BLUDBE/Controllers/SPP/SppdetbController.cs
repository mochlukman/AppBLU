using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPP
{
    [Route("api/[controller]")]
    [ApiController]
    public class SppdetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public SppdetbController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idspp
            )
        {
            try
            {
                Spp spp = await _uow.SppRepo.Get(w => w.Idspp == Idspp);
                decimal? totalSpp = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.SppRepo.GetIds(spp.Idunit, spp.Idxkode, spp.Kdstatus));
                if (Ids.Count() > 0)
                {
                    totalSpp = await _uow.SppdetbRepo.TotalNilaiSpp(Ids);
                }
                List<Sppdetb> datas = await _uow.SppdetbRepo.Gets(w => w.Idspp == Idspp);
                List<SppdetbView> views = _mapper.Map<List<SppdetbView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var d in views)
                    {
                        if (!String.IsNullOrEmpty(d.Idrek.ToString()) || d.Idrek != 0)
                        {
                            d.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == d.Idrek);
                        }
                        d.Sisa = totalSpp - d.Nilai;
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
        [HttpGet("{Idsppdetb}")]
        public async Task<IActionResult> Get(int Idsppdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetb data = await _uow.SppdetbRepo.Get(w => w.Idsppdetb == Idsppdetb);
                SppdetbView view = _mapper.Map<SppdetbView>(data);
                if (view != null)
                {
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                }
                return Ok(view);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SppdetbPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spp spp = await _uow.SppRepo.Get(w => w.Idspp == param.Idspp);
                decimal? totalSpp = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.SppRepo.GetIds(spp.Idunit, spp.Idxkode, spp.Kdstatus));
                if (Ids.Count() > 0)
                {
                    totalSpp = await _uow.SppdetbRepo.TotalNilaiSpp(Ids);
                }
                List<SppdetbView> views = new List<SppdetbView> { };
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Sppdetb insert = await _uow.SppdetbRepo.Add(new Sppdetb
                        {
                            Idnojetra = 21,
                            Createdate = DateTime.Now,
                            Createby = User.Claims.FirstOrDefault().Value,
                            Idrek = param.Idrek[i],
                            Idspp = param.Idspp,
                            Nilai = 0
                        });
                        if (insert != null)
                        {
                            views.Add(_mapper.Map<SppdetbView>(insert));
                        }
                    }
                }
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
                        {
                            v.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == v.Idrek);
                        }
                        v.Sisa = totalSpp - v.Nilai;
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SppdetbUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Sppdetb post = _mapper.Map<Sppdetb>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;

            try
            {
                Spp spp = await _uow.SppRepo.Get(w => w.Idspp == param.Idspp);
                decimal? totalSpp = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.SppRepo.GetIds(spp.Idunit, spp.Idxkode, spp.Kdstatus));
                if (Ids.Count() > 0)
                {
                    totalSpp = await _uow.SppdetbRepo.TotalNilaiSpp(Ids);
                }
                List<ValidationValue> validation1 = new List<ValidationValue>();
                long currentTotal = 0;
                Sppdetb current_data = await _uow.SppdetbRepo.Get(w => w.Idsppdetb == post.Idsppdetb);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATIONSPP_REK_B";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", spp.Idunit.ToString());
                    parameters.Add("@IDREK", current_data.Idrek.ToString());
                    parameters.Add("@TGLSPP", spp.Tglspp);
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                }
                if (validation1.Count() > 0)
                {
                    currentTotal = (long)(validation1[0].Tot - param.Nilai);
                    if (currentTotal < 0)
                    {
                        return BadRequest("Nilai Rekening : " + post.Nilai.ToString() + ", Sisa : " + currentTotal.ToString());
                    }
                }
                bool update = await _uow.SppdetbRepo.Update(post);
                if (update)
                {
                    Sppdetb data = await _uow.SppdetbRepo.Get(w => w.Idsppdetb == post.Idsppdetb);
                    SppdetbView view = _mapper.Map<SppdetbView>(data);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    view.Sisa = totalSpp - view.Nilai;
                    return Ok(view);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("update-nilai")]
        public async Task<IActionResult> PutNilai([FromBody]SppdetbUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                bool update = await _uow.SppdetbRepo.UpdateNilai(param.Idsppdetb, param.Nilai, DateTime.Now, User.Claims.FirstOrDefault().Value);
                if (update)
                {
                    Sppdetb data = await _uow.SppdetbRepo.Get(w => w.Idsppdetb == param.Idsppdetb);
                    return Ok(data);
                }
                return BadRequest("Gagal Update Nilai");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsppdetb}")]
        public async Task<IActionResult> Delete(long Idsppdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sppdetb data = await _uow.SppdetbRepo.Get(w => w.Idsppdetb == Idsppdetb);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SppdetbRepo.Remove(data);
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
        [HttpGet("total-nilai")]
        public async Task<IActionResult> GetTotalNilai(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]int Idxkode,
            [FromQuery][Required]string Kdstatus,
            [FromQuery][Required]long Idspd
            )
        {
            try
            {
                decimal? TotalSpp = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.SppRepo.GetIds(Idunit, Idxkode, Kdstatus));
                if (Ids.Count() > 0)
                {
                    TotalSpp = await _uow.SppdetbRepo.TotalNilaiSpp(Ids);
                }
                return Ok(new { TotalSpp });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}