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
    public class KegsbdanaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public KegsbdanaController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idkegunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<KegsbdanaView> data = await _uow.KegsbdanaRepo.ViewDatas(Idkegunit);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idkegdana}")]
        public async Task<IActionResult> Get(long Idkegdana)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                KegsbdanaView data = await _uow.KegsbdanaRepo.ViewData(Idkegdana);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]KegsbdanaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kegsbdana Post = _mapper.Map<Kegsbdana>(param);
            Post.Datecreate = DateTime.Now;
            try
            {
                Kegsbdana Insert = await _uow.KegsbdanaRepo.Add(Post);
                if (Insert != null)
                    return Ok(await _uow.KegsbdanaRepo.ViewData(Insert.Idkegdana));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]KegsbdanaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Kegsbdana Post = _mapper.Map<Kegsbdana>(param);
            Post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.KegsbdanaRepo.Update(Post);
                if (Update)
                    return Ok(await _uow.KegsbdanaRepo.ViewData(Post.Idkegdana));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idkegdana}")]
        public async Task<IActionResult> Delete(long Idkegdana)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Kegsbdana data = await _uow.KegsbdanaRepo.Get(w => w.Idkegdana ==Idkegdana);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.KegsbdanaRepo.Remove(data);
                if(await _uow.Complete())
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