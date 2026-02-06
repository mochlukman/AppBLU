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
    public class DpadetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _BludContext;
        public DpadetrController(IUow uow, IMapper mapper, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpar
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpadetr> datas = await _uow.DpadetrRepo.Gets(w => w.Iddpar == Iddpar);
                List<DpadetrView> views = _mapper.Map<List<DpadetrView>>(datas);
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
            [FromBody][Required] DpadetrPost post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetr param = _mapper.Map<Dpadetr>(post);
                param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Kdjabar = param.Kdjabar.Trim();
                param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Datecreate = DateTime.Now;
                if (!string.IsNullOrEmpty(param.Iddpadetrduk.ToString()) || param.Iddpadetrduk != 0)
                {
                    string kode_induk = await _uow.DpadetrRepo.GetKodeInduk((long)param.Iddpadetrduk, post.Iddpar);
                    if (!String.IsNullOrEmpty(kode_induk))
                        param.Kdjabar = kode_induk + param.Kdjabar;
                }
                if (String.IsNullOrEmpty(param.Iddpadetrduk.ToString()) || param.Iddpadetrduk == 0)
                {
                    param.Iddpadetrduk = 0;
                }
                string titik = param.Kdjabar.Substring((param.Kdjabar.Length - 1));
                if (titik != ".")
                    return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
                Dpadetr cek_kode = await _uow.DpadetrRepo.Get(w =>
                    w.Iddpar == param.Iddpar &&
                    w.Kdjabar.Trim() == param.Kdjabar.Trim());
                if (cek_kode != null)
                    return BadRequest("Kode Jabar Sudah Digunakan");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Dpadetr insert = await _uow.DpadetrRepo.Add(param);
                        if (insert != null)
                        {
                            if (insert.Iddpadetrduk != 0)
                            {
                                _uow.DpadetrRepo.UpdateType((long)insert.Iddpadetrduk, insert.Iddpar, "H");
                                _uow.DpadetrRepo.UpdateNilaiInduk(insert.Iddpadetrduk, insert.Iddpar);
                            }
                            decimal? totalRincian = await _uow.DpadetrRepo.getSubTotal(insert.Iddpar);
                            await _uow.DparRepo.UpdateNilai(insert, totalRincian);
                            transaction.Commit();
                        }
                        DpadetrView view = _mapper.Map<DpadetrView>(insert);
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
        [HttpPut]
        public async Task<IActionResult> Put(
            [FromBody][Required] DpadetrPost post
            )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetr param = _mapper.Map<Dpadetr>(post);
                if (param.Type.Trim() == "D")
                {
                    param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                    param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                }
                else
                {
                    Dpadetr old = await _uow.DpadetrRepo.Get(w => w.Iddpadetr == param.Iddpadetr);
                    param.Subtotal = old.Subtotal;
                }
                param.Dateupdate = DateTime.Now;
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.DpadetrRepo.Update(param);
                        if (Update)
                        {
                            if (param.Type.Trim() == "D")
                            {
                                if (param.Iddpadetrduk != 0)
                                {
                                    _uow.DpadetrRepo.UpdateNilaiInduk(param.Iddpadetrduk, param.Iddpar);
                                }
                                decimal? totalRincian = await _uow.DpadetrRepo.getSubTotal(param.Iddpar);
                                await _uow.DparRepo.UpdateNilai(param, totalRincian);
                            }
                        }
                        transaction.Commit();
                        DpadetrView view = _mapper.Map<DpadetrView>(param);
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
                Dpadetr data = await _uow.DpadetrRepo.Get(w => w.Iddpadetr == Iddpadet);
                if (data == null)
                    return NotFound("Data tidak ditemukan");
                List<Dpadetr> list_child = await _uow.DpadetrRepo.Gets(w => w.Iddpadetrduk == Iddpadet);
                if (list_child.Count() > 0)
                    return BadRequest("Gagal Hapus, Data Memiliki Detail");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.DpadetrRepo.Remove(data);
                        if (await _uow.Complete())
                        {
                            if (data.Iddpadetrduk != 0)
                            {
                                _uow.DpadetrRepo.UpdateNilaiInduk(data.Iddpadetrduk, data.Iddpar);
                            }
                            decimal? totalRincian = await _uow.DpadetrRepo.getSubTotal(data.Iddpar);
                            await _uow.DparRepo.UpdateNilai(data, totalRincian);
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