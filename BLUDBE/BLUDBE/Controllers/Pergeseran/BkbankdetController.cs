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



namespace BLUDBE.Controllers.Pergeseran
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkbankdetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public BkbankdetController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idbkbank)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkbankdet> datas = await _uow.BkbankdetRepo.ViewDatas(Idbkbank);
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if(d.IdbkbankNavigation != null)
                        {
                            d.IdbkbankNavigation.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == d.IdbkbankNavigation.Kdstatus.Trim());
                        }
                    }
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbankdet}")]
        public async Task<IActionResult> Get(long Idbankdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkbankdet data = await _uow.BkbankdetRepo.ViewData(Idbankdet);
                if(data != null)
                {
                    if (data.IdbkbankNavigation != null)
                    {
                        data.IdbkbankNavigation.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == data.IdbkbankNavigation.Kdstatus.Trim());
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkbankdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbankdet post = _mapper.Map<Bkbankdet>(param);
            Bkbank bkbank = await _uow.BkbankRepo.Get(w => w.Idbkbank == post.Idbkbank);
            post.Idnojetra = bkbank.Kdstatus.Trim() == "33" ? 31 : 32;
            try
            {
                Bkbankdet insert = await _uow.BkbankdetRepo.Add(post);
                if (insert != null) {
                    Bkbankdet data = await _uow.BkbankdetRepo.ViewData(insert.Idbankdet);
                    if (data.IdbkbankNavigation != null)
                    {
                        data.IdbkbankNavigation.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == data.IdbkbankNavigation.Kdstatus.Trim());
                    }
                    return Ok(data);
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
        public async Task<IActionResult> Put([FromBody]BkbankdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbankdet post = _mapper.Map<Bkbankdet>(param);
            
            try
            {
                Bkbank bank = await _uow.BkbankRepo.Get(w => w.Idbkbank == param.Idbkbank);
                decimal? totalGeser = 0;
                List<long> Ids = new List<long> { };
                Ids.AddRange(await _uow.BkbankRepo.GetIds(bank.Idunit, bank.Kdstatus, bank.Idbend));
                if (Ids.Count() > 0)
                {
                    totalGeser = await _uow.BkbankdetRepo.TotalNilaiGeser(Ids);
                }
                List<ValidationValue> validation1 = new List<ValidationValue>();
                long currentTotal = 0;
                Bkbankdet current_data = await _uow.BkbankdetRepo.Get(w => w.Idbankdet == post.Idbankdet);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATIONUANGGESER_" + bank.Kdstatus.ToString();
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", bank.Idunit.ToString());
                    parameters.Add("@IDBEND", bank.Idbend.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                }
                if (validation1.Count() > 0)
                {
                    //currentTotal = ((long)(validation1[0].Tot - param.Nilai) - (long)current_data.Nilai);
                    currentTotal = ((long)(validation1[0].Tot - param.Nilai)) + (long)current_data.Nilai;
                    if (current_data.Idnojetra.ToString() == "31") // Ambil dari JTRNLKAS
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
                bool update = await _uow.BkbankdetRepo.Update(post);
                if (update)
                {
                    //Bkbankdet data = await _uow.BkbankdetRepo.Get(w => w.Idbankdet == post.Idbankdet);
                    BkbankdetView view = _mapper.Map<BkbankdetView>(post);
                    if (!String.IsNullOrEmpty(view.Idnojetra.ToString()) || (view.Idnojetra) != 0)
                    {
                        view.IdnojetraNavigation = await _uow.JtrnlkasRepo.Get(w => w.Idnojetra == view.Idnojetra);
                    }
                    //view.Totspd = totspd;
                    //view.Sisa = totalGeser - view.Nilai;
                    return Ok(view);

                }
                
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        /*{
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbankdet post = _mapper.Map<Bkbankdet>(param);
            try
            {
                bool update = await _uow.BkbankdetRepo.Update(post);
                if (update) {
                    Bkbankdet data = await _uow.BkbankdetRepo.ViewData(post.Idbankdet);
                    if (data.IdbkbankNavigation != null)
                    {
                        data.IdbkbankNavigation.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == data.IdbkbankNavigation.Kdstatus.Trim());
                    }
                    return Ok(data);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        */

        [HttpDelete("{Idbankdet}")]
        public async Task<IActionResult> Delete(long Idbankdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkbankdet data = await _uow.BkbankdetRepo.Get(w => w.Idbankdet == Idbankdet);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.BkbankdetRepo.Remove(data);
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