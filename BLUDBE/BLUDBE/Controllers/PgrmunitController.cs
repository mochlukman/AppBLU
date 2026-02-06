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

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PgrmunitController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public PgrmunitController(IMapper mapper, IUow uow)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required] PgrmunitGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<PgrmunitView> data = await _uow.PgrmunitRepo.ViewDatas(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idpgrmunit}")]
        public async Task<IActionResult> Get(long Idpgrmunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PgrmunitView data = await _uow.PgrmunitRepo.ViewData(Idpgrmunit);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<PgrmunitGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<PgrmunitView> data = await _uow.PgrmunitRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PgrmunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pgrmunit post = _mapper.Map<Pgrmunit>(param);
            post.Datecreate = DateTime.Now;
            bool exist = await _uow.PgrmunitRepo.isExist(w => w.Idunit == post.Idunit && w.Kdtahap.Trim() == post.Kdtahap && w.Idprgrm == post.Idprgrm);
            if (exist)
                return BadRequest("Gagal Input, Data Telah Ditambahakan");
            try
            {
                Pgrmunit Insert = await _uow.PgrmunitRepo.Add(post);
                if (Insert != null)
                    return Ok(await _uow.PgrmunitRepo.ViewData(Insert.Idpgrmunit));
                return BadRequest("Gagal Input");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]PgrmunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Pgrmunit post = _mapper.Map<Pgrmunit>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool Update = await _uow.PgrmunitRepo.Update(post);
                if (Update)
                {
                    return Ok(await _uow.PgrmunitRepo.ViewData(post.Idpgrmunit));
                }
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpgrmunit}")]
        public async Task<IActionResult> Delete(long Idpgrmunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Pgrmunit data = await _uow.PgrmunitRepo.Get(w => w.Idpgrmunit == Idpgrmunit);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                List<Kegunit> kegunits = await _uow.KegunitRepo.Gets(w => w.Idpgrmunit == Idpgrmunit);
                if (kegunits.Count() > 0)
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                _uow.PgrmunitRepo.Remove(data);
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