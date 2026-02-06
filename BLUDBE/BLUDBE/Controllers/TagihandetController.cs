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
    public class TagihandetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public TagihandetController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gest([FromQuery][Required]long Idtagihan)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Tagihandet> datas = await _uow.TagihandetRepo.Gets(w => w.Idtagihan == Idtagihan);
                List<TagihandetView> views = _mapper.Map<List<TagihandetView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var i in views)
                    {
                        if (!String.IsNullOrEmpty(i.Idrek.ToString()) || i.Idrek != 0)
                        {
                            i.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == i.Idrek);
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TagihandetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tagihandet post = _mapper.Map<Tagihandet>(param);
            List<Tagihandet> checkRek = await _uow.TagihandetRepo.Gets(w => w.Idtagihan == param.Idtagihan && w.Idrek == param.Idrek);
            if (checkRek.Count() > 0)
                return BadRequest("Rekening Telah Ditambahkan");
            post.Datecreate = DateTime.Now;
            List<ValidationValue> validation1 = new List<ValidationValue>();
            List<ValidationValue> validation2 = new List<ValidationValue>();
            long currentTotal = 0;
            long Nilkontrak = 0;
            long RealTagihan = 0;
            long SisaTagihan = 0;
            try
            {
                
                Tagihan tagihan = await _uow.TagihanRepo.Get(w => w.Idtagihan == post.Idtagihan);
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var SpName = "WSP_VALIDATION_TAG_KONTRAK";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", tagihan.Idunit.ToString());
                    parameters.Add("@IDKONTRAK", tagihan.Idkontrak.ToString());
                    validation1.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName, parameters, commandType: CommandType.StoredProcedure).Result.ToList());


                    if (validation1.Count() > 0)
                    {
                        if ((validation1[0].Tot - param.Nilai) < 0)
                        {
                            currentTotal = (long)(validation1[0].Tot - param.Nilai);
                            Nilkontrak = (long)(validation1[0].Penambah);
                            RealTagihan = (long)(validation1[0].Pengurang);
                            SisaTagihan = (long)(validation1[0].Tot);
                            return BadRequest("Nilai Kontrak " + Nilkontrak.ToString() + ", Nilai Realisasi Tagihan " + RealTagihan.ToString() + ", Nilai Tagihan yang bisa diinput " + SisaTagihan.ToString());
                            //return BadRequest("Nilai Tagihan " + post.Nilai.ToString() + " Melebihi Nilai Rekening " + currentTotal.ToString());
                        }
                        else
                        {
                            var SpName2 = "WSP_VALIDATION_TAG_DPA";
                            var parameters2 = new DynamicParameters();
                            parameters2.Add("@IDUNIT", tagihan.Idunit.ToString());
                            parameters2.Add("@IDKONTRAK", tagihan.Idkontrak.ToString());
                            parameters2.Add("@IDREK", post.Idrek.ToString());
                            validation2.AddRange(dbConnection.QueryAsync<ValidationValue>(SpName2, parameters2, commandType: CommandType.StoredProcedure).Result.ToList());
                            if (validation2.Count() > 0)
                            {
                                if ((validation2[0].Tot - param.Nilai) < 0)
                                {
                                    currentTotal = (long)(validation2[0].Tot - param.Nilai);
                                    return BadRequest("Nilai Tagihan " + post.Nilai.ToString() + " Melebihi Nilai Rekening " + currentTotal.ToString());
                                }
                            }
                        }
                    }
                }
                
                Tagihandet Insert = await _uow.TagihandetRepo.Add(post);
                if(Insert != null)
                {
                    TagihandetView view = _mapper.Map<TagihandetView>(Insert);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    return Ok(view);
                }
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TagihandetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tagihandet post = _mapper.Map<Tagihandet>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.TagihandetRepo.Update(post);
                if (Update)
                {
                    TagihandetView view = _mapper.Map<TagihandetView>(post);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    return Ok(view);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idtagihandet}")]
        public async Task<IActionResult> Delete(long Idtagihandet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tagihandet data = await _uow.TagihandetRepo.Get(w => w.Idtagihandet == Idtagihandet);
                _uow.TagihandetRepo.Remove(data);
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