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
    public class DaftunitController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DaftunitController(IUow uow, IMapper  mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]string Level
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string[] LevelSplit = Level.Split(',');
            int[] Levels = LevelSplit.Select(int.Parse).ToArray();
            try
            {
                IEnumerable<Daftunit> datas = await _uow.DaftunitRepo.Gets(w => Levels.Contains(w.Kdlevel));
                datas = datas.AsQueryable();
                datas = datas.OrderBy(o => o.Kdunit);
                List<DaftunitView> views = _mapper.Map<List<DaftunitView>>(datas);
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<DaftunitGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<DaftunitView> datas = await _uow.DaftunitRepo.Paging(param);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("Search")]
        public async Task<IActionResult> Search(
            [FromQuery][Required]string Level,
            [FromQuery]string Keyword
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string[] LevelSplit = Level.Split(',');
            int[] Levels = LevelSplit.Select(int.Parse).ToArray();
            try
            {
                IEnumerable<Daftunit> datas = await _uow.DaftunitRepo.Gets(w => Levels.Contains(w.Kdlevel) && (w.Kdunit.Contains(Keyword) || w.Nmunit.Contains(Keyword)));
                datas = datas.AsQueryable();
                datas = datas.OrderBy(o => o.Kdunit);
                List<DaftunitView> views = _mapper.Map<List<DaftunitView>>(datas);
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{idunit}")]
        public async Task<IActionResult> Get(long idunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftunit data = await _uow.DaftunitRepo.Get(w => w.Idunit == idunit);
                DaftunitView view = _mapper.Map<DaftunitView>(data);
                return Ok(view);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-dpa")]
        public async Task<IActionResult> GetsByDpa(
            [FromQuery][Required]string Level
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            string[] LevelSplit = Level.Split(',');
            int[] Levels = LevelSplit.Select(int.Parse).ToArray();
            List<long> idunits = await _uow.DpaRepo.GetIdunits();
            try
            {
                IEnumerable<Daftunit> datas = await _uow.DaftunitRepo.Gets(w => Levels.Contains(w.Kdlevel) && idunits.Contains(w.Idunit));
                datas = datas.AsQueryable();
                datas = datas.OrderBy(o => o.Kdunit);
                List<DaftunitView> views = _mapper.Map<List<DaftunitView>>(datas);
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DaftunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftunit post = _mapper.Map<Daftunit>(param);
            post.Datecreate = DateTime.Now;
            if (post.Kdunit.Contains("x"))
            {
                return BadRequest("Kode Unit Tidak Valid");
            }
            bool check_kode = await _uow.DaftunitRepo.isExist(w => w.Kdunit.Trim() == post.Kdunit.Trim());
            if (check_kode) return BadRequest("Kode Unit Telah digunakan");
            try
            {
                Daftunit insert = await _uow.DaftunitRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.DaftunitRepo.ViewData(insert.Idunit));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]DaftunitPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftunit post = _mapper.Map<Daftunit>(param);
            post.Dateupdate = DateTime.Now;
            Daftunit check_kode = await _uow.DaftunitRepo.Get(w => w.Kdunit.Trim() == param.Kdunit.Trim());
            if(check_kode.Idunit != post.Idunit)
            {
                return BadRequest("Kode Unit Telah Digunakan");
            }
            try
            {
                bool update = await _uow.DaftunitRepo.Update(post);
                if (update)
                    return Ok(await _uow.DaftunitRepo.ViewData(post.Idunit));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idunit}")]
        public async Task<IActionResult> Delete(long Idunit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftunit data = await _uow.DaftunitRepo.Get(w => w.Idunit == Idunit);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                if (data.Type.Trim() != "D") return BadRequest("Hanya Data Detail Yang Dapat Dihapus");
                _uow.DaftunitRepo.Remove(data);
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