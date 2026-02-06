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

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdendumController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public AdendumController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Adendum> datas = await _uow.AdendumRepo.Gets(w => w.Idunit == Idunit && w.Idkeg == Idkeg);
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if(!String.IsNullOrEmpty(d.Idkontrak.ToString()) || d.Idkontrak != 0)
                        {
                            d.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == d.Idkontrak);
                        }
                    }
                }
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idadd}")]
        public async Task<IActionResult> Get(long Idadd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Adendum data = await _uow.AdendumRepo.Get(w => w.Idadd == Idadd);
                if(data != null)
                {
                    data.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == data.Idkontrak);
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
        public async Task<IActionResult> Post([FromBody]AdendumPost param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            Adendum post = _mapper.Map<Adendum>(param);
            post.Datecreate = DateTime.Now;

            List<ValidationValue> validation1 = new List<ValidationValue>();
            List<ValidationValue> validation2 = new List<ValidationValue>();
            long Sisa1 = 0;
            long Sisa2 = 0;

            try
            {
                Kontrak kontrak = await _uow.KontrakRepo.Get(w => w.Idkontrak == post.Idkontrak);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATION_ADM_TAGIHAN";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", post.Idunit.ToString());
                    parameters.Add("@IDADD", post.Idkontrak.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());


                    if (validation1.Count() > 0)
                    {
                        if (validation1[0].Tot < post.Nilaiadd)
                        {
                            Sisa1 = (long)(validation1[0].Tot);
                            return BadRequest("Nilai Adendum " + post.Nilaiadd.ToString() + " Kurang dari Realisasi " + Sisa1.ToString());

                        }
                        else
                        {
                            var SpName2 = "WSP_VALIDATION_TAG_DPA";
                            var parameters2 = new DynamicParameters();
                            parameters2.Add("@IDUNIT", post.Idunit.ToString());
                            parameters2.Add("@IDKONTRAK", post.Idkontrak.ToString());
                            validation2.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName2, parameters2, commandType: CommandType.StoredProcedure).Result.ToList());
                            if (validation2.Count() > 0)
                            {
                                if (validation2[0].Tot < post.Nilaiadd)
                                {
                                    Sisa2 = (long)(validation2[0].Tot);
                                    return BadRequest("Nilai Adendum " + post.Nilaiadd.ToString() + " Melebihi Nilai DPA " + Sisa2.ToString());
                                }
                            }
                        }
                    }
                }

                Adendum insert = await _uow.AdendumRepo.Add(post);
                if(insert != null)
                {
                    if (!String.IsNullOrEmpty(insert.Idkontrak.ToString()) || insert.Idkontrak != 0)
                    {
                        insert.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == insert.Idkontrak);
                    }
                    return Ok(insert);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]AdendumPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Adendum post = _mapper.Map<Adendum>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.AdendumRepo.Update(post);
                if (update)
                {
                    if(!String.IsNullOrEmpty(post.Idkontrak.ToString()) || post.Idkontrak != 0)
                    {
                        post.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == post.Idkontrak);
                    }
                    return Ok(post);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idadd}")]
        public async Task<IActionResult> Delete(long Idadd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Adendum data = await _uow.AdendumRepo.Get(w => w.Idadd == Idadd);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.AdendumRepo.Remove(data);
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
    }
}