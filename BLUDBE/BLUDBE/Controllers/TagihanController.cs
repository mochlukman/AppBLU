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
    public class TagihanController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public TagihanController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging/list")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<TagihanGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Tagihan> data = await _uow.TagihanRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("list")]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idkeg,
            [FromQuery]string Kdstatus,
            [FromQuery]bool Isvalid
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<TagihanView> views = await _uow.TagihanRepo.ViewDatas(Idunit, Idkeg, Kdstatus, Isvalid);
                return Ok(views);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-kontrak")]
        public async Task<IActionResult> GetByKontrak(
            [FromQuery][Required]long Idkontrak,
            [FromQuery]long Idunit,
            [FromQuery]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tagihan data = new Tagihan();
                if(Idunit != 0 && Idkeg != 0)
                {
                    data = await _uow.TagihanRepo.Get(w => w.Idkontrak == Idkontrak && w.Idunit == Idunit && w.Idkeg == Idkeg);
                } else
                {
                    data = await _uow.TagihanRepo.Get(w => w.Idkontrak == Idkontrak);
                }
                
                TagihanView view = _mapper.Map<TagihanView>(data);
                if(view != null)
                {
                    if (!String.IsNullOrEmpty(view.Idkontrak.ToString()) || view.Idkontrak != 0)
                    {
                        view.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == view.Idkontrak);
                    }
                    if (!String.IsNullOrEmpty(view.Kdstatus))
                    {
                        view.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == view.Kdstatus.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idkeg.ToString()) || view.Idkeg != 0)
                    {
                        view.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == view.Idkeg);
                    }
                }
                return Ok(view);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TagihanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tagihan post = _mapper.Map<Tagihan>(param);
            param.Datecreate = DateTime.Now;
            Tagihan checkNotagihan = await _uow.TagihanRepo.Get(w => w.Notagihan.Trim() == post.Notagihan.Trim());
            if (checkNotagihan != null) return BadRequest("No Tagihan Sudah Digunakan");
            try
            {
                Tagihan Insert = await _uow.TagihanRepo.Add(post);
                if(Insert != null)
                {
                    TagihanView view = _mapper.Map<TagihanView>(Insert);
                    if (!String.IsNullOrEmpty(view.Idkontrak.ToString()) || view.Idkontrak != 0)
                    {
                        view.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == view.Idkontrak);
                    }
                    if (!String.IsNullOrEmpty(view.Kdstatus))
                    {
                        view.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == view.Kdstatus.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idkeg.ToString()) || view.Idkeg != 0)
                    {
                        view.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == view.Idkeg);
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]TagihanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tagihan post = _mapper.Map<Tagihan>(param);
            param.Dateupdate = DateTime.Now;
            Tagihan checkNotagihan = await _uow.TagihanRepo.Get(w => w.Notagihan.Trim() == post.Notagihan.Trim());
            if (checkNotagihan != null)
            {
                if(checkNotagihan.Idtagihan != post.Idtagihan)
                {
                    return BadRequest("No Tagihan Sudah Digunakan");
                }
            }
            try
            {
                bool Update = await _uow.TagihanRepo.Update(post);
                if (Update)
                {
                    TagihanView view = _mapper.Map<TagihanView>(post);
                    if (!String.IsNullOrEmpty(view.Idkontrak.ToString()) || view.Idkontrak != 0)
                    {
                        view.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == view.Idkontrak);
                    }
                    if (!String.IsNullOrEmpty(view.Kdstatus))
                    {
                        view.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == view.Kdstatus.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idkeg.ToString()) || view.Idkeg != 0)
                    {
                        view.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == view.Idkeg);
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
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody]TagihanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tagihan post = _mapper.Map<Tagihan>(param);
            param.Dateupdate = DateTime.Now;
            param.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool Update = await _uow.TagihanRepo.Pengesahan(post);
                if (Update)
                {
                    TagihanView view = _mapper.Map<TagihanView>(post);
                    if (!String.IsNullOrEmpty(view.Idkontrak.ToString()) || view.Idkontrak != 0)
                    {
                        view.IdkontrakNavigation = await _uow.KontrakRepo.Get(w => w.Idkontrak == view.Idkontrak);
                    }
                    if (!String.IsNullOrEmpty(view.Kdstatus))
                    {
                        view.KdstatusNavigation = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == view.Kdstatus.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idkeg.ToString()) || view.Idkeg != 0)
                    {
                        view.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == view.Idkeg);
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
        [HttpDelete("{Idtagihan}")]
        public async Task<IActionResult> Delete(long Idtagihan)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Tagihandet> tagihandets = await _uow.TagihandetRepo.Gets(w => w.Idtagihan == Idtagihan);
            if (tagihandets.Count() > 0)
                return BadRequest("Hapus Gagal, Data memiliki detail");
            try
            {
                Tagihan data = await _uow.TagihanRepo.Get(w => w.Idtagihan == Idtagihan);
                _uow.TagihanRepo.Remove(data);
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