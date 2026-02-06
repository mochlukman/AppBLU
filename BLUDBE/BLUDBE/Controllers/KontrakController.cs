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
    public class KontrakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public KontrakController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;

        }
        [HttpGet("paging/list")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<KontrakGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Kontrak> data = await _uow.KontrakRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("list")]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] long Idunit,
            [FromQuery]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Kontrak> datas = await _uow.KontrakRepo.viewDatas(Idunit, Idkeg);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idkontrak}")]
        public async Task<IActionResult> Get(long Idkontrak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kontrak data = await _uow.KontrakRepo.Get(w => w.Idkontrak == Idkontrak);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] KontrakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kontrak cekNokontrak = await _uow.KontrakRepo.Get(w => w.Nokontrak.Trim() == param.Nokontrak.Trim() && w.Idunit == param.Idunit);
            if (cekNokontrak != null) return BadRequest("No Kontrak Telah Digunakan");
            if (String.IsNullOrEmpty(param.Tglkontrak.ToString()))
            {
                return BadRequest("Tanggal Kontrak Harus Diisi");
            }
            if (String.IsNullOrEmpty(param.Tglakhirkontrak.ToString()))
            {
                return BadRequest("Tanggal Akhir Kontrak Harus Diisi");
            }
            try
            {
                Kontrak post = _mapper.Map<Kontrak>(param);
                post.Datecreate = DateTime.Now;

                List<ValidationValue> validation1 = new List<ValidationValue>();

                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALTOT_KONTRAK_DPA";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", param.Idunit.ToString());
                    parameters.Add("@IDKEG", param.Idkeg.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());

                    if (validation1.Count > 0)
                    {
                        if (validation1[0].Tot < param.Nilai)

                        {
                            return BadRequest("Nilai Input " + param.Nilai.ToString() + " melebihi Nilai Kontrak yang bisa dimasukan " + validation1[0].Tot.ToString());
                        }
                    }
                }

                Kontrak Insert = await _uow.KontrakRepo.Add(post);
                if(Insert != null)
                {

                    if (!String.IsNullOrEmpty(Insert.Idkeg.ToString()) || Insert.Idkeg != 0)
                    {
                        Insert.IdkegNavigation = await _uow.MkegiatanRepo.Get(w => w.Idkeg == Insert.Idkeg);
                    }
                    if (!String.IsNullOrEmpty(Insert.Idphk3.ToString()) || Insert.Idphk3 != 0)
                    {
                        Insert.Idphk3Navigation = await _uow.Daftphk3Repo.Get(w => w.Idphk3 == Insert.Idphk3);
                    }
                    return Ok(Insert);
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
        public async Task<IActionResult> Put([FromBody] KontrakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kontrak cekNokontrak = await _uow.KontrakRepo.Get(w => w.Nokontrak.Trim() == param.Nokontrak.Trim() && w.Idunit == param.Idunit);
            if (cekNokontrak != null)
            {
                if(cekNokontrak.Idkontrak != param.Idkontrak)
                {
                    return BadRequest("No Kontrak Telah Digunakan");
                }
            }
            if (String.IsNullOrEmpty(param.Tglkontrak.ToString()))
            {
                return BadRequest("Tanggal Kontrak Harus Diisi");
            }
            if (String.IsNullOrEmpty(param.Tglakhirkontrak.ToString()))
            {
                return BadRequest("Tanggal Akhir Kontrak Harus Diisi");
            }
            try
            {
                Kontrak post = _mapper.Map<Kontrak>(param);
                post.Dateupdate = DateTime.Now;

                List<ValidationValue> validation1 = new List<ValidationValue>();

                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALTOT_KONTRAK_DPA";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", post.Idunit.ToString());
                    parameters.Add("@IDKEG", post.Idkeg.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());

                    if (validation1.Count > 0)
                    {
                        if (validation1[0].Tot + param.Nilai < param.Nilai)
                        {
                            return BadRequest("Nilai Input " + param.Nilai.ToString() + " melebihi Nilai Kontrak yang bisa dimasukan " + validation1[0].Tot.ToString());
                        }
                    }
                }

                bool update = await _uow.KontrakRepo.Update(post);
                if (update)
                {

                    if (!String.IsNullOrEmpty(post.Idkeg.ToString()) || post.Idkeg != 0)
                    {
                        post.IdkegNavigation = await _uow.MkegiatanRepo.Get(w => w.Idkeg == post.Idkeg);
                    }
                    if (!String.IsNullOrEmpty(post.Idphk3.ToString()) || post.Idphk3 != 0)
                    {
                        post.Idphk3Navigation = await _uow.Daftphk3Repo.Get(w => w.Idphk3 == post.Idphk3);
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
        [HttpDelete("{Idkontrak}")]
        public async Task<IActionResult> Delete(long Idkontrak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kontrak data = await _uow.KontrakRepo.Get(w => w.Idkontrak == Idkontrak);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Kontrakdetr> details = await _uow.KontrakdetrRepo.Gets(w => w.Idkontrak == Idkontrak);
                if (details.Count() > 0) return BadRequest("Gagal Hapus, Data Kontrak Telah Digukanan");
                _uow.KontrakRepo.Remove(data);
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