using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers.SPJ
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpjapbddetController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpjapbddetController(IUow uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]SpjapbddetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spjapbddet> data = await _uow.SpjapbddetRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery][Required]PrimengTableParam<SpjapbddetGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Spjapbddet> data = await _uow.SpjapbddetRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SpjapbddetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjapbddet post = _mapper.Map<Spjapbddet>(param);
            post.Datecreate = DateTime.Now;
            try
            {
                Spjapbddet Insert = await _uow.SpjapbddetRepo.Add(post);
                if (Insert != null)
                {
                    return Ok(await _uow.SpjapbddetRepo.ViewData(Insert.Idspjapbddet));
                }
                return BadRequest("Insert Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SpjapbddetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Spjapbddet post = _mapper.Map<Spjapbddet>(param);
            try
            {
                bool update = await _uow.SpjapbddetRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SpjapbddetRepo.ViewData(post.Idspjapbddet));
                }
                return BadRequest("Update Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspjapbddet}")]
        public async Task<IActionResult> Delete(long Idspjapbddet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spjapbddet data = await _uow.SpjapbddetRepo.Get(w => w.Idspjapbddet == Idspjapbddet);
                if (data == null) return BadRequest("Dat Tidak Tersedia");
                _uow.SpjapbddetRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}