using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StattrsController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public StattrsController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Stattrs> datas = await _uow.StattrsRepo.Gets();
                return Ok(datas);
            } catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Kdstatus}")]
        public async Task<IActionResult> Get(string Kdstatus)
        {
            string[] kode = Kdstatus.Split(",");
            try
            {
                Stattrs datas = await _uow.StattrsRepo.Get(w => kode.Contains(w.Kdstatus.Trim()));
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("listKode")]
        public async Task<IActionResult> GetByListKode([FromQuery][Required]string Kdstatus)
        {
            string[] kode = Kdstatus.Split(",");
            try
            {
                List<Stattrs> datas = await _uow.StattrsRepo.Gets(w => kode.Contains(w.Kdstatus.Trim()));
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StattrsPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stattrs post = _mapper.Map<Stattrs>(param);
            Stattrs checkKode = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == param.Kdstatus.Trim());
            if (checkKode != null)
                return BadRequest("Kode Status Sudah Digunakan");
            try
            {
                Stattrs Insert = await _uow.StattrsRepo.Add(post);
                if (Insert != null)
                    return Ok(Insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] StattrsPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Stattrs post = _mapper.Map<Stattrs>(param);
            try
            {
                bool Update = await _uow.StattrsRepo.Update(post);
                if (Update)
                    return Ok(post);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Kdstatus}")]
        public async Task<IActionResult> Delete(string Kdstatus)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Stattrs data = await _uow.StattrsRepo.Get(w => w.Kdstatus.Trim() == Kdstatus.Trim());
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.StattrsRepo.Remove(data);
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