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
    public class StsdetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public StsdetrController(IUow uow, IMapper mapper, DbConnection dbConnection)
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
                List<Stsdetr> datas = await _uow.StsdetrRepo.ViewDatas(Idsts);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstsdetr}")]
        public async Task<IActionResult> Get(long Idstsdetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetr data = await _uow.StsdetrRepo.ViewData(Idstsdetr);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]StsdetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdetr post = _mapper.Map<Stsdetr>(param);
            try
            {
                Stsdetr insert = await _uow.StsdetrRepo.Add(post);
                if(insert != null) return Ok(insert);
                return BadRequest("Insert Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]Stsdetr param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdetr post = _mapper.Map<Stsdetr>(param);
            try
            {

                Daftrekening daftrek = await _uow.DaftrekeningRepo.Get(w => w.Idrek == post.Idrek);

                List<ValidationValue> validation = new List<ValidationValue>();
                long currentTotal = 0;

                long Nildpa = 0;
                long RealDPA = 0;
                long Sisa = 0;

                Sts sts = await _uow.StsRepo.Get(w => w.Idsts == post.Idsts);
                Stsdetr current_data = await _uow.StsdetrRepo.Get(w => w.Idstsdetr == post.Idstsdetr);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATIONSTS_REK_LS";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", sts.Idunit.ToString());
                    parameters.Add("@IDREK", current_data.Idrek.ToString());
                    parameters.Add("@IDKEG", current_data.Idkeg.ToString());
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

                bool update = await _uow.StsdetrRepo.Update(post);
                if (update) return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idstsdetr}")]
        public async Task<IActionResult> Delete(long Idstsdetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdetr data = await _uow.StsdetrRepo.Get(w => w.Idstsdetr == Idstsdetr);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.StsdetrRepo.Remove(data);
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