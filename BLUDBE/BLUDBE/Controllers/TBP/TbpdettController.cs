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

namespace BLUDBE.Controllers.TBP
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbpdettController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public TbpdettController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]TbpdettGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpdett> datas = await _uow.TbpdettRepo.ViewDatas(param.Idtbp);
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if(d.IdbendNavigation != null)
                        {
                            d.IdbendNavigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == d.IdbendNavigation.Idpeg);
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
        [HttpGet("{Idtbpdett}")]
        public async Task<IActionResult> Get(long Idtbpdett)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdett data = await _uow.TbpdettRepo.ViewData(Idtbpdett);
                if(data != null)
                {
                    if(data.IdbendNavigation != null)
                    {
                        data.IdbendNavigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == data.IdbendNavigation.Idpeg);
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
        public async Task<IActionResult> Post([FromBody]TbpdettPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpdett> views = new List<Tbpdett> { };
                if (param.Idbend.Count() > 0)
                {
                    for (var i = 0; i < param.Idbend.Count(); i++)
                    {
                        Tbpdett insert = await _uow.TbpdettRepo.Add(new Tbpdett
                        {
                            Idnojetra = 21,
                            Datecreate = DateTime.Now,
                            Idtbp = param.Idtbp,
                            Idbend = param.Idbend[i],
                            Nilai = 0
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.TbpdettRepo.ViewData(insert.Idtbpdett));
                        }
                    }
                }
                if (views.Count() > 0)
                {
                    foreach (var d in views)
                    {
                        if (d.IdbendNavigation != null)
                        {
                            d.IdbendNavigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == d.IdbendNavigation.Idpeg);
                        }
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
        public async Task<IActionResult> Put([FromBody]TbpdettUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string Limpah = "";
            Tbpdett post = _mapper.Map<Tbpdett>(param);
            //post.Updatedate = DateTime.Now;
            //post.Updateby = User.Claims.FirstOrDefault().Value;
            try
            {
                Tbp tbp = await _uow.TbpRepo.Get(w => w.Idtbp == param.Idtbp);
                //decimal? totlimpah = await _uow.TbpdettRepo.TotalNilaiLimpah(tbp.idtb);
                decimal? totalPelimpahan = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.TbpRepo.GetIds(tbp.Idtbp));
                if (Ids.Count() > 0)
                {
                    totalPelimpahan = await _uow.TbpdettRepo.TotalNilaiPelimpahan(Ids);
                }
                List<ValidationValue> validation1 = new List<ValidationValue>();
                long currentTotal = 0;
                Tbpdett current_data = await _uow.TbpdettRepo.Get(w => w.Idtbpdett == post.Idtbpdett);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    string spNamestrt = "";
                    
                    if ((tbp.Kdstatus == "37") || (tbp.Kdstatus == "39") || (tbp.Kdstatus == "51"))
                    {
                        spNamestrt = "WSP_VALIDATIONLIMPAH_UP";
                        Limpah = "Bank";

;                    }
                    else
                    {
                        spNamestrt = "WSP_VALIDATIONLIMPAH_UPT";
                        Limpah = "Tunai";
                    }
                    var SpName = spNamestrt;
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", tbp.Idunit.ToString());
                    parameters.Add("@IDBEND", tbp.Idbend1.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                }
                if (validation1.Count() > 0)
                {
                    currentTotal = (long)(validation1[0].Tot - param.Nilai);
                    if (currentTotal < 0)
                    {
                        return BadRequest("Total Nilai Penarikan : " + post.Nilai.ToString() + ", Melebihi sisa saldo Kas : " + Limpah + "yang bisa dilimpahkan" + currentTotal.ToString());
                    }
                }
                bool update = await _uow.TbpdettRepo.Update(post);
                //if (update)
                //{
                //    Tbpdett data = await _uow.TbpdettRepo.Get(w => w.Idtbpdett == post.Idtbpdett);
                //    TbpdettView view = _mapper.Map<TbpdettView>(data);
                //    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                //    {
                //        view.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                //    }
                //    view.Totspd = totspd;
                //    view.Sisa = totalSpp - view.Nilai;
                //    return Ok(view);
                //}
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }

            /*if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbpdett post = _mapper.Map<Tbpdett>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.TbpdettRepo.Update(post);
                if (update) {
                    Tbpdett view = await _uow.TbpdettRepo.ViewData(post.Idtbpdett);
                    if (view != null)
                    {
                        if (view.IdbendNavigation != null)
                        {
                            view.IdbendNavigation.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.IdbendNavigation.Idpeg);
                        }
                    }
                    return Ok(view);
                } 
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
            */
        }
        [HttpDelete("{Idtbpdett}")]
        public async Task<IActionResult> Delete(long Idtbpdett)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpdett data = await _uow.TbpdettRepo.ViewData(Idtbpdett);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long checkKeg = await _uow.TbpdettkegRepo.Count(w => w.Idtbpdett == data.Idtbpdett);
                if (checkKeg > 0) return BadRequest("Gagal Hapus, Data Telah Digunakan");
                _uow.TbpdettRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}