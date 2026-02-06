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

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpadController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpadController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]DpaRekGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DpadView> datas = await _uow.DpadRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DparUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpad post = _mapper.Map<Dpad>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.DpadRepo.Update(post);
                if (update)
                    return Ok(await _uow.DpadRepo.ViewData(post.Iddpad));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddpad}")]
        public async Task<IActionResult> Delete(long Iddpad)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpad data = await _uow.DpadRepo.Get(w => w.Iddpad == Iddpad);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long bln = await _uow.DpablndRepo.Count(w => w.Iddpad == data.Iddpad);
                long dana = await _uow.DpadanadRepo.Count(w => w.Iddpad == data.Iddpad);
                long det = await _uow.DpadetdRepo.Count(w => w.Iddpad == data.Iddpad);
                if(bln > 0 || dana > 0 || det > 0)
                {
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                }
                _uow.DpadRepo.Remove(data);
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