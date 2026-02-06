using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.Akuntansi.BukitMemorial
{
    [Route("api/[controller]")]
    [ApiController]
    public class BktmemdetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly BludContext _ctx;
        private readonly DbConnection _dbConnection;
        public BktmemdetController(IUow uow, BludContext BludContext, DbConnection dbConnection)
        {
            _uow = uow;
            _ctx = BludContext;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] long Idbm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    var spname = "WSP_MEMORIAL_LIST";
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDBM", Idbm);
                    List<BktmemdetViewDto> data = dbConnection.QueryAsync<BktmemdetViewDto>(spname, parameters, commandType: CommandType.StoredProcedure).Result.ToList();
                    return Ok(data);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BktmemdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool success = false;
            try
            {
                if(new List<long>() { 1, 2, 3 }.Contains(param.Idjnsakun)) //Neraca
                {
                    Bktmemdetn post = new Bktmemdetn
                    {
                        Idbm = param.Idbm,
                        Idrek = param.Idrek,
                        Kdpers = param.Kdpers,
                        Nilai = param.Nilai
                    };
                    if (await _uow.BktmemdetnRepo.Add(post) != null)
                    {
                        success = true;
                    }
                } else if (new List<long>() { 4, 7 }.Contains(param.Idjnsakun)) //pendapatan & LO
                {
                    Bktmemdetd post = new Bktmemdetd
                    {
                        Idbm = param.Idbm,
                        Idrek = param.Idrek,
                        Kdpers = param.Kdpers,
                        Nilai = param.Nilai
                    };
                    if(await _uow.BktmemdetdRepo.Add(post) != null)
                    {
                        success = true;
                    }
                } else if(new List<long>() {5,8}.Contains(param.Idjnsakun)) // Belanja & Beban LO
                {
                    Bktmemdetr post = new Bktmemdetr
                    {
                        Idbm = param.Idbm,
                        Idkeg = param.Idkeg,
                        Idrek = param.Idrek,
                        Kdpers = param.Kdpers,
                        Nilai = param.Nilai
                    };
                    if(await _uow.BktmemdetrRepo.Add(post) != null)
                    {
                        success = true;
                    }
                } else if(param.Idjnsakun == 6) // Pembiayaan
                {
                    Bktmemdetb post = new Bktmemdetb
                    {
                        Idbm = param.Idbm,
                        Idrek = param.Idrek,
                        Kdpers = param.Kdpers,
                        Nilai = param.Nilai
                    };
                    if (await _uow.BktmemdetbRepo.Add(post) != null)
                    {
                        success = true;
                    }
                }
                if (success)
                {
                    return Ok();
                }
                return BadRequest("Input Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]BktmemdetUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool success = false;
            try
            {
                if(param.Tname == "B")
                {
                    bool update = await _uow.BktmemdetbRepo.Update(param.Idbmdet, param.Nilai);
                    if (update) success = true;
                }
                if (param.Tname == "D")
                {
                    bool update = await _uow.BktmemdetdRepo.Update(param.Idbmdet, param.Nilai);
                    if (update) success = true;
                }
                if (param.Tname == "R")
                {
                    bool update = await _uow.BktmemdetrRepo.Update(param.Idbmdet, param.Nilai);
                    if (update) success = true;
                }
                if (param.Tname == "N")
                {
                    bool update = await _uow.BktmemdetnRepo.Update(param.Idbmdet, param.Nilai);
                    if (update) success = true;
                }
                if (success)
                {
                    return Ok();
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbmdet}/{Tname}")]
        public async Task<IActionResult> Delete(long Idbmdet, string Tname)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool success = false;
            try
            {
                if (Tname == "B")
                {
                    Bktmemdetb data = await _uow.BktmemdetbRepo.Get(w => w.Idbmdetb == Idbmdet);
                    _uow.BktmemdetbRepo.Remove(data);
                    if (await _uow.Complete()) success = true;
                }
                if (Tname == "D")
                {
                    Bktmemdetd data = await _uow.BktmemdetdRepo.Get(w => w.Idbmdetd == Idbmdet);
                    _uow.BktmemdetdRepo.Remove(data);
                    if (await _uow.Complete()) success = true;
                }
                if (Tname == "R")
                {
                    Bktmemdetr data = await _uow.BktmemdetrRepo.Get(w => w.Idbmdetr == Idbmdet);
                    _uow.BktmemdetrRepo.Remove(data);
                    if (await _uow.Complete()) success = true;
                }
                if (Tname == "N")
                {
                    Bktmemdetn data = await _uow.BktmemdetnRepo.Get(w => w.Idbmdetn == Idbmdet);
                    _uow.BktmemdetnRepo.Remove(data);
                    if (await _uow.Complete()) success = true;
                }
                if (success)
                {
                    return Ok();
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