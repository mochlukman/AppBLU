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
    public class DpadetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _BludContext;
        public DpadetbController(IUow uow, IMapper mapper, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpab
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpadetb> datas = await _uow.DpadetbRepo.Gets(w => w.Iddpab == Iddpab);
                List<DpadetbView> views = _mapper.Map<List<DpadetbView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if(!String.IsNullOrEmpty(v.Idstdharga.ToString()) || v.Idstdharga != 0)
                        {
                            v.StandarHarga = await _uow.StdhargaRepo.Get(w => w.Idstdharga == v.Idstdharga);
                        }
                        if(!String.IsNullOrEmpty(v.Idsatuan.ToString()) || v.Idsatuan != 0)
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
            [FromBody][Required] DpadetbPost post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetb param = _mapper.Map<Dpadetb>(post);
                param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Kdjabar = param.Kdjabar.Trim();
                param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                param.Datecreate = DateTime.Now;
                if (!string.IsNullOrEmpty(param.Iddpadetbduk.ToString()) || param.Iddpadetbduk != 0)
                {
                    string kode_induk = await _uow.DpadetbRepo.GetKodeInduk((long)param.Iddpadetbduk, post.Iddpab);
                    if (!String.IsNullOrEmpty(kode_induk))
                        param.Kdjabar = kode_induk + param.Kdjabar;
                }
                if (String.IsNullOrEmpty(param.Iddpadetbduk.ToString()) || param.Iddpadetbduk == 0)
                {
                    param.Iddpadetbduk = 0;
                }
                string titik = param.Kdjabar.Substring((param.Kdjabar.Length - 1));
                if (titik != ".")
                    return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
                Dpadetb cek_kode = await _uow.DpadetbRepo.Get(w =>
                    w.Iddpab == param.Iddpab &&
                    w.Kdjabar.Trim() == param.Kdjabar.Trim());
                if (cek_kode != null)
                    return BadRequest("Kode Jabar Sudah Digunakan");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Dpadetb insert = await _uow.DpadetbRepo.Add(param);
                        if (insert != null)
                        {
                            if (insert.Iddpadetbduk != 0)
                            {
                                _uow.DpadetbRepo.UpdateType((long)insert.Iddpadetbduk, insert.Iddpab, "H");
                                _uow.DpadetbRepo.UpdateNilaiInduk(insert.Iddpadetbduk, insert.Iddpab);
                            }
                            decimal? totalRincian = await _uow.DpadetbRepo.getSubTotal(insert.Iddpab);
                            await _uow.DpabRepo.UpdateNilai(insert, totalRincian);
                            transaction.Commit();
                        }
                        DpadetbView view = _mapper.Map<DpadetbView>(insert);
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
            [FromBody][Required] DpadetbPost post
            )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Dpadetb param = _mapper.Map<Dpadetb>(post);
                if (param.Type.Trim() == "D")
                {
                    param.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                    param.Subtotal = param.Tarif * (decimal?)Ekpresi.ParseEkspresi(param.Ekspresi);
                }
                else
                {
                    Dpadetb old = await _uow.DpadetbRepo.Get(w => w.Iddpadetb == param.Iddpadetb);
                    param.Subtotal = old.Subtotal;
                }
                param.Dateupdate = DateTime.Now;
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.DpadetbRepo.Update(param);
                        if (Update)
                        {
                            if (param.Type.Trim() == "D")
                            {
                                if (param.Iddpadetbduk != 0)
                                {
                                    _uow.DpadetbRepo.UpdateNilaiInduk(param.Iddpadetbduk, param.Iddpab);
                                }
                                decimal? totalRincian = await _uow.DpadetbRepo.getSubTotal(param.Iddpab);
                                await _uow.DpabRepo.UpdateNilai(param, totalRincian);
                            }
                        }
                        transaction.Commit();
                        DpadetbView view = _mapper.Map<DpadetbView>(param);
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
                Dpadetb data = await _uow.DpadetbRepo.Get(w => w.Iddpadetb == Iddpadet);
                if (data == null)
                    return NotFound("Data tidak ditemukan");
                List<Dpadetb> list_child = await _uow.DpadetbRepo.Gets(w => w.Iddpadetbduk == Iddpadet);
                if (list_child.Count() > 0)
                    return BadRequest("Gagal Hapus, Data Memiliki Detail");
                using (var transaction = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.DpadetbRepo.Remove(data);
                        if (await _uow.Complete())
                        {
                            if (data.Iddpadetbduk != 0)
                            {
                                _uow.DpadetbRepo.UpdateNilaiInduk(data.Iddpadetbduk, data.Iddpab);
                            }
                            decimal? totalRincian = await _uow.DpadetbRepo.getSubTotal(data.Iddpab);
                            await _uow.DpabRepo.UpdateNilai(data, totalRincian);
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