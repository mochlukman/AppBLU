using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class TahunController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly BludContext _BludContext;
        public TahunController(IUow uow, BludContext BludContext)
        {
            _uow = uow;
            _BludContext = BludContext;
        }
        // GET: api/Tahun
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Tahun> list = await _uow.TahunRepo.Gets();
                return Ok(list);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }

        }
        [HttpGet("tes-paging", Name = "tes Paging")]
        public async Task<IActionResult> GetPaging()
        {
            List<Tahun> tahuns = await _uow.TahunRepo.Gets();
            return Ok(tahuns);
        }
        [HttpGet("search", Name = "Cari_Tahun")]
        public async Task<IActionResult> Search([FromQuery] string Keyword)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var data = await _uow.TahunRepo.Search(Keyword);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        // GET: api/Tahun/5
        [HttpGet("{Kdtahun}", Name = "Tahun")]
        public async Task<IActionResult> Get(string Kdtahun)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Tahun tahun = await _uow.TahunRepo.Get(w => w.Kdtahun.Trim() == Kdtahun.Trim());
                return Ok(tahun);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }

        // POST: api/Tahun
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Tahun tahun)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                tahun.Kdtahun = await _uow.TahunRepo.GetKdtahun();
                Tahun Insert = await _uow.TahunRepo.Add(tahun);
                if (Insert != null)
                    return Ok(Insert);
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }

        }

        // PUT: api/Tahun/5
        [Authorize]
        [HttpPut("{Kdtahun}")]
        public async Task<IActionResult> Put(string Kdtahun, [FromQuery][Required] string Nmtahun)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Tahun tahun = await _uow.TahunRepo.Get(w => w.Kdtahun.Trim() == Kdtahun.Trim());
                if (tahun == null)
                    return NotFound("Data tidak ditemukan");
                tahun.Nmtahun = Nmtahun;
                if (await _uow.Complete())
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody][Required] List<string> Kdtahun)
        {
            try
            {
                //tes
                List<Tahun> tahuns = new List<Tahun>();
                if (Kdtahun.Count() > 0)
                {
                    foreach (var i in Kdtahun)
                    {
                        var data = await _uow.TahunRepo.Get(w => w.Kdtahun.Trim() == i.Trim());
                        if (data != null)
                            tahuns.Add(data);
                    }
                    _uow.TahunRepo.RemoveRange(tahuns);
                    if (await _uow.Complete())
                        return Ok();
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}