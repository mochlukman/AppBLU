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
    public class MkegiatanController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public MkegiatanController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("tree-by-dpa")]
        public async Task<IActionResult> TreeByDpa(
            [FromQuery][Required] long Idunit,
            [FromQuery][Required] string Kdtahap
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<LookupTreeDto> datas = await _uow.MkegiatanRepo.TreeByDpa(Idunit, Kdtahap);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("tree-by-kegunit")]
        public async Task<IActionResult> Tree(
            [FromQuery][Required] long Idunit,
            [FromQuery] string Kdtahap,
            [FromQuery] string type // isikan 'kegiatan' jika sampai kegiatan, dan 'subkegiatan' jika sampai subkegiatan
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<LookupTree> datas = await _uow.KegunitRepo.Tree(Idunit, Kdtahap, type);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery]string Keyword)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Mkegiatan> datas = await _uow.MkegiatanRepo.Search(Keyword);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idkeg}")]
        public async Task<IActionResult> Get(long Idkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Mkegiatan datas = await _uow.MkegiatanRepo.ViewData(Idkeg);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] MkegiatanGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Mkegiatan> datas = await _uow.MkegiatanRepo.ViewDatas(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery] PrimengTableParam<MkegiatanGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Mkegiatan> datas = await _uow.MkegiatanRepo.Paging(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]MkegiatanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Mkegiatan post = _mapper.Map<Mkegiatan>(param);
            post.Datecreate = DateTime.Now;
            if (post.Nukeg.Contains("x"))
            {
                return BadRequest("Kode Tidak Valid");
            }
            bool check_kode = await _uow.MkegiatanRepo.isExist(w => w.Idprgrm == param.Idprgrm && w.Nukeg.Trim() == param.Nukeg.Trim());
            if (check_kode) return BadRequest("Kode Telah Digunakan");
            try
            {
                Mkegiatan insert = await _uow.MkegiatanRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.MkegiatanRepo.ViewData(insert.Idkeg));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]MkegiatanPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Mkegiatan post = _mapper.Map<Mkegiatan>(param);
            post.Dateupdate = DateTime.Now;
            if (post.Nukeg.Contains("x"))
            {
                return BadRequest("Kode Tidak Valid");
            }
            Mkegiatan check_kode = await _uow.MkegiatanRepo.Get(w => w.Idprgrm == param.Idprgrm && w.Nukeg.Trim() == param.Nukeg.Trim());
            if (check_kode != null)
            {
                if(check_kode.Idkeg != post.Idkeg)
                {
                    return BadRequest("Kode Telah Digunakan");
                }
            } 
            try
            {
                bool update = await _uow.MkegiatanRepo.Update(post);
                if (update)
                    return Ok(await _uow.MkegiatanRepo.ViewData(post.Idkeg));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idkeg}")]
        public async Task<IActionResult> Delete(long Idkeg)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Mkegiatan data = await _uow.MkegiatanRepo.Get(w => w.Idkeg == Idkeg);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long child = await _uow.MkegiatanRepo.Count(w => w.Idkeginduk == data.Idkeg);
                if (child > 0) return BadRequest("Hapus Gagal, Data Memiliki Sub Kegiatan");
                _uow.MkegiatanRepo.Remove(data);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest("Hapus Gagal");
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}