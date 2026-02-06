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

namespace BLUDBE.Controllers.BPK
{
    [Route("api/[controller]")]
    [ApiController]
    public class BpkpajakstrdetController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public BpkpajakstrdetController(IMapper mapper, IUow uow)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]BpkpajakstrdetGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bpkpajakstrdet> data = await _uow.BpkpajakstrdetRepo.ViewDatas(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbpkpajakstrdet}")]
        public async Task<IActionResult> Get(long Idbpkpajakstrdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkpajakstrdet data = await _uow.BpkpajakstrdetRepo.ViewData(Idbpkpajakstrdet);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BpkpajakstrdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bpkpajakstrdet> Result = new List<Bpkpajakstrdet>();
                if (param.Idbpkpajak.Count() > 0)
                {
                    for (var i = 0; i < param.Idbpkpajak.Count(); i++)
                    {
                        Bpkpajakstrdet post = new Bpkpajakstrdet
                        {
                            Datecreate = DateTime.Now,
                            Idbpkpajakstr = param.Idbpkpajakstr,
                            Idbpkpajak = param.Idbpkpajak[i],
                            Nilai =  await _uow.BpkpajakdetRepo.sumNilai(param.Idbpkpajak[i])
                        };
                        bool check = await _uow.BpkpajakstrdetRepo.isExist(w => w.Idbpkpajakstr == param.Idbpkpajakstr && w.Idbpkpajak == param.Idbpkpajak[i]);
                        if (!check)
                        {
                            Bpkpajakstrdet insert = await _uow.BpkpajakstrdetRepo.Add(post);
                            if (insert != null)
                                Result.Add(await _uow.BpkpajakstrdetRepo.ViewData(insert.Idbpkpajakstrdet));
                        }
                    }
                }
                return Ok(Result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]BpkpajakstrdetUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bpkpajakstrdet post = _mapper.Map<Bpkpajakstrdet>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.BpkpajakstrdetRepo.Update(post);
                if (update)
                    return Ok(await _uow.BpkpajakstrdetRepo.ViewData(post.Idbpkpajakstrdet));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbpkpajakstrdet}")]
        public async Task<IActionResult> Delete(long Idbpkpajakstrdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bpkpajakstrdet data = await _uow.BpkpajakstrdetRepo.ViewData(Idbpkpajakstrdet);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.BpkpajakstrdetRepo.Remove(data);
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