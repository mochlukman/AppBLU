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
    public class JbendController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JbendController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jbend> datas = await _uow.JbendRepo.Gets();
                if(datas.Count() > 0)
                {
                    foreach(var d in datas)
                    {
                        if (!String.IsNullOrEmpty(d.Idrek.ToString()))
                        {
                            d.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == d.Idrek);
                        }
                    }
                }
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("byRek")]
        public async Task<IActionResult> GetsByRek([FromQuery][Required]long Idrek)
        {
            try
            {
                List<Jbend> datas = await _uow.JbendRepo.Gets(w => w.Idrek == Idrek);
                if (datas.Count() > 0)
                {
                    foreach (var d in datas)
                    {
                        if (!String.IsNullOrEmpty(d.Idrek.ToString()))
                        {
                            d.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == d.Idrek);
                        }
                    }
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]JbendPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jbend post = _mapper.Map<Jbend>(param);
            try
            {
                Jbend insert = await _uow.JbendRepo.Add(post);
                if (insert != null)
                {
                    if (!String.IsNullOrEmpty(insert.Idrek.ToString()))
                    {
                        insert.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == insert.Idrek);
                    }
                    return Ok(insert);
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
        public async Task<IActionResult> Put([FromBody]JbendPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jbend post = _mapper.Map<Jbend>(param);
            try
            {
                bool update = await _uow.JbendRepo.Update(post);
                if (update)
                {
                    if (!String.IsNullOrEmpty(post.Idrek.ToString()))
                    {
                        post.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == post.Idrek);
                    }
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
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]JbendPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbend data = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == param.Jnsbend.Trim() && w.Idrek == param.Idrek);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.JbendRepo.Remove(data);
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