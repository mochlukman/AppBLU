using System;
using System.Collections.Generic;
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
    public class PotonganController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public PotonganController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] PotonganGet param)
        {
            try
            {
                List<Potongan> data = await _uow.PotonganRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpot}")]
        public async Task<IActionResult> Get(long Idpot)
        {
            try
            {
                Potongan data = await _uow.PotonganRepo.ViewData(Idpot);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PotonganPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Potongan post = _mapper.Map<Potongan>(param);
            post.Datecreate = DateTime.Now;
            try
            {
                Potongan insert = await _uow.PotonganRepo.Add(post);
                if (insert != null)
                    return Ok(insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]PotonganUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Potongan post = _mapper.Map<Potongan>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.PotonganRepo.Update(post);
                if (update)
                    return Ok(await _uow.PotonganRepo.ViewData(post.Idpot));
                return BadRequest("Input Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpot}")]
        public async Task<IActionResult> Delete(long Idpot)
        {
            try
            {
                Potongan data = await _uow.PotonganRepo.Get(Idpot);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.PotonganRepo.Remove(data);
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