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
    public class PaguskpdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public PaguskpdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery]PaguskpdGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<PaguskpdView> data = await _uow.PaguskpdRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpaguskpd}")]
        public async Task<IActionResult> Get(long Idpaguskpd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PaguskpdView data = await _uow.PaguskpdRepo.ViewData(Idpaguskpd);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<PaguskpdGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<PaguskpdView> data = await _uow.PaguskpdRepo.Paging(param);
                return Ok(data);
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PaguskpdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (param.Nilai == null) param.Nilai = 0;
            if (param.Nilaiup == null) param.Nilaiup = 0;
            Paguskpd post = _mapper.Map<Paguskpd>(param);
            post.Datecreate = DateTime.Now;
            Tahap tahap = await _uow.TahapRepo.Get(w => w.Kdtahap.Trim() == param.Kdtahap.Trim());
            Paguskpd check = await _uow.PaguskpdRepo.Get(w => w.Idunit == param.Idunit && w.Kdtahap.Trim() == param.Kdtahap.Trim());
            string NamaTahap = !String.IsNullOrEmpty(tahap.Uraian) ? tahap.Uraian.Trim() : "";
            if(check != null)
            {
                return BadRequest("Unit Pada Tahap " + NamaTahap + " Telah Diinput");
            }
            if(post.Nilai == 0)
            {
                return BadRequest("Pagu Unit Tidak Boleh Kosong");
            }
            float persen = 75;
            float nilai = (float)post.Nilai;
            float nilaiup = (float)post.Nilaiup;
            float jumlahPersenNilai = (persen / 100) * nilai;
            if(nilaiup > jumlahPersenNilai)
            {
                return BadRequest("Nilai UP Maksimal 75% Dari Dari Pagu Unit");
            }
            try
            {
                Paguskpd insert = await _uow.PaguskpdRepo.Add(post);
                if (insert != null)
                {
                    PaguskpdView view = await _uow.PaguskpdRepo.ViewData(insert.Idpaguskpd);
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
        public async Task<IActionResult> Put([FromBody]PaguskpdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (param.Nilai == null) param.Nilai = 0;
            if (param.Nilaiup == null) param.Nilaiup = 0;
            Paguskpd post = _mapper.Map<Paguskpd>(param);
            post.Dateupdate = DateTime.Now;
            if (post.Nilai == 0)
            {
                return BadRequest("Pagu Unit Tidak Boleh Kosong");
            }
            float persen = 75;
            float nilai = (float)post.Nilai;
            float nilaiup = (float)post.Nilaiup;
            float jumlahPersenNilai = (persen / 100) * nilai;
            if (nilaiup > jumlahPersenNilai)
            {
                return BadRequest("Nilai UP Maksimal 75% Dari Dari Pagu Unit");
            }
            try
            {
                bool update = await _uow.PaguskpdRepo.Update(post);
                if (update)
                {
                    PaguskpdView view = await _uow.PaguskpdRepo.ViewData(post.Idpaguskpd);
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
        [HttpDelete("{Idpaguskpd}")]
        public async Task<IActionResult> Delete(long Idpaguskpd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Paguskpd data = await _uow.PaguskpdRepo.Get(w => w.Idpaguskpd == Idpaguskpd);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.PaguskpdRepo.Remove(data);
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