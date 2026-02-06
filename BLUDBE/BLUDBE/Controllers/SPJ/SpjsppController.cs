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
using System.Data.SqlClient;

namespace BLUDBE.Controllers.SPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpjsppController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public SpjsppController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _mapper = mapper;
            _uow = uow;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpGet("by-spp")]
        public async Task<IActionResult> GetBySpp(
            [FromQuery][Required]long Idspp,
            [FromQuery]string Kdstatus
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (String.IsNullOrEmpty(Kdstatus)) Kdstatus = "42";
            try
            {
                List<SpjsppView> datas = await _uow.SpjsppRepo.GetBySpp(Idspp, Kdstatus);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("from-spp")]
        public async Task<IActionResult> PostFromSpp([FromBody][Required] Spjspp param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            param.Datecreate = DateTime.Now;
            var SpName = "WSP_TRANSFER_SPJSPP";
            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Spjspp insert = await _uow.SpjsppRepo.Add(param);
                        bool success = false;
                        if(insert != null)
                        {
                            using (IDbConnection dbConnection = _dbConnection)
                            {
                                dbConnection.Open();
                                var parameters = new DynamicParameters();
                                parameters.Add("@IDSPP", param.Idspp);
                                parameters.Add("@IDSPJ", param.Idspj);
                                var rowTransfer = await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                                if (rowTransfer > 0)
                                {
                                    success = true;
                                }
                                else
                                {
                                    ModelState.AddModelError("error", "Input Gagal");
                                    success = false;
                                }
                                dbConnection.Close();
                            }
                        }
                        else
                        {
                            success = false;
                        }

                        if (success)
                        {
                            trans.Commit();
                            List<SpjsppView> datas = await _uow.SpjsppRepo.GetBySpp(param.Idspp, "42");
                            return Ok(datas);
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
        [HttpPost("from-spp/batch")]
        public async Task<IActionResult> PostFromSppBatch([FromBody][Required] List<Spjspp> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var SpName = "WSP_TRANSFER_SPJSPP";
            long postCount = param.Count();
            long successCount = 0;

            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        if (param.Count() > 0)
                        {
                            using (IDbConnection dbConnection = new SqlConnection(_dbConnection.ConnectionString))
                            {
                                dbConnection.Open();

                                for (var i = 0; i < param.Count(); i++)
                                {
                                    param[i].Datecreate = DateTime.Now;
                                    Spjspp insert = await _uow.SpjsppRepo.Add(param[i]);

                                    if (insert != null)
                                    {
                                        var parameters = new DynamicParameters();
                                        parameters.Add("@IDSPP", param[i].Idspp);
                                        parameters.Add("@IDSPJ", param[i].Idspj);

                                        var rowTransfer = await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                                        if (rowTransfer > 0)
                                        {
                                            successCount += 1;
                                        }
                                    }
                                }

                                if (postCount == successCount)
                                {
                                    trans.Commit();
                                    List<SpjsppView> datas = await _uow.SpjsppRepo.GetBySpp(param[0].Idspp, "42");
                                    return Ok(datas);
                                }
                                else
                                {
                                    trans.Rollback();
                                    return BadRequest("Data gagal diproses sepenuhnya.");
                                }
                            }
                        }
                        else
                        {
                            return BadRequest("Parameter tidak boleh kosong.");
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

        [HttpDelete("{Idsppspj}")]
        public async Task<IActionResult> Delete(long Idsppspj)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spjspp data = await _uow.SpjsppRepo.Get(w => w.Idsppspj == Idsppspj);
                if (data == null) return BadRequest("Data Tidak Tersedia");
                _uow.SpjsppRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }

    }
}