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

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkadController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkadController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkaGlobalGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<RkadView> data = await _uow.RkadRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkadPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<RkadView> views = new List<RkadView> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Rkad insert = await _uow.RkadRepo.Add(new Rkad
                        {
                            Idunit = param.Idunit,
                            Kdtahap = param.Kdtahap,
                            Idrek = param.Idrek[i],
                            Nilai = 0,
                            Createdby = User.Claims.FirstOrDefault().Value,
                            Createddate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.RkadRepo.ViewData(insert.Idrkad));
                        }
                    }
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]RkadUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkad Post = _mapper.Map<Rkad>(param);
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            try
            {
                bool Update = await _uow.RkadRepo.Update(Post);
                if (Update)
                    return Ok();
                return BadRequest("Update Nilai Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrkad}")]
        public async Task<IActionResult> Delete(long Idrkad)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkad data = await _uow.RkadRepo.Get(w => w.Idrkad == Idrkad);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long rkadetds = await _uow.RkadetdRepo.Count(w => w.Idrkad == Idrkad);
                long rkadanads = await _uow.RkadanadRepo.Count(w => w.Idrkad == Idrkad);
                if(rkadetds > 0 || rkadanads > 0)
                {
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                }
                _uow.RkadRepo.Remove(data);
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