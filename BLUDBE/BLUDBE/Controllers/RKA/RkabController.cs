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

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class RkabController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public RkabController(IUow uow, IMapper mapper)
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
                PrimengTableResult<RkabView> data = await _uow.RkabRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkabPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<RkabView> views = new List<RkabView> { };
            try
            {
                if (param.Idrek.Count() > 0)
                {
                    for (var i = 0; i < param.Idrek.Count(); i++)
                    {
                        Rkab insert = await _uow.RkabRepo.Add(new Rkab
                        {
                            Idunit = param.Idunit,
                            Kdtahap = param.Kdtahap,
                            Idrek = param.Idrek[i],
                            Trkr = param.Trkr,
                            Nilai = 0,
                            Createdby = User.Claims.FirstOrDefault().Value,
                            Createddate = DateTime.Now
                        });
                        if (insert != null)
                        {
                            views.Add(await _uow.RkabRepo.ViewData(insert.Idrkab));
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
        public async Task<IActionResult> Put([FromBody]RkabUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkab Post = _mapper.Map<Rkab>(param);
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            try
            {
                bool Update = await _uow.RkabRepo.Update(Post);
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
        [HttpDelete("{Idrkab}")]
        public async Task<IActionResult> Delete(long Idrkab)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Rkab data = await _uow.RkabRepo.Get(w => w.Idrkab == Idrkab);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long rkadetbs = await _uow.RkadetbRepo.Count(w => w.Idrkab == Idrkab);
                long rkadanabs = await _uow.RkadanabRepo.Count(w => w.Idrkab == Idrkab);
                if (rkadetbs > 0 || rkadanabs > 0)
                {
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                }
                _uow.RkabRepo.Remove(data);
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