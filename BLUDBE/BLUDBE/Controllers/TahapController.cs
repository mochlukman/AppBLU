using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class TahapController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public TahapController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<TahapGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Tahap> data = await _uow.TahapRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Tahap> datas = await _uow.TahapRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Kdtahap}")]
        public async Task<IActionResult> Get(string Kdtahap)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tahap data = await _uow.TahapRepo.Get(w => w.Kdtahap.Trim() == Kdtahap.Trim());
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("bykode")]
        public async Task<IActionResult> GetsByKode([FromQuery][Required]string Kode)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<string> kode_split = Kode.Split(",").ToList();
            try
            {
                List<Tahap> datas = await _uow.TahapRepo.Gets(w => kode_split.Contains(w.Kdtahap.Trim()));
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TahapPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tahap post = _mapper.Map<Tahap>(param);
            Tahap check = await _uow.TahapRepo.Get(w => w.Kdtahap.Trim() == post.Kdtahap.Trim());
            if (check != null) return BadRequest("Kode Tahap Sudah Digunakan");
            try
            {
                Tahap insert = await _uow.TahapRepo.Add(post);
                if(insert != null)
                {
                    return Ok(insert);
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
        public async Task<IActionResult> Put([FromBody]TahapPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Tahap post = _mapper.Map<Tahap>(param);
            try
            {
                bool update = await _uow.TahapRepo.Update(post);
                if (update)
                {
                    return Ok(post);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("Lock/{Kdtahap}")]
        public async Task<IActionResult> Lock(string Kdtahap)
        {
            try
            {
                var data = await _uow.TahapRepo.Get(w => w.Kdtahap.Trim() == Kdtahap.Trim());
                if (data == null) return BadRequest("Data tidak ditemukan");
                data.Lock = !data.Lock;
                bool kunci = await _uow.TahapRepo.Lock(data);
                if (kunci)
                {
                    return Ok(data);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Kdtahap}")]
        public async Task<IActionResult> Delete(string Kdtahap)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Tahap data = await _uow.TahapRepo.Get(w => w.Kdtahap.Trim() == Kdtahap.Trim());
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.TahapRepo.Remove(data);
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