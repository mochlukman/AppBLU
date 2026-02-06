using System;
using System.Collections.Generic;
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
    public class GolonganController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public GolonganController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] GolonganGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Golongan> data = await _uow.GolonganRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idgol}")]
        public async Task<IActionResult> Get(long Idgol)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Golongan data = await _uow.GolonganRepo.ViewData(Idgol);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<GolonganGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Golongan> data = await _uow.GolonganRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GolonganPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Golongan post = _mapper.Map<Golongan>(param);
            try
            {
                Golongan insert = await _uow.GolonganRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.GolonganRepo.ViewData(insert.Idgol));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] GolonganPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Golongan post = _mapper.Map<Golongan>(param);
            try
            {
                bool update = await _uow.GolonganRepo.Update(post);
                if (update)
                    return Ok(await _uow.GolonganRepo.ViewData(post.Idgol));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idgol}")]
        public async Task<IActionResult> Delete(long Idgol)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Golongan data = await _uow.GolonganRepo.ViewData(Idgol);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                long pegawai = await _uow.PegawaiRepo.Count(w => w.Kdgol.Trim() == data.Kdgol.Trim());
                if (pegawai > 0)
                    return BadRequest("Hapus Gagal, Data Telah Digunakan");
                _uow.GolonganRepo.Remove(data);
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