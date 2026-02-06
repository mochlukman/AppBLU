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

namespace BLUDBE.Controllers.BKU
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class BkuController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        private readonly IMapper _mapper;
        public BkuController(IUow uow, DbConnection dbConnection, BludContext BludContext, IMapper mapper)
        {
            _uow = uow;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
            _mapper = mapper;
        }
        [HttpGet("GenerateNoBku")]
        public async Task<IActionResult> GetNoBku(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idbend
            )
        {
            try
            {
                string nobku = await _uow.BkuRepo.GenerateNoBKU(Idunit, Idbend);
                return Ok(new { nobku });
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]BkuParam1 param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_BKUPENGELUARAN";
            List<BkuView> datas = new List<BkuView>();
            try
            {
                using(IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@Idunit", param.Idunit);
                    parameters.Add("@Idbend", param.Idbend);
                    parameters.Add("@jenis", param.Jenis);
                    parameters.Add("@Tgl1", param.Tgl1);
                    parameters.Add("@Tgl2", param.Tgl2);
                    parameters.Add("@Nodok", param.Nodok);
                    datas.AddRange(dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    dbConnection.Close();                   
                }
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkuPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = "WSPI_BKUPENGELUARAN";
            BkuView data = new BkuView();
            try
            {
                if(param.Jenis == "sp2d")
                {
                    Bkusp2d post = _mapper.Map<Bkusp2d>(param);
                    post.Datecreate = DateTime.Now;
                    Bkusp2d insert = await _uow.Bkusp2DRepo.Add(post);
                    if (insert != null)
                    {
                        Sp2d refs = await _uow.Sp2dRepo.Get(w => w.Idsp2d == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nosp2d);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                } else if(param.Jenis == "tbp")
                {
                    Bkutbp post = _mapper.Map<Bkutbp>(param);
                    post.Datecreate = DateTime.Now;
                    Bkutbp insert = await _uow.BkutbpRepo.Add(post);
                    if (insert != null)
                    {
                        Tbp refs = await _uow.TbpRepo.Get(w => w.Idtbp == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Notbp);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                } else if(param.Jenis == "bpk")
                {
                    Bkubpk post = _mapper.Map<Bkubpk>(param);
                    post.Datecreate = DateTime.Now;
                    Bkubpk insert = await _uow.BkubpkRepo.Add(post);
                    if (insert != null)
                    {
                        Bpk refs = await _uow.BpkRepo.Get(w => w.Idbpk == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nobpk);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                } else if(param.Jenis == "pajak")
                {
                    Bkupajak post = _mapper.Map<Bkupajak>(param);
                    post.Datecreate = DateTime.Now;
                    Bkupajak insert = await _uow.BkupajakRepo.Add(post);
                    if (insert != null)
                    {
                        Bkpajak refs = await _uow.BkpajakRepo.Get(w => w.Idbkpajak == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nobkpajak);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                } else if(param.Jenis == "panjar")
                {
                    Bkupanjar post = _mapper.Map<Bkupanjar>(param);
                    post.Datecreate = DateTime.Now;
                    Bkupanjar insert = await _uow.BkupanjarRepo.Add(post);
                    if (insert != null)
                    {
                        Panjar refs = await _uow.PanjarRepo.Get(w => w.Idpanjar == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nopanjar);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                }
                else if (param.Jenis == "pergeseran")
                {
                    Bkubank post = _mapper.Map<Bkubank>(param);
                    post.Datecreate = DateTime.Now;
                    Bkubank insert = await _uow.BkubankRepo.Add(post);
                    if (insert != null)
                    {
                        Bkbank refs = await _uow.BkbankRepo.Get(w => w.Idbkbank == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nobuku);
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
                        }
                    }
                }
                else if (param.Jenis == "sts")
                {
                    Bkusts post = _mapper.Map<Bkusts>(param);
                    post.Datecreate = DateTime.Now;
                    Bkusts insert = await _uow.BkustsRepo.Add(post);
                    if (insert != null)
                    {
                        Sts refs = await _uow.StsRepo.Get(w => w.Idsts == param.Idref);
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbend", param.Idbend);
                            parameters.Add("@jenis", param.Jenis);
                            parameters.Add("@Tgl1", param.Tglbku);
                            parameters.Add("@Tgl2", param.Tglbku);
                            parameters.Add("@Nodok", refs.Nosts );
                            data = dbConnection.QueryAsync<BkuView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.FirstOrDefault();
                            dbConnection.Close();
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
        [HttpDelete]
        public async Task<IActionResult> Delete(
            [FromQuery][Required] string Nobku,
            [FromQuery][Required] string Jenis
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if(Jenis == "sp2d")
                {
                    Bkusp2d bku = await _uow.Bkusp2DRepo.Get(w => w.Nobkuskpd.Trim() == Nobku.Trim());
                    if (bku == null) return BadRequest("Data Tidak Ditemukan");
                    _uow.Bkusp2DRepo.Remove(bku);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest("Hapus gagal");
                }
                else if (Jenis == "tbp")
                {
                    Bkutbp bku = await _uow.BkutbpRepo.Get(w => w.Nobkuskpd.Trim() == Nobku.Trim());
                    if (bku == null) return BadRequest("Data Tidak Ditemukan");
                    _uow.BkutbpRepo.Remove(bku);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest("Hapus gagal");
                }
                else if (Jenis == "bpk")
                {
                    Bkubpk bku = await _uow.BkubpkRepo.Get(w => w.Nobkuskpd.Trim() == Nobku.Trim());
                    if (bku == null) return BadRequest("Data Tidak Ditemukan");
                    _uow.BkubpkRepo.Remove(bku);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest("Hapus gagal");
                }
                else if(Jenis == "panjar")
                {
                    Bkupanjar bku = await _uow.BkupanjarRepo.Get(w => w.Nobkuskpd.Trim() == Nobku.Trim());
                    if (bku == null) return BadRequest("Data Tidak Ditemukan");
                    _uow.BkupanjarRepo.Remove(bku);
                    if (await _uow.Complete())
                        return Ok();
                    return BadRequest("Hapus gagal");
                }
                return Ok();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}