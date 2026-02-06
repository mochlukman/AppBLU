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

namespace BLUDBE.Controllers.STS
{
    [Route("api/[controller]")]
    [ApiController]
    public class StsdetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public StsdetbController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idsts)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Stsdetb> datas = await _uow.StsdetbRepo.ViewDatas(Idsts);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstsdetb}")]
        public async Task<IActionResult> Get(long Idstsdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetb data = await _uow.StsdetbRepo.ViewData(Idstsdetb);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]StsdetbPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Stsdetb> views = new List<Stsdetb> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        bool exists_data = await _uow.StsdetbRepo.isExist(w => w.Idsts == param.Idsts && w.Idrek == param.Idrek[i]);
                        if (!exists_data)
                        {
                            Stsdetb insert = await _uow.StsdetbRepo.Add(new Stsdetb
                            {
                                Idnojetra = 11,
                                Idrek = param.Idrek[i],
                                Idsts = param.Idsts,
                                Nilai = 0,
                                Datecreate = DateTime.Now
                            });
                            if (insert != null)
                            {
                                views.Add(await _uow.StsdetbRepo.ViewData(insert.Idstsdetb));
                            }
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
        public async Task<IActionResult> Put([FromBody]StsdetbUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdetb post = _mapper.Map<Stsdetb>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                Daftrekening daftrek = await _uow.DaftrekeningRepo.Get(w => w.Idrek == post.Idrek);

                List<ValidationValue> validation = new List<ValidationValue>();
                long currentTotal = 0;

                long Nildpa = 0;
                long RealDPA = 0;
                long Sisa = 0;

                Sts sts = await _uow.StsRepo.Get(w => w.Idsts == post.Idsts);
                Stsdetb current_data = await _uow.StsdetbRepo.Get(w => w.Idstsdetb == post.Idstsdetb);
                if(sts.Kdstatus.Trim() != "16")
                {
                    using (IDbConnection dbConnection = _dbConnection)
                    {
                        dbConnection.Open();
                        var SpName = "WSP_VALIDATIONSTS_REK_B";
                        var parameters = new DynamicParameters();
                        parameters.Add("@IDUNIT", sts.Idunit.ToString());
                        parameters.Add("@IDREK", current_data.Idrek.ToString());
                        parameters.Add("@TGLSTS", sts.Tglsts);
                        validation.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    }
                    if (validation.Count() > 0)
                    {
                        currentTotal = (long)(validation[0].Tot - param.Nilai);
                        Nildpa = (long)(validation[0].Penambah);
                        RealDPA = (long)(validation[0].Pengurang);
                        Sisa = (long)(validation[0].Tot);

                        if (currentTotal < 0)
                        {
                            return BadRequest("Nilai Belanja yang akan dikembalikan " + param.Nilai.ToString() + ", Nilai Realisasi Pengembalian " + RealDPA.ToString() + ", Nilai Rekening STS" + daftrek.Kdper.ToString() + "Sebesar " + post.Nilai.ToString() + ", melebihi sisa yang bisa di kembalikan" + Sisa.ToString());
                        }
                    }
                }
                bool Update = await _uow.StsdetbRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.StsdetbRepo.ViewData(post.Idstsdetb));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idstsdetb}")]
        public async Task<IActionResult> Delete(long Idstsdetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetb data = await _uow.StsdetbRepo.Get(w => w.Idstsdetb == Idstsdetb);
                if (data == null) return BadRequest("Data Tidak Ditemukank");
                _uow.StsdetbRepo.Remove(data);
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