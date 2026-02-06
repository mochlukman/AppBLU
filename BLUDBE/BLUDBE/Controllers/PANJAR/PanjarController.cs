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

namespace BLUDBE.Controllers.PANJAR
{
    [Route("api/[controller]")]
    [ApiController]
    public class PanjarController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public PanjarController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] PanjarGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Panjar> datas = await _uow.PanjarRepo.ViewDatas(param);
                return Ok(datas);

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("Idpanjar")]
        public async Task<IActionResult> Get(long Idpanjar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Panjar data = await _uow.PanjarRepo.ViewData(Idpanjar);
                return Ok(data);

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("For-Bku")]
        public async Task<IActionResult> GetForBku([FromQuery] BkuParamRef param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkupanjar> bku = await _uow.BkupanjarRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<long> ids = new List<long>();
                if (bku.Count() > 0)
                {
                    bku.ForEach(f =>
                    {
                        ids.Add(f.Idpanjar);
                    });
                }
                /*List<Panjar> datas = await _uow.PanjarRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !ids.Contains(w.Idpanjar) && !String.IsNullOrEmpty(w.Tglvalid.ToString()));*/
                List<Panjar> datas = await _uow.PanjarRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<Panjar> views = new List<Panjar>();
                if (datas.Count() > 0)
                {
                    foreach (var i in datas)
                    {
                        Panjar data = await _uow.PanjarRepo.ViewData(i.Idpanjar);
                        views.Add(data);
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PanjarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjar post = _mapper.Map<Panjar>(param);
            post.Datecreate = DateTime.Now;
            if (String.IsNullOrEmpty(param.Tglpanjar.ToString()))
            {
                return BadRequest("Tanggal Harus Diisi");
            }
            bool checkNoPanjar = await _uow.PanjarRepo.isExist(w => w.Nopanjar.Trim() == param.Nopanjar.Trim());
            if (checkNoPanjar) return BadRequest("No Panjar Telah Digunakan");
            try {
                Panjar insert = await _uow.PanjarRepo.Add(post);
                if(insert != null)
                {
                    Panjar view = await _uow.PanjarRepo.ViewData(insert.Idpanjar);
                    return Ok(view);
                }
                return BadRequest("Input Data Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PanjarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjar post = _mapper.Map<Panjar>(param);
            post.Dateupdate = DateTime.Now;
            if (String.IsNullOrEmpty(param.Tglpanjar.ToString()))
            {
                return BadRequest("Tanggal Harus Diisi");
            }
            Panjar old = await _uow.PanjarRepo.Get(w => w.Nopanjar.Trim() == param.Nopanjar.Trim());
            if(old != null)
            {
                if (old.Idpanjar != param.Idpanjar)
                {
                    return BadRequest("No Panjar Telah Digunakan");
                }
            }
            try
            {
                bool Update = await _uow.PanjarRepo.Update(post);
                if (Update)
                {
                    Panjar view = await _uow.PanjarRepo.ViewData(param.Idpanjar);
                    return Ok(view);
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengesahan([FromBody] PanjarPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Panjar post = _mapper.Map<Panjar>(param);
            if (!String.IsNullOrEmpty(param.Valid.ToString()))
            {
                if (String.IsNullOrEmpty(param.Tglvalid.ToString()))
                {
                    return BadRequest("Tanggal Pengesahan Harus Diisi");
                }
            }
            post.Validby = User.Claims.FirstOrDefault().Value;
            post.Dateupdate = DateTime.Now;
            try
            {
                if (post.Tglvalid < post.Tglpanjar)
                {
                    return BadRequest("Tanggal Pengesahan tidak boleh mendahului tanggal Transaksi Panjar!");
                }
                bool Pengesahan = await _uow.PanjarRepo.Pengesahan(post);
                if (Pengesahan)
                {
                    Panjar view = await _uow.PanjarRepo.ViewData(param.Idpanjar);
                    return Ok(view);
                }
                return BadRequest("Pengesahan Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idpanjar}")]
        public async Task<IActionResult> Delete(long Idpanjar)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Panjar data = await _uow.PanjarRepo.Get(w => w.Idpanjar == Idpanjar);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Panjardet> panjardets = await _uow.PanjardetRepo.Gets(w => w.Idpanjar == data.Idpanjar);
                if (panjardets.Count() > 0) return BadRequest("Gagal Hapus, Panjar Memiliki Detail");
                List<Bkupanjar> bkupanjars = await _uow.BkupanjarRepo.Gets(w => w.Idpanjar == data.Idpanjar);
                if (bkupanjars.Count() > 0) return BadRequest("Gagal Hapus, Panjar Telah Digunakan pada BKU");
                _uow.PanjarRepo.Remove(data);
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
        [HttpPost("new-nomor-urut")]
        public async Task<IActionResult> NewNomorUrut([FromBody]PanjarGetUrutPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                return Ok(new
                {
                    nomor = await _uow.PanjarRepo.NewNomorUrut(param)
                });
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}