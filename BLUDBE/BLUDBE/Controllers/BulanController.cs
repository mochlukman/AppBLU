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

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BulanController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BulanController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Bulan> datas = await _uow.BulanRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbulan}")]
        public async Task<IActionResult> Get(int Idbulan)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bulan data = await _uow.BulanRepo.Get(w => w.Idbulan == Idbulan);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BulanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bulan post = _mapper.Map<Bulan>(param);
                Bulan insert = await _uow.BulanRepo.Add(post);
                if (insert != null)
                    return Ok(insert);
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] BulanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bulan post = _mapper.Map<Bulan>(param);
                bool update = await _uow.BulanRepo.Update(post);
                if (update)
                    return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbulan}")]
        public async Task<IActionResult> Delete(int Idbulan)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bulan data = await _uow.BulanRepo.Get(w => w.Idbulan == Idbulan);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.BulanRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
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