using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Enums;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPD
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public SpdController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] long Idunit,
            [FromQuery][Required] int Idxkode
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spd> datas = await _uow.SpdRepo.Gets(w => w.Idunit == Idunit && w.Idxkode == Idxkode);
                List<SpdView> views = _mapper.Map<List<SpdView>>(datas);
                if(views.Count() > 0)
                {
                    foreach(var v in views)
                    {
                        if(!String.IsNullOrEmpty(v.Idunit.ToString()) || v.Idunit != 0)
                        {
                            v.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == v.Idunit);
                        }
                        if (!String.IsNullOrEmpty(v.Idbulan1.ToString()) || v.Idbulan1 != 0)
                        {
                            v.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == v.Idbulan1);
                        }
                        if (!String.IsNullOrEmpty(v.Idbulan2.ToString()) || v.Idbulan2 != 0)
                        {
                            v.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == v.Idbulan2);
                        }
                        if (!String.IsNullOrEmpty(v.Idttd.ToString()) || v.Idttd != 0)
                        {
                            v.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == v.Idttd);
                            if(v.Jabttd != null)
                            {
                                v.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Jabttd.Idpeg);
                            }
                        }
                    }
                }
                return Ok(views);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idspd}")]
        public async Task<IActionResult> Gets(long Idspd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spd data = await _uow.SpdRepo.Get(w => w.Idspd == Idspd);
                SpdView view = _mapper.Map<SpdView>(data);
                if (view != null)
                {
                    if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                    {
                        view.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan1.ToString()) || view.Idbulan1 != 0)
                    {
                        view.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan1);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan2.ToString()) || view.Idbulan2 != 0)
                    {
                        view.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan2);
                    }
                    if (!String.IsNullOrEmpty(view.Idttd.ToString()) || view.Idttd != 0)
                    {
                        view.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == view.Idttd);
                        if (view.Jabttd != null)
                        {
                            view.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Jabttd.Idpeg);
                        }
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
        [HttpGet("by-unit")]
        public async Task<IActionResult> GetsByUnit(
            [FromQuery][Required] long Idunit
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spd> datas = await _uow.SpdRepo.Gets(w => w.Idunit == Idunit);
                List<SpdView> views = _mapper.Map<List<SpdView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Idunit.ToString()) || v.Idunit != 0)
                        {
                            v.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == v.Idunit);
                        }
                        if (!String.IsNullOrEmpty(v.Idbulan1.ToString()) || v.Idbulan1 != 0)
                        {
                            v.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == v.Idbulan1);
                        }
                        if (!String.IsNullOrEmpty(v.Idbulan2.ToString()) || v.Idbulan2 != 0)
                        {
                            v.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == v.Idbulan2);
                        }
                        if (!String.IsNullOrEmpty(v.Idttd.ToString()) || v.Idttd != 0)
                        {
                            v.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == v.Idttd);
                            if (v.Jabttd != null)
                            {
                                v.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Jabttd.Idpeg);
                            }
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SpdPost param)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //check bulan
            if (param.Idbulan1 > param.Idbulan2)
                return BadRequest("Bulan Awal Melebihi Bulan Akhir");
            if (param.Idbulan2 < param.Idbulan1)
                return BadRequest("Bulan Akhir Kurang Dari Bulan Awal");
            Spd check = await _uow.SpdRepo.Get(w => w.Nospd.Trim() == param.Nospd.Trim() && w.Idunit == param.Idunit && w.Idxkode == param.Idxkode);
            if (check != null)
                return BadRequest("Duplikat Data");
            Spd Post = _mapper.Map<Spd>(param);
            Post.Datecreate = DateTime.Now;
            var SpName = "";
            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Spd Insert = await _uow.SpdRepo.Add(Post);
                        bool success = false;
                        if (param.Transfer)
                        {
                            if (Post.Idxkode == 2)
                            {
                                SpName = "[dbo].[WSP_SPDRTRANSFER]";
                            }
                            else if (Post.Idxkode == 5)
                            {
                                SpName = "[dbo].[WSP_SPDBTRANSFER]";
                            }
                            //if (Insert != null)
                            //    success = true;
                            if (Insert != null)
                            {
                                using (IDbConnection dbConnection = _dbConnection)
                                {
                                    dbConnection.Open();
                                    var parameters = new DynamicParameters();
                                    parameters.Add("@Idunit", Insert.Idunit);
                                    //parameters.Add("@Kdtahap", ETahap.APBDMurni.ToString("d"));
                                    parameters.Add("@Idspd", Insert.Idspd);
                                    //parameters.Add("@Nospd", Insert.Nospd);
                                    parameters.Add("@Idbulan1", Insert.Idbulan1);
                                    parameters.Add("@Idbulan2", Insert.Idbulan2);
                                    //if (Insert.Idxkode == 2)
                                    //{
                                    //    parameters.Add("@Idkeg", param.Idkeg);
                                    //}
                                    //else
                                    //{
                                    //    parameters.Add("@Idkeg", 0);
                                    //}
                                    var rowTransfer = await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                                    if (rowTransfer > 0)
                                    {
                                        success = true;
                                    }
                                    else
                                    {
                                        ModelState.AddModelError("error", "Input Gagal, Data Anggaran Kas Tidak Tersedia");
                                        success = false;
                                    }
                                    dbConnection.Close();
                                }
                            }
                        } else
                        {
                            success = true;
                        }
                        
                        if (success)
                        {
                            trans.Commit();
                            SpdView view = _mapper.Map<SpdView>(Insert);
                            if (view != null)
                            {
                                view.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                            }
                            if (!String.IsNullOrEmpty(view.Idbulan1.ToString()) || view.Idbulan1 != 0)
                            {
                                view.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan1);
                            }
                            if (!String.IsNullOrEmpty(view.Idbulan2.ToString()) || view.Idbulan2 != 0)
                            {
                                view.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan2);
                            }
                            if(!String.IsNullOrEmpty(view.Idttd.ToString()) || view.Idttd != 0)
                            {
                                view.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == view.Idttd);
                                if (view.Jabttd != null)
                                {
                                    view.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Jabttd.Idpeg);
                                }
                            }
                            return Ok(view);
                        }
                        else
                        {
                            trans.Rollback();
                            return BadRequest(ModelState);
                        }
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SpdPost param)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //check bulan
            if (param.Idbulan1 > param.Idbulan2)
                return BadRequest("Bulan Awal Melebihi Bulan Akhir");
            if (param.Idbulan2 < param.Idbulan1)
                return BadRequest("Bulan Akhir Kurang Dari Bulan Awal");
            Spd Post = _mapper.Map<Spd>(param);
            Post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.SpdRepo.Update(Post);
                if (update)
                {
                    SpdView view = _mapper.Map<SpdView>(Post);
                    if (view != null)
                    {
                        view.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan1.ToString()) || view.Idbulan1 != 0)
                    {
                        view.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan1);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan2.ToString()) || view.Idbulan2 != 0)
                    {
                        view.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan2);
                    }
                    if (!String.IsNullOrEmpty(view.Idttd.ToString()) || view.Idttd != 0)
                    {
                        view.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == view.Idttd);
                        if (view.Jabttd != null)
                        {
                            view.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Jabttd.Idpeg);
                        }
                    }
                    return Ok(view);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]Spd param)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                List<Spddetb> bs = await _uow.SpddetbRepo.Gets(w => w.Idspd == param.Idspd);
                List<Spddetr> rs = await _uow.SpddetrRepo.Gets(w => w.Idspd == param.Idspd);
                if (bs.Count() > 0 || rs.Count() > 0)
                    return BadRequest("Hapus Gagal, SK DPA Telah Digunakan");
                Spd spd = await _uow.SpdRepo.Get(w => w.Idspd == param.Idspd);
                _uow.SpdRepo.Remove(spd);
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
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Verifikasi([FromBody]SpdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spd post = _mapper.Map<Spd>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.SpdRepo.Pengesahan(post);
                if (update)
                {
                    SpdView view = _mapper.Map<SpdView>(post);
                    if (view != null)
                    {
                        view.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan1.ToString()) || view.Idbulan1 != 0)
                    {
                        view.Bulan1 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan1);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan2.ToString()) || view.Idbulan2 != 0)
                    {
                        view.Bulan2 = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan2);
                    }
                    if (!String.IsNullOrEmpty(view.Idttd.ToString()) || view.Idttd != 0)
                    {
                        view.Jabttd = await _uow.JabttdRepo.Get(w => w.Idttd == view.Idttd);
                        if (view.Jabttd != null)
                        {
                            view.Jabttd.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Jabttd.Idpeg);
                        }
                    }
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
    }
}