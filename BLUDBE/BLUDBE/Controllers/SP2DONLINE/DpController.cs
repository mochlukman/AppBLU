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

namespace BLUDBE.Controllers.SP2DONLINE
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public DpController(IMapper mapper, IUow uow)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("GenerateNo")]
        public async Task<IActionResult> GenerateNo()
        {
            try
            {
                string no = await _uow.DpRepo.GenerateNo();
                return Ok(new { no });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] PrimengTableParam<DpGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Dp> data = await _uow.DpRepo.Paging(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Iddp}")]
        public async Task<IActionResult> Get(long Iddp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dp data = await _uow.DpRepo.Get(w => w.Iddp == Iddp);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dp post = _mapper.Map<Dp>(param);
            post.Datecreate = DateTime.Now;
            bool exits_no = await _uow.DpRepo.isExist(w => w.Nodp.Trim() == param.Nodp.Trim());
            if (exits_no) return BadRequest("No DP Telah Digunakan");
            try
            {
                Dp Insert = await _uow.DpRepo.Add(post);
                if(Insert != null)
                {
                    return Ok(await _uow.DpRepo.Get(w => w.Iddp == Insert.Iddp));
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
        public async Task<IActionResult> Put([FromBody]DpPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dp post = _mapper.Map<Dp>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.DpRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.DpRepo.Get(w => w.Iddp == post.Iddp));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddp}")]
        public async Task<IActionResult> Delete(long Iddp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dp data = await _uow.DpRepo.Get(w => w.Iddp == Iddp);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Dpdet> dpdets = await _uow.DpdetRepo.Gets(w => w.Iddp == data.Iddp);
                if (dpdets.Count() > 0) return BadRequest("Gagal hapus, Data sudah digunakan");
                _uow.DpRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}