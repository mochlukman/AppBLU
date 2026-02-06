using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KegunitController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public KegunitController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet("tree")]
        public async Task<IActionResult> Tree(
            [FromQuery][Required] long Idunit,
            [FromQuery] string Kdtahap,
            [FromQuery] string type // isikan 'kegiatan' jika sampai kegiatan, dan 'subkegiatan' jika sampai subkegiatan
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<LookupTree> datas = await _uow.KegunitRepo.Tree(Idunit, Kdtahap, type);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("IdskegByUnit")]
        public async Task<IActionResult> IdskegByUnit(
            [FromQuery][Required]long Idunit
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<long> datas = await _uow.KegunitRepo.IdskegByUnit(Idunit);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<KegunitGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<KegunitView> data = await _uow.KegunitRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]KegunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kegunit Post = _mapper.Map<Kegunit>(param);
            Post.Datecreate = DateTime.Now;
            bool exist = await _uow.KegunitRepo.isExist(w => w.Idpgrmunit == param.Idpgrmunit && w.Idkeg == param.Idkeg);
            if (exist) return BadRequest("Duplikat Data, Kegiatan telah digunakan");

            List<ValidationValue> validation1 = new List<ValidationValue>();
            try
            {

                Pgrmunit pgrm = await _uow.PgrmunitRepo.Get(w => w.Idpgrmunit == param.Idpgrmunit);
                
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATION_PAGUSKPD";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", pgrm.Idunit.ToString());
                    parameters.Add("@KDTAHAP", pgrm.Kdtahap.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());

                    if (validation1.Count > 0)
                    {
                        if (validation1[0].Tot < param.Pagu)

                        {
                            return BadRequest("Nilai Input " + param.Pagu.ToString() + " melebihi Nilai Sub Kegiatan yang bisa dimasukan " + validation1[0].Tot.ToString());
                        }
                    }

                }

                Kegunit Insert = await _uow.KegunitRepo.Add(Post);
                if(Insert != null)
                {
                    return Ok(await _uow.KegunitRepo.ViewData(Insert.Idkegunit));
                }
                return BadRequest("Gagal Input");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]KegunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kegunit Post = _mapper.Map<Kegunit>(param);
            Post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.KegunitRepo.Update(Post);
                if (Update)
                {
                    return Ok(await _uow.KegunitRepo.ViewData(Post.Idkegunit));
                }
                return BadRequest("Update Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idkegunit}")]
        public async Task<IActionResult> Delete(long Idkegunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kegunit data = await _uow.KegunitRepo.Get(w => w.Idkegunit == Idkegunit);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Kinkeg> kinkegs = await _uow.KinkegRepo.Gets(w => w.Idkegunit == data.Idkegunit);
                List<Kegsbdana> kegsbdanas = await _uow.KegsbdanaRepo.Gets(w => w.Idkegunit == data.Idkegunit);
                if (kinkegs.Count() > 0 || kegsbdanas.Count() > 0)
                    return BadRequest("Hapus Gagal, Data Telah Digunakan");
                _uow.KegunitRepo.Remove(data);
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