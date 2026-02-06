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
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class JurnalKasController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public JurnalKasController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpPut("Update-Valid")]
        public async Task<IActionResult> UpdateValid([FromBody] BkuUpdateValid param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if(param.Jenis == "TBP")
                {
                    Bkutbp bkutbp = await _uow.BkutbpRepo.Get(w => w.Idbkutbp == param.Idbku);
                    bkutbp.Tglvalid = param.Tglvalidbku;
                    bkutbp.Validby = User.Claims.FirstOrDefault().Value;
                    bkutbp.Valid = !String.IsNullOrEmpty(param.Tglvalidbku.ToString()) ? true :  false;
                    bool update = await _uow.BkutbpRepo.UpdateValid(bkutbp);
                    if (update) return Ok(bkutbp);
                    return BadRequest("Gagal Update Valid");
                }
                else if (param.Jenis == "STS")
                {
                    Bkusts bkusts = await _uow.BkustsRepo.Get(w => w.Idbkusts == param.Idbku);
                    bkusts.Tglvalid = param.Tglvalidbku;
                    bkusts.Validby = User.Claims.FirstOrDefault().Value;
                    bkusts.Valid = !String.IsNullOrEmpty(param.Tglvalidbku.ToString()) ? true : false;
                    bool update = await _uow.BkustsRepo.UpdateValid(bkusts);
                    if (update) return Ok(bkusts);
                    return BadRequest("Gagal Update Valid");
                }
                else if(param.Jenis == "SP2D")
                {
                    Bkusp2d bkusp2d = await _uow.Bkusp2DRepo.Get(w => w.Idbkusp2d == param.Idbku);
                    bkusp2d.Tglvalid = param.Tglvalidbku;
                    bkusp2d.Validby = User.Claims.FirstOrDefault().Value;
                    bkusp2d.Valid = !String.IsNullOrEmpty(param.Tglvalidbku.ToString()) ? true : false;
                    bool update = await _uow.Bkusp2DRepo.UpdateValid(bkusp2d);
                    if (update) return Ok(bkusp2d);
                    return BadRequest("Gagal Update Valid");
                }
                else
                {
                    return BadRequest("Gagal Update Valid");
                }
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return  BadRequest(ModelState);
            }
        }
        [HttpGet("Detail")]
        public async Task<IActionResult> Gets([FromQuery]BkuJurnalParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "";
            if (param.Jenis == "SKP")
            {
                sp_name = "WSPI_JURNALSKPDET";
            }
            else if (param.Jenis == "TBP")
            {
                sp_name = "WSPI_JURNALTBPDET";
            } else if(param.Jenis == "STS")
            {
                sp_name = "WSPI_JURNALSTSDET";
            }
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
                    parameters.Add("@Nobukti", param.Nobukti);
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
        public async Task<IActionResult> AyatAyat([FromQuery]BkuJurnalParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "";
            if (param.Jenis == "SKP")
            {
                sp_name = "WSPI_JURNALSKPDET";
            }
            else if (param.Jenis == "TBP")
            {
                sp_name = "WSPI_JURNALTBPDET";
            }
            else if (param.Jenis == "STS")
            {
                sp_name = "WSPI_JURNALSTSDET";
            }
            else if (param.Jenis == "SPJ")
            {
                sp_name = "WSPI_JURNALSPJDET";
            }
            else if (param.Jenis == "Pengeluaran")
            {
                sp_name = "WSPI_JURNALPENGELUARANDET";
            }
            else if (param.Jenis == "Pengembalian")
            {
                sp_name = "WSPI_JURNALPENGEMBALIANDET";
            }
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
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

        [HttpGet("rincian-jurnal")]
        public async Task<IActionResult> RincianJurnal([FromQuery]BkuJurnalParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_JURNALSPJDET";
            List<dynamic> datas = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
                    parameters.Add("@Nobukti", param.Nobukti);
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
        [HttpGet("jurnal-skpd")]
        public async Task<IActionResult> JurnalSKPD([FromQuery]BkuParam2 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_JURNALSKPD";
            List<BkuPenerimaanView> datas = new List<BkuPenerimaanView>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
                    parameters.Add("@Idbend", param.Idbend);
                    parameters.Add("@jenis", param.Jenis);
                    parameters.Add("@Tgl1", param.Tgl1);
                    parameters.Add("@Tgl2", param.Tgl2);
                    parameters.Add("@Nodok", param.Nodok);
                    datas.AddRange(dbConnection.QueryAsync<BkuPenerimaanView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
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
        [HttpGet("jurnal-skpd-new")]
        public async Task<IActionResult> JurnalSKPDNew([FromQuery]BkuParam2 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "";
            if(param.JurnalType == "pendapatan")
            {
                sp_name = "WSPI_JURNALPENERIMAAN";
            } else if(param.JurnalType == "pengeluaran")
            {
                sp_name = "WSPI_JURNALPENGELUARAN";
            } else if(param.JurnalType == "pengembalian")
            {
                sp_name = "WSPI_JURNALPENGEMBALIAN";
            }
            List<BkuPenerimaanView> datas = new List<BkuPenerimaanView>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
                    parameters.Add("@jenis", param.Jenis);
                    parameters.Add("@Tgl1", param.Tgl1);
                    parameters.Add("@Tgl2", param.Tgl2);
                    parameters.Add("@Nodok", param.Nodok);
                    datas.AddRange(dbConnection.QueryAsync<BkuPenerimaanView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
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
    }
}