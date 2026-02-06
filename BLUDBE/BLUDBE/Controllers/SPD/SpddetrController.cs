using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.SPD
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpddetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SpddetrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idspd,
            [FromQuery][Required]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spddetr> datas = await _uow.SpddetrRepo.Gets(w => w.Idspd == Idspd && w.Idkeg == Idkeg);
                List<SpddetrView> views = _mapper.Map<List<SpddetrView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
                        {
                            v.Rekening = await _uow.DaftrekeningRepo.Get(w => w.Idrek == v.Idrek);
                        }
                        if (!String.IsNullOrEmpty(v.Idkeg.ToString()) || v.Idkeg != 0)
                        {
                            v.Kegiatan = await _uow.MkegiatanRepo.Get(w => w.Idkeg == v.Idkeg);
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
        [HttpGet("treetable-from-subkegiatan")]
        public async Task<IActionResult> TreetableFromSubkegiatan(
            [FromQuery][Required]long Idspd
            )
        {
            try
            {
                List<SpddetrViewTreeRoot> data = await _uow.SpddetrRepo.TreetableFromSubkegiatan(Idspd);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("total-nilai")]
        public async Task<IActionResult> GetTotalNilai(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idspd
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                decimal? totalSpd = 0;
                Spd data = await _uow.SpdRepo.Get(w => w.Idspd == Idspd && w.Idunit == Idunit);
                if(data != null)
                {
                    totalSpd = await _uow.SpddetrRepo.TotalNilaiSpd(data.Idspd);
                }
                return Ok(new { totalSpd });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("update-nilai")]
        public async Task<IActionResult> PutNilai([FromBody]SpddetrUpdate param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                bool update = await _uow.SpddetrRepo.UpdateNilai(param.Idspddetr, param.Nilai, DateTime.Now);
                if (update)
                {
                    Spddetr data = await _uow.SpddetrRepo.Get(w => w.Idspddetr == param.Idspddetr);
                    return Ok(data);
                }
                return BadRequest("Gagal Update Nilai");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idspddetr}")]
        public async Task<IActionResult> Delete(long Idspddetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spddetr data = await _uow.SpddetrRepo.Get(w => w.Idspddetr == Idspddetr);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SpddetrRepo.Remove(data);
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