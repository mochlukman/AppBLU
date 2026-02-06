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
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPM
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpmController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public SpmController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] SpmGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spm> datas = await _uow.SpmRepo.ViewDatas(param);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<SpmGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Spm> data = await _uow.SpmRepo.Paging(param);
                return Ok(data);
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
            [FromQuery]int Idxkode,
            [FromQuery]long Idbend,
            [FromQuery]string Kdstatus
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                string Noreg = "";
                if(Idxkode.ToString() == "0" && Idbend.ToString() == "0" && String.IsNullOrEmpty(Kdstatus))
                {
                    Noreg = await _uow.SpmRepo.GenerateNoReg(Idunit);
                } else
                {
                    Noreg = await _uow.SpmRepo.GenerateNoReg(Idunit, Idbend, Idxkode, Kdstatus);
                }
                
                return Ok(new { Noreg });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SpmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spm post = _mapper.Map<Spm>(param);
            if (post.Kdstatus.Trim() != "24") post.Idkeg = 0;
            post.Createdate = DateTime.Now;
            post.Createby = User.Claims.FirstOrDefault().Value;
            bool check = await _uow.SpmRepo.isExist(w =>
                w.Idunit == param.Idunit && w.Kdstatus.Trim() == param.Kdstatus.Trim() &&
                w.Idxkode == param.Idxkode && w.Idspp == param.Idspp &&
                w.Idxkode != 1);
            if (check) return BadRequest("Nomor S-PPD telah digunakan");
            var SpName = "[dbo].[WSP_TRANSFER_SKPLB_SPM]";
            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Spm insert = await _uow.SpmRepo.Add(post);
                        bool success = false;
                        if (insert != null)
                        {
                            if (param.IsPengembalian)
                            {
                                using (IDbConnection dbConnection = _dbConnection)
                                {
                                    dbConnection.Open();
                                    var parameters = new DynamicParameters();
                                    parameters.Add("@Idunit", insert.Idunit);
                                    //parameters.Add("@Idskp", insert.Idskp);
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
                            } else
                            {
                                success = true;
                            }
                           
                        }

                        if (success)
                        {
                            trans.Commit();
                            return Ok(await _uow.SpmRepo.ViewData(insert.Idspm));
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
        public async Task<IActionResult> Put([FromBody]SpmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spm post = _mapper.Map<Spm>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            Spm check = await _uow.SpmRepo.Get(w =>
                w.Idunit == param.Idunit && w.Kdstatus.Trim() == param.Kdstatus.Trim() &&
                w.Idxkode == param.Idxkode && w.Idspp == param.Idspp);
            //if (check != null) {
            //    if(check.Idspm != param.Idspm)
            //    {
            //        return BadRequest("Nomor SPPD telah digunakan");
            //    }
            //}
            if (check != null)
            {
                if (post.Idxkode != 1)
                {
                    return BadRequest("Nomor SPPD telah digunakan");
                }
            }
            if (check.Tglvalid != null)
            {
                return BadRequest("Gagal Update, Nomor S-OPD Telah Disahkan");
            }
            try
            {
                bool update = await _uow.SpmRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SpmRepo.ViewData(post.Idspm));
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
        public async Task<IActionResult> Verifikasi([FromBody]SpmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spm post = _mapper.Map<Spm>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                if (post.Tglvalid < post.Tglspm)
                {
                    return BadRequest("Tanggal Pengesahan tidak boleh mendahului tanggal Transaksi SOPD!");
                }
                bool update = await _uow.SpmRepo.Pengesahan(post);
                if (update)
                {
                    return Ok(await _uow.SpmRepo.ViewData(post.Idspm));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("penolakan")]
        public async Task<IActionResult> Penolakan([FromBody]SpmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spm post = _mapper.Map<Spm>(param);
            post.Updatedate = DateTime.Now;
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Approveby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool update = await _uow.SpmRepo.Penolakan(post);
                if (update)
                {
                    return Ok(await _uow.SpmRepo.ViewData(post.Idspm));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspm}")]
        public async Task<IActionResult> Delete(long Idspm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spm data = await _uow.SpmRepo.Get(w => w.Idspm == Idspm);

                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SpmRepo.Remove(data);
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
        [HttpGet("tracking/{Idspm}")]
        public async Task<IActionResult> Tracking(long Idspm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DataTracking> data = await _uow.SpmRepo.TrackingData(Idspm);
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