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

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpadanarController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpadanarController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpar
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpadanar> datas = await _uow.DpadanarRepo.Gets(w => w.Iddpar == Iddpar);
                if (datas.Count() > 0)
                {
                    foreach (var d in datas)
                    {
                        if(!String.IsNullOrEmpty(d.Idjdana.ToString()) || d.Idjdana != 0)
                        {
                            d.IdjdanaNavigation = await _uow.JdanaRepo.Get(w => w.Idjdana == d.Idjdana);
                        }
                    }
                }
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Iddpadanar}")]
        public async Task<IActionResult> Get(long Iddpadanar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpadanar data = await _uow.DpadanarRepo.Get(w => w.Iddpadanar == Iddpadanar);
                if (!String.IsNullOrEmpty(data.Idjdana.ToString()) || data.Idjdana != 0)
                {
                    data.IdjdanaNavigation = await _uow.JdanaRepo.Get(w => w.Idjdana == data.Idjdana);
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DpadanarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpadanar post = _mapper.Map<Dpadanar>(param);
            post.Datecreate = DateTime.Now;
            try
            {
                Dpadanar insert = await _uow.DpadanarRepo.Add(post);
                if(insert != null)
                {
                    if (!String.IsNullOrEmpty(insert.Idjdana.ToString()) || insert.Idjdana != 0)
                    {
                        insert.IdjdanaNavigation = await _uow.JdanaRepo.Get(w => w.Idjdana == insert.Idjdana);
                    }
                }
                return Ok(insert);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]DpadanarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpadanar post = _mapper.Map<Dpadanar>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.DpadanarRepo.Update(post);
                if (update)
                {
                    if (!String.IsNullOrEmpty(post.Idjdana.ToString()) || post.Idjdana != 0)
                    {
                        post.IdjdanaNavigation = await _uow.JdanaRepo.Get(w => w.Idjdana == post.Idjdana);
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
        [HttpDelete("{Iddpadanar}")]
        public async Task<IActionResult> Delete(long Iddpadanar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpadanar data = await _uow.DpadanarRepo.Get(w => w.Iddpadanar == Iddpadanar);
                if (data != null)
                {
                    _uow.DpadanarRepo.Remove(data);
                    if (await _uow.Complete())
                        return Ok();
                }
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