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
    public class AtasbendController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public AtasbendController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("{Idpa}")]
        public async Task<IActionResult> Get(long Idpa)
        {
            try
            {
                Atasbend data = await _uow.AtasbendRepo.ViewData(Idpa);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Atasbend> data = await _uow.AtasbendRepo.ViewDatas();
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(AtasbendPost param)
        {
            Atasbend post = _mapper.Map<Atasbend>(param);
            post.Createdby = User.Claims.FirstOrDefault().Value;
            post.Createddate = DateTime.Now;
            try
            {
                bool exist = await _uow.AtasbendRepo.isExist(e => e.Idunit == param.Idunit);
                if (exist)
                {
                    return BadRequest("Data Unit Organisasi Telah Ditambahkan");
                }
                Atasbend insert = await _uow.AtasbendRepo.Add(post);
                if (insert != null)
                {
                    Atasbend data = await _uow.AtasbendRepo.ViewData(insert.Idpa);
                    return Ok(data);
                }
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put(AtasbendUpdate param)
        {
            Atasbend post = _mapper.Map<Atasbend>(param);
            post.Updateby = User.Claims.FirstOrDefault().Value;
            post.Updatetime = DateTime.Now;
            try
            {
                bool exist = await _uow.AtasbendRepo.isExist(e => e.Idunit == param.Idunit && e.Idpa != post.Idpa);
                if (exist)
                {
                    return BadRequest("Data Unit Organisasi Telah Ditambahkan");
                }
                bool update = await _uow.AtasbendRepo.Update(post);
                if (update)
                {
                    Atasbend data = await _uow.AtasbendRepo.ViewData(post.Idpa);
                    return Ok(data);
                }
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpa}")]
        public async Task<IActionResult> Delete(long Idpa)
        {
            try
            {
                Atasbend data = await _uow.AtasbendRepo.Get(w => w.Idpa == Idpa);
                if(data == null)
                {
                    return BadRequest("Data Tidak Ditemukan");
                }
                _uow.AtasbendRepo.Remove(data);
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