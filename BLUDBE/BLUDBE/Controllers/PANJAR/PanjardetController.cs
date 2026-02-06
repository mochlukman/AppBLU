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


namespace BLUDBE.Controllers.PANJAR
{
    [Route("api/[controller]")]
    [ApiController]
    public class PanjardetController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        private readonly DbConnection _dbConnection;
        public PanjardetController(IMapper mapper, IUow uow, DbConnection dbConnection)
        {
            _mapper = mapper;
            _uow = uow;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] long Idpanjar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<PanjardetView> data = await _uow.PanjardetRepo.ViewDatas(Idpanjar);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpanjardet}")]
        public async Task<IActionResult> Get(long Idpanjardet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PanjardetView data = await _uow.PanjardetRepo.ViewData(Idpanjardet);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PanjardetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjardet post = _mapper.Map<Panjardet>(param);
            post.Datecreate = DateTime.Now;
            post.Nilai = 0;
            Panjardet check = await _uow.PanjardetRepo.Get(w => w.Idpanjar == post.Idpanjar && w.Idkeg == post.Idkeg);
            if (check != null)
            {
                Mkegiatan mkegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == check.Idkeg);
                return BadRequest("Gagal Input, " + mkegiatan.Nmkegunit + " Telah Ditambahkan");
            }
            try
            {
                Panjardet insert = await _uow.PanjardetRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.PanjardetRepo.ViewData(insert.Idpanjardet));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]PanjardetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjardet post = _mapper.Map<Panjardet>(param);

            try
            {
                Panjar panjar = await _uow.PanjarRepo.Get(w => w.Idpanjar == param.Idpanjar);
                decimal? totalPanjar = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.PanjarRepo.GetIds(panjar.Idpanjar));
                if (Ids.Count() > 0)
                {
                    totalPanjar = await _uow.PanjardetRepo.TotalNilaiPanjar(Ids);
                }
                List<ValidationValue> validation1 = new List<ValidationValue>();
                long currentTotal = 0;
                Panjardet current_data = await _uow.PanjardetRepo.Get(w => w.Idpanjardet == post.Idpanjardet);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    string spNamestrt = "";

                    if (panjar.Kdstatus.Trim() == "31")
                    {
                        if (panjar.Sttunai == true)
                        {
                            spNamestrt = "WSP_VALIDATIONPANJARTUNAI_31";
                        }
                        else
                        {
                            spNamestrt = "WSP_VALIDATIONPANJARBANK_31";
                        }
                    }
                    else
                    {
                        if (panjar.Sttunai == true)
                        {
                            spNamestrt = "WSP_VALIDATIONPANJARTUNAI_32";

                        }
                        else
                        {
                            spNamestrt = "WSP_VALIDATIONPANJARBANK_32";
                        }
                    }
                    var SpName = spNamestrt;
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", panjar.Idunit.ToString());
                    parameters.Add("@IDBEND", panjar.Idbend.ToString());
                    parameters.Add("@IDKEG", post.Idkeg.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                }
                if (validation1.Count() > 0)
                {
                    currentTotal = (long)(validation1[0].Tot - param.Nilai);
                    if (post.Idnojetra.ToString() == "31") // Ambil dari JTRNLKAS
                    {
                        if (currentTotal < 0)
                        {
                            return BadRequest("Total Nilai Penarikan : " + post.Nilai.ToString() + ", melebihi saldo Kas Bank : " + currentTotal.ToString());
                        }
                    }
                    else
                    {
                        if (currentTotal < 0)
                        {
                            return BadRequest("Nilai Nilai Setoran : " + post.Nilai.ToString() + ", melebihi total Kas Tunai : " + currentTotal.ToString());
                        }
                    }
                }
                bool update = await _uow.PanjardetRepo.Update(post);

                if (update==true)
                {
                    return Ok(await _uow.PanjardetRepo.ViewData(post.Idpanjardet));
                }
               
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
            /*if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjardet post = _mapper.Map<Panjardet>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.PanjardetRepo.Update(post);
                if (update)
                {
                    PanjardetView view = await _uow.PanjardetRepo.ViewData(post.Idpanjardet);
                    return Ok(view);
                }
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
            */
        }
        [HttpDelete("{Idpanjardet}")]
        public async Task<IActionResult> Delete(long Idpanjardet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Panjardet data = await _uow.PanjardetRepo.Get(w => w.Idpanjardet == Idpanjardet);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.PanjardetRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}