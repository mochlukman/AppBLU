using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    public class KontrakdetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public KontrakdetrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gest([FromQuery][Required]long Idkontrak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Kontrakdetr> datas = await _uow.KontrakdetrRepo.Gets(w => w.Idkontrak == Idkontrak);
                List<KontrakdetrView> views = _mapper.Map<List<KontrakdetrView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var i in views)
                    {
                        if (!String.IsNullOrEmpty(i.Idrek.ToString()) || i.Idrek != 0)
                        {
                            i.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == i.Idrek);
                        }
                        if(!String.IsNullOrEmpty(i.Idjtermorlun.ToString()) || i.Idjtermorlun != 0)
                        {
                            i.IdjtermorlunNavigation = await _uow.JtermorlunRepo.Get(w => w.Idjtermorlun == i.Idjtermorlun);
                        }
                        if(!String.IsNullOrEmpty(i.Idbulan.ToString()) || i.Idbulan != 0)
                        {
                            i.Bulan = await _uow.BulanRepo.Get(w => w.Idbulan == i.Idbulan);
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
        public async Task<IActionResult> Post([FromBody]KontrakdetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kontrakdetr post = _mapper.Map<Kontrakdetr>(param);
            List<Kontrakdetr> checkRek = await _uow.KontrakdetrRepo.Gets(w => w.Idkontrak == param.Idkontrak && w.Idrek == param.Idrek);
            if (checkRek.Count() > 0)
                return BadRequest("Rekening Telah Ditambahkan");
            post.Datecreate = DateTime.Now;
            try
            {
                Kontrakdetr Insert = await _uow.KontrakdetrRepo.Add(post);
                if (Insert != null)
                {
                    decimal? newTotal = await _uow.KontrakdetrRepo.getTotalNilaiByIdKontrak(Insert.Idkontrak);
                    await _uow.KontrakRepo.UpdateNilai(Insert.Idkontrak, newTotal);
                    KontrakdetrView view = _mapper.Map<KontrakdetrView>(Insert);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    if (!String.IsNullOrEmpty(view.Idjtermorlun.ToString()) || view.Idjtermorlun != 0)
                    {
                        view.IdjtermorlunNavigation = await _uow.JtermorlunRepo.Get(w => w.Idjtermorlun == view.Idjtermorlun);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan.ToString()) || view.Idbulan != 0)
                    {
                        view.Bulan = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan);
                    }
                    view.TotalNilai = newTotal;
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
        public async Task<IActionResult> Put([FromBody]KontrakdetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kontrakdetr post = _mapper.Map<Kontrakdetr>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.KontrakdetrRepo.Update(post);
                if (Update)
                {
                    decimal? newTotal = await _uow.KontrakdetrRepo.getTotalNilaiByIdKontrak(post.Idkontrak);
                    await _uow.KontrakRepo.UpdateNilai(post.Idkontrak, newTotal);
                    KontrakdetrView view = _mapper.Map<KontrakdetrView>(post);
                    if (!String.IsNullOrEmpty(view.Idrek.ToString()) || view.Idrek != 0)
                    {
                        view.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == view.Idrek);
                    }
                    if (!String.IsNullOrEmpty(view.Idjtermorlun.ToString()) || view.Idjtermorlun != 0)
                    {
                        view.IdjtermorlunNavigation = await _uow.JtermorlunRepo.Get(w => w.Idjtermorlun == view.Idjtermorlun);
                    }
                    if (!String.IsNullOrEmpty(view.Idbulan.ToString()) || view.Idbulan != 0)
                    {
                        view.Bulan = await _uow.BulanRepo.Get(w => w.Idbulan == view.Idbulan);
                    }
                    view.TotalNilai = newTotal;
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
        [HttpDelete("{Iddetkontrak}")]
        public async Task<IActionResult> Delete(long Iddetkontrak)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kontrakdetr data = await _uow.KontrakdetrRepo.Get(w => w.Iddetkontrak == Iddetkontrak);
                _uow.KontrakdetrRepo.Remove(data);
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