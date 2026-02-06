using System;
using System.Collections.Generic;
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
    public class StrurekController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public StrurekController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Strurek> datas = await _uow.StrurekRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idstrurek}")]
        public async Task<IActionResult> GetsByid(long Idstrurek)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Strurek data = await _uow.StrurekRepo.Get(w => w.Idstrurek == Idstrurek);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StrurekPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Strurek post = _mapper.Map<Strurek>(param);
            try
            {
                Strurek insert = await _uow.StrurekRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody] StrurekPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Strurek post = _mapper.Map<Strurek>(param);
            try
            {
                bool update = await _uow.StrurekRepo.Update(post);
                if (update)
                {
                    return Ok(post);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idstrurek}")]
        public async Task<IActionResult> Delete(long Idstrurek)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Strurek data = await _uow.StrurekRepo.Get(w => w.Idstrurek == Idstrurek);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.StrurekRepo.Remove(data);
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