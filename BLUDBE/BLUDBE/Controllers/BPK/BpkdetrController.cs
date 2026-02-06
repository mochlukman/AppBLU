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


namespace BLUDBE.Controllers.BPK
{
    [Route("api/[controller]")]
    [ApiController]
    public class BpkdetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public BpkdetrController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] BpkdetrGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bpkdetr> datas = await _uow.BpkdetrRepo.ViewDatas(param);
                return Ok(datas);
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery] PrimengTableParam<BpkdetrGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Bpkdetr> datas = await _uow.BpkdetrRepo.Paging(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbpkdet}")]
        public async Task<IActionResult> Get(long Idbpkdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkdetr data = await _uow.BpkdetrRepo.ViewData(Idbpkdet);
                return Ok(data);
            }
            catch (Exception e)

            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("single")]
        public async Task<IActionResult> Post([FromBody]BpkdetrSinglePost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkdetr post = _mapper.Map<Bpkdetr>(param);
            post.Idnojetra = 21;
            post.Datecreate = DateTime.Now;

            long currentTotal = 0;
            long NilBelanja = 0;
            long RealBelanja = 0;
            long SisaBelanja = 0;
            long Totbelanja = 0;

            List<ValidationValue> validation1 = new List<ValidationValue>();

            try
            {

                Bpk bpk = await _uow.BpkRepo.Get(w => w.Idbpk == param.Idbpk);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    var SpName = "";
                    string label = "";
                    if (bpk.Idjbayar == 1)
                    { SpName = "WSP_VALIDATIONBPK_TUNAI"; label = "Kas Tunai"; }
                    else if (bpk.Idjbayar == 2)
                    { SpName = "WSP_VALIDATIONBPK_BANK"; label = "Kas Bank"; }
                    else
                    { SpName = "WSP_VALIDATIONBPK_PANJAR"; label = "Nilai Panjar"; }

                    dbConnection.Open();

                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", bpk.Idunit.ToString());
                    parameters.Add("@IDBEND", bpk.Idbend.ToString());
                    parameters.Add("@IDBPK", bpk.Idbpk.ToString());
                    parameters.Add("@IDKEG", bpk.Idkeg.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());

                    if (bpk.Kdstatus == "21")
                    {
                        if (validation1.Count > 0)
                        {
                            currentTotal = (long)(validation1[0].Tot - param.Nilai);
                            NilBelanja = (long)(validation1[0].Penambah);
                            RealBelanja = (long)(validation1[0].Pengurang);
                            SisaBelanja = (long)(validation1[0].Tot);
                            Totbelanja = (long)(validation1[0].Totbelanja);

                            if (currentTotal < 0)
                            {
                                return BadRequest("Nilai total Belanja " + Totbelanja.ToString() + ", Melebihi total " + label + " yang masih bisa diinput " + SisaBelanja.ToString());
                            }
                        }
                    }
                }

                Bpkdetr insert = await _uow.BpkdetrRepo.Add(post);
                if (insert != null)
                {
                    return Ok(await _uow.BpkdetrRepo.ViewData(insert.Idbpkdetr));
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BpkdetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Bpkdetr> views = new List<Bpkdetr> { };

            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Bpkdetr insert = await _uow.BpkdetrRepo.Add(new Bpkdetr
                        {
                            Idnojetra = 21,
                            Datecreate = DateTime.Now,
                            Idkeg = param.Idkeg,
                            Idrek = param.Idrek[i],
                            Idbpk = param.Idbpk,
                            Nilai = 0
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.BpkdetrRepo.ViewData(insert.Idbpkdetr));
                        }
                    }
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]BpkdetrUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkdetr post = _mapper.Map<Bpkdetr>(param);
            post.Dateupdate = DateTime.Now;

            long currentTotal = 0;
            long NilBelanja = 0;
            long RealBelanja = 0;
            long SisaBelanja = 0;
            long Totbelanja = 0;

            List<ValidationValue> validation1 = new List<ValidationValue>();
            try
            {
                Bpk bpk = await _uow.BpkRepo.Get(w => w.Idbpk == post.Idbpk);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    var SpName = "";
                    string label = "";
                    if (bpk.Idjbayar == 1)
                    { SpName = "WSP_VALIDATIONBPK_TUNAI"; label = "Kas Tunai";  }
                    else if (bpk.Idjbayar == 2)
                    { SpName = "WSP_VALIDATIONBPK_BANK"; label = "Kas Bank"; }
                    else
                    { SpName = "WSP_VALIDATIONBPK_PANJAR"; label = "Nilai Panjar"; }

                    dbConnection.Open();

                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", bpk.Idunit.ToString());
                    parameters.Add("@IDBEND", bpk.Idbend.ToString());
                    parameters.Add("@IDBPK", bpk.Idbpk.ToString());
                    parameters.Add("@IDKEG", bpk.Idkeg.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());

                    if (bpk.Kdstatus == "21")
                    {
                        if (validation1.Count > 0)
                        {
                            currentTotal = (long)(validation1[0].Tot - param.Nilai);
                            NilBelanja = (long)(validation1[0].Penambah);
                            RealBelanja = (long)(validation1[0].Pengurang);
                            SisaBelanja = (long)(validation1[0].Tot);
                            Totbelanja = (long)(validation1[0].Totbelanja);

                            if (currentTotal < 0)
                            {
                                return BadRequest("Nilai total Belanja " + Totbelanja.ToString() + ", Melebihi total " + label + " yang masih bisa diinput " + SisaBelanja.ToString());
                            }
                        }
                    }
                }

                bool Update = await _uow.BpkdetrRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.BpkdetrRepo.ViewData(post.Idbpkdetr));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbpkdet}")]
        public async Task<IActionResult> Delete(long Idbpkdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkdetr data = await _uow.BpkdetrRepo.Get(w => w.Idbpkdetr == Idbpkdet);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.BpkdetrRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}