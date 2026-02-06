using System;
using System.Collections.Generic;
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
    public class DaftbarangController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public DaftbarangController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<DaftbarangGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftbarang> data = await _uow.DaftbarangRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbrg}")]
        public async Task<IActionResult> Get(long Idbrg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftbarang data = await _uow.DaftbarangRepo.ViewData(Idbrg);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]DaftbarangGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftbarang> data = await _uow.DaftbarangRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DaftbarangPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftbarang post = _mapper.Map<Daftbarang>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            try
            {
                Daftbarang insert = await _uow.DaftbarangRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] DaftbarangPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftbarang post = _mapper.Map<Daftbarang>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatedate = DateTime.Now;
            try
            {
               bool update = await _uow.DaftbarangRepo.Update(post);
                if (update)
                {
                    return Ok(await _uow.DaftbarangRepo.ViewData(post.Idbrg));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbrg}")]
        public async Task<IActionResult> Delete(long Idbrg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftbarang data = await _uow.DaftbarangRepo.Get(w => w.Idbrg == Idbrg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.DaftbarangRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
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