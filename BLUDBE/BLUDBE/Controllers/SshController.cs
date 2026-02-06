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
    public class SshController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public SshController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet("Paging")]
        public async Task<IActionResult> Paging([FromQuery] PrimengTableParam<SshGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Ssh> data = await _uow.SshRepo.Paging(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]string Kelompok,
            [FromQuery]long Idrek)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Ssh> data = await _uow.SshRepo.ViewDatas(Kelompok, Idrek);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idssh}")]
        public async Task<IActionResult> Get(long Idssh)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Ssh data = await _uow.SshRepo.ViewData(Idssh);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SshPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Ssh post = _mapper.Map<Ssh>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            try
            {
                Ssh insert = await _uow.SshRepo.Add(post);
                if(insert != null)
                {
                    return Ok(await _uow.SshRepo.ViewData(insert.Idssh));
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
        public async Task<IActionResult> Put([FromBody] SshPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Ssh post = _mapper.Map<Ssh>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatedate = DateTime.Now;
            try
            {
                bool update = await _uow.SshRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.SshRepo.ViewData(post.Idssh));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idssh}")]
        public async Task<IActionResult> Delete(long Idssh)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Ssh data = await _uow.SshRepo.ViewData(Idssh);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SshRepo.Remove(data);
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