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
    public class JbayarController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JbayarController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets()
        {
            try
            {
                List<Jbayar> datas = await _uow.JbayarRepo.Gets();
                return Ok(datas);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idjbayar}")]
        public async Task<IActionResult> Get(long Idjbayar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbayar data = await _uow.JbayarRepo.Get(w => w.Idjbayar == Idjbayar);
                return Ok(data);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]JbayarPost param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            Jbayar post = _mapper.Map<Jbayar>(param);
            post.Datecreate = DateTime.Now;
            bool checkKode = await _uow.JbayarRepo.isExist(w => w.Kdbayar == post.Kdbayar);
            if (checkKode) return BadRequest("Kode Bayar Sudah Digunakanan");
            try
            {
                Jbayar insert = await _uow.JbayarRepo.Add(post);
                if (insert != null)
                    return Ok(insert);
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JbayarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jbayar post = _mapper.Map<Jbayar>(param);
            post.Dateupdate = DateTime.Now;
            Jbayar oldData = await _uow.JbayarRepo.Get(w => w.Kdbayar == post.Kdbayar);
            if(oldData.Idjbayar != post.Idjbayar)
            {
                if(oldData.Kdbayar == post.Kdbayar) return BadRequest("Kode Bayar Sudah Digunakanan");
            }
            try
            {
                Jbayar insert = await _uow.JbayarRepo.Add(post);
                if (insert != null)
                    return Ok(insert);
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idjbayar}")]
        public async Task<IActionResult> Delete(long Idjbayar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jbayar data = await _uow.JbayarRepo.Get(w => w.Idjbayar == Idjbayar);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JbayarRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}