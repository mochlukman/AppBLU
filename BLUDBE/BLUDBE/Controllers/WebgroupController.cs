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
    public class WebgroupController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public WebgroupController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Webgroup> datas = await _uow.WebgroupRepo.Gets();
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("Groupid")]
        public async Task<IActionResult> Get(long Groupid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Webgroup data = await _uow.WebgroupRepo.Get(w => w.Groupid == Groupid);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]WebgroupPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Webgroup post = _mapper.Map<Webgroup>(param);
            try
            {
                Webgroup insert = await _uow.WebgroupRepo.Add(post);
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
        public async Task<IActionResult> Put([FromBody]WebgroupPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Webgroup post = _mapper.Map<Webgroup>(param);
            try
            {
                bool update = await _uow.WebgroupRepo.Update(post);
                if (update)
                    return Ok(post);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Groupid}")]
        public async Task<IActionResult> Delete(long Groupid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Webgroup data = await _uow.WebgroupRepo.Get(w => w.Groupid == Groupid);
            if (data == null) return BadRequest("Data Tidak Ditemukan");
            try
            {
                List<Webotor> webotors = await _uow.WebotorRepo.Gets(w => w.Groupid == Groupid);
                List<Webuser> webusers = await _uow.WebuserRepo.Gets(w => w.Groupid == Groupid);
                if (webotors.Count() > 0 || webusers.Count() > 0) return BadRequest("Gagal Hapus, Group Telah Digunakan");
                _uow.WebgroupRepo.Remove(data);
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