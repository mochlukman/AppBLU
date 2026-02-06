using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.STS
{
    [Route("api/[controller]")]
    [ApiController]
    public class StsdettController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public StsdettController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idsts)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Stsdett> datas = await _uow.StsdettRepo.ViewDatas(Idsts);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstsdett}")]
        public async Task<IActionResult> Get(long Idstsdett)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdett data = await _uow.StsdettRepo.ViewData(Idstsdett);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]StsdettPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdett post = _mapper.Map<Stsdett>(param);
            post.Idnojetra = 31;
            post.Datecreate = DateTime.Now;
            try
            {
                Stsdett insert = await _uow.StsdettRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.StsdettRepo.ViewData(insert.Idstsdett));
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]StsdettUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stsdett post = _mapper.Map<Stsdett>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.StsdettRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.StsdettRepo.ViewData(post.Idstsdett));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idstsdett}")]
        public async Task<IActionResult> Delete(long Idstsdett)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stsdett data = await _uow.StsdettRepo.Get(w => w.Idstsdett == Idstsdett);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.StsdettRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}