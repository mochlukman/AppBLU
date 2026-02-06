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
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.Akuntansi.BukitMemorial
{
    [Route("api/[controller]")]
    [ApiController]
    public class BktmemController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        public BktmemController(IUow uow, IMapper mapper, DbConnection dbConnection)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]string Kdbm
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bktmem> datas = await _uow.BktmemRepo.ViewDatas(Idunit, Kdbm);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BktmemPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bktmem post = _mapper.Map<Bktmem>(param);
            string[] splitNo = param.Nobm.Split("/");
            if (splitNo[0].ToLower().Contains("x")) return BadRequest("Harap Pengisian Nomor Disesuaikan!, Ex.(00001)");
            bool checkNo = await _uow.BktmemRepo.isExist(w => w.Nobm.Trim() == post.Nobm.Trim() && w.Idunit == param.Idunit);
            if (checkNo) return BadRequest("Nomor Sudah Digunakan");
            post.Datecreate = DateTime.Now;
            try
            {
                Bktmem insert = await _uow.BktmemRepo.Add(post);
                if(insert != null)
                {
                    if (param.Penutup)
                    {
                        string sp_name = "WSP_JOTO";
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@IDUNIT", param.Idunit);
                            parameters.Add("@IDBM", insert.Idbm);
                            dbConnection.Execute(sp_name, parameters,commandType: CommandType.StoredProcedure);
                            dbConnection.Close();
                        }
                    } else if(!param.Penutup && param.Idjbm == 14) // ini untuk penutup Anggran dengan KDDBM = 114 & IDJBM = 14
                    {
                        string sp_name = "WSP_JURANG";
                        using (IDbConnection dbConnection = _dbConnection)
                        {
                            await _dbConnection.OpenAsync();
                            var parameters = new DynamicParameters();
                            parameters.Add("@Idunit", param.Idunit);
                            parameters.Add("@Idbm", insert.Idbm);
                            parameters.Add("@Kdtahap", "2");
                            dbConnection.Execute(sp_name, parameters, commandType: CommandType.StoredProcedure);
                            dbConnection.Close();
                        }
                    }
                    Bktmem view = await _uow.BktmemRepo.ViewData(insert.Idbm);
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]BktmemPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bktmem post = _mapper.Map<Bktmem>(param);
            post.Datecreate = DateTime.Now;
            Bktmem Old = await _uow.BktmemRepo.Get(w => w.Nobm.Trim() == post.Nobm.Trim() && w.Idunit == param.Idunit);
            if (Old != null)
            {
                if (Old.Idbm != post.Idbm) return BadRequest("Nomor Sudah Digunakan");
            }
            try
            {
                bool update = await _uow.BktmemRepo.Update(post);
                if (update)
                    return Ok(await _uow.BktmemRepo.ViewData(post.Idbm));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbm}")]
        public async Task<IActionResult> Delete(long Idbm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bktmem data = await _uow.BktmemRepo.Get(w => w.Idbm == Idbm);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                List<Bktmemdetb> bktmemdetb = await _uow.BktmemdetbRepo.Gets(w => w.Idbm == data.Idbm);
                List<Bktmemdetd> bktmemdetd = await _uow.BktmemdetdRepo.Gets(w => w.Idbm == data.Idbm);
                List<Bktmemdetr> bktmemdetr = await _uow.BktmemdetrRepo.Gets(w => w.Idbm == data.Idbm);
                List<Bktmemdetn> bktmemdetn = await _uow.BktmemdetnRepo.Gets(w => w.Idbm == data.Idbm);
                _uow.BktmemdetbRepo.RemoveRange(bktmemdetb);
                _uow.BktmemdetdRepo.RemoveRange(bktmemdetd);
                _uow.BktmemdetrRepo.RemoveRange(bktmemdetr);
                _uow.BktmemdetnRepo.RemoveRange(bktmemdetn);
                _uow.BktmemRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("Validasi")]
        public async Task<IActionResult> Validasi([FromBody]BktmemValidasi param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if(param.Valid == true && String.IsNullOrEmpty(param.Tglvalid.ToString()))
            {
                return BadRequest("Tanggal Jurnal Harus Diisi");
            }
            if(param.Valid == false || param.Valid == null)
            {
                param.Tglvalid = null;
            }
            param.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool validasi = await _uow.BktmemRepo.Validasi(param);
                if (validasi)
                    return Ok(await _uow.BktmemRepo.ViewData(param.Idbm));
                return BadRequest("Validasi Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}