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
    public class DaftdokController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DaftdokController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Daftdok> datas = await _uow.DaftdokRepo.Gets();
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Iddaftdok}")]
        public async Task<IActionResult> Get(long Iddaftdok)
        {
            try
            {
                Daftdok data = await _uow.DaftdokRepo.Get(w => w.Iddaftdok == Iddaftdok);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DaftdokPost param)
        {
            if (ModelState.IsValid) return BadRequest(ModelState);
            Daftdok post = _mapper.Map<Daftdok>(param);
            post.Datecreate = DateTime.Now;
            Daftdok checkkode = await _uow.DaftdokRepo.Get(w => w.Kddok.Trim() == post.Kddok.Trim());
            if (checkkode != null) return BadRequest("Kode Dokumen Sudah Digunakan");
            try
            {
                Daftdok insert = await _uow.DaftdokRepo.Add(post);
                if(insert != null)
                {
                    return Ok(insert);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]DaftdokPost param)
        {
            if (ModelState.IsValid) return BadRequest(ModelState);
            Daftdok post = _mapper.Map<Daftdok>(param);
            post.Datecreate = DateTime.Now;
            Daftdok checkkode = await _uow.DaftdokRepo.Get(w => w.Kddok.Trim() == post.Kddok.Trim());
            if (checkkode != null)
            {
                if(checkkode.Iddaftdok != post.Iddaftdok)
                {
                    return BadRequest("Kode Dokumen Sudah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.DaftdokRepo.Update(post);
                if (update)
                {
                    return Ok(post);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddaftdok}")]
        public async Task<IActionResult> Delete(long Iddaftdok)
        {
            try
            {
                Daftdok data = await _uow.DaftdokRepo.Get(w => w.Iddaftdok == Iddaftdok);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.DaftdokRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}