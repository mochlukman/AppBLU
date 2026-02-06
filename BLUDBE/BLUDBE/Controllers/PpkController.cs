using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PpkController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public PpkController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] PpkGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Ppk> data = await _uow.PpkRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idppk}")]
        public async Task<IActionResult> Get(long Idppk)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Ppk data = await _uow.PpkRepo.ViewData(Idppk);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<PpkGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Ppk> data = await _uow.PpkRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PpkPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Ppk post = _mapper.Map<Ppk>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            bool check = await _uow.PpkRepo.isExist(w => w.Idpeg == param.Idpeg && w.Idunit == param.Idunit);
            if (check)
            {
                return BadRequest("Duplikat Data");
            }
            try
            {
                Ppk insert = await _uow.PpkRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.PpkRepo.ViewData(insert.Idppk));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PpkPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Ppk post = _mapper.Map<Ppk>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            Ppk old = await _uow.PpkRepo.Get(w => w.Idpeg == param.Idpeg && w.Idunit == param.Idunit);
            if(old.Idppk != param.Idppk)
            {
                if(old.Idpeg == post.Idpeg && old.Idunit == param.Idunit)
                {
                    return BadRequest("Duplikat Data");
                }
            }
            try
            {
                bool update = await _uow.PpkRepo.Update(post);
                if (update)
                    return Ok(await _uow.PpkRepo.ViewData(post.Idppk));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idppk}")]
        public async Task<IActionResult> Delete(long Idppk)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Ppk data = await _uow.PpkRepo.ViewData(Idppk);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.PpkRepo.Remove(data);
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