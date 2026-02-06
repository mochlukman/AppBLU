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

namespace BLUDBE.Controllers.BKU
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkuBudController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        private readonly DbConnection _dbConnection;
        public BkuBudController(IMapper mapper, IUow uow, DbConnection dbConnection)
        {
            _mapper = mapper;
            _uow = uow;
            _dbConnection = dbConnection;
        }
        [HttpGet("GenerateNoBku")]
        public async Task<IActionResult> GetNoBku(
            [FromQuery][Required]long Idbend
            )
        {
            try
            {
                string nobku = await _uow.BkuRepo.GenerateNoBKUBUD(Idbend);
                return Ok(new { nobku });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]BkuBudGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string sp_name = param.Jenis == "bkud" ? "WSPI_BKUD" : "WSPI_BKUK";
            
            try
            {
                if(param.Jenis == "bkud")
                {
                    List<BkudView> datas = new List<BkudView>();
                    using (IDbConnection dbConnection = _dbConnection)
                    {
                        await _dbConnection.OpenAsync();
                        var parameters = new DynamicParameters();
                        parameters.Add("@Nobbantu", param.Nobbantu);
                        parameters.Add("@Tgl1", param.Tgl1);
                        parameters.Add("@Tgl2", param.Tgl2);
                        datas.AddRange(dbConnection.QueryAsync<BkudView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                        dbConnection.Close();
                    }
                    return Ok(datas);
                } else
                {
                    List<BkukView> datas = new List<BkukView>();
                    using (IDbConnection dbConnection = _dbConnection)
                    {
                        await _dbConnection.OpenAsync();
                        var parameters = new DynamicParameters();
                        parameters.Add("@Nobbantu", param.Nobbantu);
                        parameters.Add("@Tgl1", param.Tgl1);
                        parameters.Add("@Tgl2", param.Tgl2);
                        datas.AddRange(dbConnection.QueryAsync<BkukView>(sp_name, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                        dbConnection.Close();
                    }
                    return Ok(datas);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody][Required]BkuBudPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if(param.Jenis == "bkud")
                {
                    Bkud post = _mapper.Map<Bkud>(param);
                    post.Datecreate = DateTime.Now;
                    Bkud Insert = await _uow.BkudRepo.Add(post);
                    if(Insert != null)
                    {
                        return Ok();
                    }
                    return BadRequest();
                } else
                {
                    Bkuk post = _mapper.Map<Bkuk>(param);
                    post.Datecreate = DateTime.Now;
                    Bkuk Insert = await _uow.BkukRepo.Add(post);
                    if (Insert != null)
                    {
                        return Ok();
                    }
                    return BadRequest();
                }
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{jenis}/{nobukas}")]
        public async Task<IActionResult> Delete(string jenis, string nobukas)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if(jenis == "bkud")
                {
                    Bkud data = await _uow.BkudRepo.Get(w => w.Nobukas.Trim() == nobukas.Trim());
                    if(data != null)
                    {
                        _uow.BkudRepo.Remove(data);
                        if(await _uow.Complete())
                        {
                            return Ok();
                        } else
                        {
                            return BadRequest("Gagal Hapus");
                        }
                    } else
                    {
                        return BadRequest("Hapus Gagal, Data Tidak Ditemukan");
                    }
                } else
                {
                    Bkuk data = await _uow.BkukRepo.Get(w => w.Nobukas.Trim() == nobukas.Trim());
                    if (data != null)
                    {
                        _uow.BkukRepo.Remove(data);
                        if (await _uow.Complete())
                        {
                            return Ok();
                        }
                        else
                        {
                            return BadRequest("Gagal Hapus");
                        }
                    }
                    else
                    {
                        return BadRequest("Hapus Gagal, Data Tidak Ditemukan");
                    }
                }
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}