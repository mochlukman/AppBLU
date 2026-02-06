using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class JurnalKonsolidatorController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public JurnalKonsolidatorController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet("Pendapatan")]
        public async Task<IActionResult> Pendapatan([FromQuery]JurnalParam1 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_JURNALSTSBUD";
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Nobbantu", param.Nobbantu);
                    parameters.Add("@Tgl1", param.Tgl1);
                    parameters.Add("@Tgl2", param.Tgl2);
                    datas.AddRange(dbConnection.QueryAsync<dynamic>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    dbConnection.Close();
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("Pengeluaran")]
        public async Task<IActionResult> Pengeluaran([FromQuery]JurnalParam1 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_JURNALSP2DBUD";
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Nobbantu", param.Nobbantu);
                    parameters.Add("@Tgl1", param.Tgl1);
                    parameters.Add("@Tgl2", param.Tgl2);
                    datas.AddRange(dbConnection.QueryAsync<dynamic>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    dbConnection.Close();
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("ayat-ayat")]
        public async Task<IActionResult> AyatAyat([FromQuery]JurnalAyat1 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "";
            if (param.Jenis == "pendapatan")
            {
                sp_name = "WSPI_JURNALSTSBUDDET";
            } else if(param.Jenis == "pengeluaran")
            {
                sp_name = "WSPI_JURNALSP2DBUDDET";
            }
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Nobukti", param.Nobukti);
                    parameters.Add("@Jnsjurnal", param.JenisJurnal);
                    datas.AddRange(dbConnection.QueryAsync<dynamic>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    dbConnection.Close();
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("Update-Valid")]
        public async Task<IActionResult> UpdateValid([FromBody] JurnalKonsolidatorUpdateValid param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if (param.Jenis == "pendapatan")
                {
                    Bkud bku = await _uow.BkudRepo.Get(w => w.Idbkud == param.Idbku);
                    bku.Tglvalid = param.Tglvalid;
                    bku.Validby = User.Claims.FirstOrDefault().Value;
                    bku.Valid = !String.IsNullOrEmpty(param.Tglvalid.ToString()) ? true : false;
                    bku.Dateupdate = DateTime.Now;
                    bool update = await _uow.BkudRepo.UpdateValid(bku);
                    if (update) return Ok(bku);
                    return BadRequest("Gagal Update Valid");
                }
                else if (param.Jenis == "pengeluaran")
                {
                    Bkuk bku = await _uow.BkukRepo.Get(w => w.Idbkuk == param.Idbku);
                    bku.Tglvalid = param.Tglvalid;
                    bku.Validby = User.Claims.FirstOrDefault().Value;
                    bku.Valid = !String.IsNullOrEmpty(param.Tglvalid.ToString()) ? true : false;
                    bku.Dateupdate = DateTime.Now;
                    bool update = await _uow.BkukRepo.UpdateValid(bku);
                    if (update) return Ok(bku);
                    return BadRequest("Gagal Update Valid");
                }
                else
                {
                    return BadRequest("Gagal Update Valid");
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