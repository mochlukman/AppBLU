using System;
using System.Collections.Generic;
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
    public class MpgrmController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public MpgrmController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("tree-view")]
        public async Task<IActionResult> TreeView([FromQuery]long Idurus)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<LookupTree> data = await _uow.MpgrmRepo.Tree(Idurus);
                return Ok(data);
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<MpgrmGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Mpgrm> datas = await _uow.MpgrmRepo.Paging(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MpgrmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Mpgrm post = _mapper.Map<Mpgrm>(param);
            post.Datecreate = DateTime.Now;
            bool check_kode = await _uow.MpgrmRepo.isExist(w => w.Idurus == param.Idurus && w.Nuprgrm.Trim() == param.Nuprgrm.Trim());
            if (check_kode) return BadRequest("Nomor Program Telah Digunakan");
            try
            {
                Mpgrm insert = await _uow.MpgrmRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.MpgrmRepo.ViewData(insert.Idprgrm));
                return BadRequest("Gagal Input");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] MpgrmPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Mpgrm post = _mapper.Map<Mpgrm>(param);
            post.Dateupdate = DateTime.Now;
            Mpgrm check_kode = await _uow.MpgrmRepo.Get(w => w.Idurus == param.Idurus && w.Nuprgrm.Trim() == param.Nuprgrm.Trim());
            if(check_kode != null)
            {
                if(check_kode.Idprgrm != post.Idprgrm)
                {
                    return BadRequest("Nomor Program Telah Digunakan");
                }
            }
            try
            {
                bool update = await _uow.MpgrmRepo.Update(post);
                if (update)
                    return Ok(await _uow.MpgrmRepo.ViewData(post.Idprgrm));
                return BadRequest("Gagal Update");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idprgrm}")]
        public async Task<IActionResult> Delete(long Idprgrm)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Mpgrm data = await _uow.MpgrmRepo.Get(w => w.Idprgrm == Idprgrm);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long mkegiatans = await _uow.MkegiatanRepo.Count(w => w.Idprgrm == data.Idprgrm);
                if (mkegiatans > 0) return BadRequest("Gagal Hapus, Data Telah Digunakan");
                _uow.MpgrmRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}