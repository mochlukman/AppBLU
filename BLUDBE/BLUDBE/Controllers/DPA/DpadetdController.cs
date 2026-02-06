using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKPD.API.Helpers;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpadetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _BludContext;
        public DpadetdController(IUow uow, IMapper mapper, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpad
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpadetd> datas = await _uow.DpadetdRepo.Gets(w => w.Iddpad == Iddpad);
                List<DpadetdView> views = _mapper.Map<List<DpadetdView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if(!String.IsNullOrEmpty(v.Idstdharga.ToString()) || v.Idstdharga != 0)
                        {
                            v.StandarHarga = await _uow.StdhargaRepo.Get(w => w.Idstdharga == v.Idstdharga);
                        }
                        if (!String.IsNullOrEmpty(v.Idsatuan.ToString()) || v.Idsatuan != 0)
                        {
                            v.Jsatuan = await _uow.JsatuanRepo.Get(w => w.Idsatuan == v.Idsatuan);
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
        public async Task<IActionResult> PostPenjabaran(
            [FromBody][Required] DpadetdPost post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetd param = _mapper.Map<Dpadetd>(post);
                param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Kdjabar = param.Kdjabar.Trim();
                param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Datecreate = DateTime.Now;
                if (!string.IsNullOrEmpty(param.Iddpadetdduk.ToString()) || param.Iddpadetdduk != 0)
                {
                    string kode_induk = await _uow.DpadetdRepo.GetKodeInduk((long)param.Iddpadetdduk, post.Iddpad);
                    if (!String.IsNullOrEmpty(kode_induk))
                        param.Kdjabar = kode_induk + param.Kdjabar;
                }
                if(String.IsNullOrEmpty(param.Iddpadetdduk.ToString()) || param.Iddpadetdduk == 0)
                {
                    param.Iddpadetdduk = 0;
                }
                string titik = param.Kdjabar.Substring((param.Kdjabar.Length - 1));
                if (titik != ".")
                    return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
                Dpadetd cek_kode = await _uow.DpadetdRepo.Get(w =>
                    w.Iddpad == param.Iddpad &&
                    w.Kdjabar.Trim() == param.Kdjabar.Trim());
                if (cek_kode != null)
                    return BadRequest("Kode Jabar Sudah Digunakan");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Dpadetd insert = await _uow.DpadetdRepo.Add(param);
                        if (insert != null)
                        {
                            if (insert.Iddpadetdduk != 0)
                            {
                                _uow.DpadetdRepo.UpdateType((long)insert.Iddpadetdduk, insert.Iddpad, "H");
                                _uow.DpadetdRepo.UpdateNilaiInduk(insert.Iddpadetdduk, insert.Iddpad);
                            }
                            decimal? totalRincian = await _uow.DpadetdRepo.getSubTotal(insert.Iddpad);
                            await _uow.DpadRepo.UpdateNilai(insert, totalRincian);
                            transaction.Commit();
                        }
                        DpadetdView view = _mapper.Map<DpadetdView>(insert);
                        if (!String.IsNullOrEmpty(view.Idstdharga.ToString()) || view.Idstdharga != 0)
                        {
                            view.StandarHarga = await _uow.StdhargaRepo.Get(w => w.Idstdharga == view.Idstdharga);
                        }
                        if(!String.IsNullOrEmpty(view.Idsatuan.ToString()) || view.Idsatuan != 0)
                        {
                            view.Jsatuan = await _uow.JsatuanRepo.Get(w => w.Idsatuan == view.Idsatuan);
                        }
                        return Ok(view);
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put(
            [FromBody][Required] DpadetdPost post
            )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetd param = _mapper.Map<Dpadetd>(post);
                if (param.Type.Trim() == "D")
                {
                    param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                    param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                }
                else
                {
                    Dpadetd old = await _uow.DpadetdRepo.Get(w => w.Iddpadetd == param.Iddpadetd);
                    param.Subtotal = old.Subtotal;
                }
                param.Dateupdate = DateTime.Now;
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.DpadetdRepo.Update(param);
                        if (Update)
                        {
                            if (param.Type.Trim() == "D")
                            {
                                if (param.Iddpadetdduk != 0)
                                {
                                    _uow.DpadetdRepo.UpdateNilaiInduk(param.Iddpadetdduk, param.Iddpad);
                                }
                                decimal? totalRincian = await _uow.DpadetdRepo.getSubTotal(param.Iddpad);
                                await _uow.DpadRepo.UpdateNilai(param, totalRincian);
                            }
                        }
                        transaction.Commit();
                        DpadetdView view = _mapper.Map<DpadetdView>(param);
                        if (!String.IsNullOrEmpty(view.Idstdharga.ToString()) || view.Idstdharga != 0)
                        {
                            view.StandarHarga = await _uow.StdhargaRepo.Get(w => w.Idstdharga == view.Idstdharga);
                        }
                        if (!String.IsNullOrEmpty(view.Idsatuan.ToString()) || view.Idsatuan != 0)
                        {
                            view.Jsatuan = await _uow.JsatuanRepo.Get(w => w.Idsatuan == view.Idsatuan);
                        }
                        return Ok(view);
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddpadet}")]
        public async Task<IActionResult> Delete(long Iddpadet)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetd data = await _uow.DpadetdRepo.Get(w => w.Iddpadetd == Iddpadet);
                if (data == null)
                    return NotFound("Data tidak ditemukan");
                List<Dpadetd> list_child = await _uow.DpadetdRepo.Gets(w => w.Iddpadetdduk == Iddpadet);
                if (list_child.Count() > 0)
                    return BadRequest("Gagal Hapus, Data Memiliki Detail");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.DpadetdRepo.Remove(data);
                        if (await _uow.Complete())
                        {
                            if (data.Iddpadetdduk != 0)
                            {
                                _uow.DpadetdRepo.UpdateNilaiInduk(data.Iddpadetdduk, data.Iddpad);
                            }
                            decimal? totalRincian = await _uow.DpadetdRepo.getSubTotal(data.Iddpad);
                            await _uow.DpadRepo.UpdateNilai(data, totalRincian);
                        }
                        transaction.Commit();
                        return Ok();
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}