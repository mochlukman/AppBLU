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
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.TBP
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbpstsController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _ctx;
        public TbpstsController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _ctx = BludContext;
        }
        [HttpGet("by-tbp/{Idtbp}")]
        public async Task<IActionResult> ByTbp(long Idtbp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpsts> datas = await _uow.TbpstsRepo.GetByTbp(Idtbp);
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-sts/{Idsts}")]
        public async Task<IActionResult> BySts(long Idsts)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tbpsts> datas = await _uow.TbpstsRepo.GetBySts(Idsts);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TbpstsPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tbpsts post = _mapper.Map<Tbpsts>(param);
            bool check = await _uow.TbpstsRepo.isExist(w => w.Idtbp == param.Idtbp && w.Idsts == param.Idsts);
            if (check) return BadRequest("TBP Telah Ditambahkan");
            try
            {
                using (var trans = await _ctx.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Tbpsts Insert = await _uow.TbpstsRepo.Add(post);
                        trans.Commit();
                        if (Insert != null)
                        {
                            var SpName = "WSP_TRANSFER_TBPSTS";
                            using (IDbConnection dbConnection = _dbConnection)
                            {
                                dbConnection.Open();
                                var parameters = new DynamicParameters();
                                parameters.Add("@Idtbp", Insert.Idtbp);
                                parameters.Add("@Idsts", Insert.Idsts);
                                var rowTransfer = await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                                if (rowTransfer > 0)
                                {
                                    dbConnection.Close();
                                }
                                else
                                {
                                    dbConnection.Close();
                                }
                            }
                        }
                        
                        Tbpsts view = await _uow.TbpstsRepo.ViewData(Insert.Idtbp, Insert.Idsts);
                        return Ok(view);
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
        [HttpDelete]
        public async Task<IActionResult> Delete(
            [FromQuery][Required] long Idtbp,
            [FromQuery][Required] long Idsts
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tbpsts data = await _uow.TbpstsRepo.Get(w => w.Idsts == Idsts && w.Idtbp == Idtbp);
                if (data == null) return BadRequest("Hapus Gagal");
                using (var trans = await _ctx.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.TbpstsRepo.Remove(data);
                        if (await _uow.Complete())
                        {
                            var SpName = "WSP_TRANSFER_TBPSTS";
                            using (IDbConnection dbConnection = _dbConnection)
                            {
                                if (dbConnection.State != ConnectionState.Open)
                                {
                                    dbConnection.Open();
                                }
                                var parameters = new DynamicParameters();
                                parameters.Add("@Idtbp", Idtbp);
                                parameters.Add("@Idsts", Idsts);
                                dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                            }
                        }
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
    }
}