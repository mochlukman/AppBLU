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
    public class KinkegController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public KinkegController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idkegunit,
            [FromQuery][Required]string Kdjkk
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<KinkegView> data = await _uow.KinkegRepo.ViewDatas(Idkegunit, Kdjkk);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idkinkeg}")]
        public async Task<IActionResult> Get(long Idkinkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                KinkegView data = await _uow.KinkegRepo.ViewData(Idkinkeg);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> paging([FromQuery]PrimengTableParam<KinkegGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<KinkegView> data = await _uow.KinkegRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]KinkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kinkeg Post = _mapper.Map<Kinkeg>(param);
            Post.Datecreate = DateTime.Now;
            bool check = await _uow.KinkegRepo.isExist(w => w.Idkegunit == param.Idkegunit && w.Kdjkk.Trim() == param.Kdjkk.Trim() && w.Nomor.Trim() == param.Nomor.Trim());
            if (check)
                return BadRequest("Nomor Telah Digunakan");
            try
            {
                Kinkeg Insert = await _uow.KinkegRepo.Add(Post);
                if (Insert != null)
                    return Ok(await _uow.KinkegRepo.ViewData(Post.Idkinkeg));
                return BadRequest("Tambah Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]KinkegPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kinkeg Post = _mapper.Map<Kinkeg>(param);
            Post.Datecreate = DateTime.Now;
            try
            {
                bool Update = await _uow.KinkegRepo.Update(Post);
                if (Update)
                    return Ok(await _uow.KinkegRepo.ViewData(Post.Idkinkeg));
                return BadRequest("Update Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idkinkeg}")]
        public async Task<IActionResult> Delete(long Idkinkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kinkeg data = await _uow.KinkegRepo.Get(w => w.Idkinkeg ==  Idkinkeg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.KinkegRepo.Remove(data);
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