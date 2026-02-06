using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.Pergeseran
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkbankController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _BludContext;
        public BkbankController(IUow uow, IMapper mapper, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]BkbankGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bkbank> datas = await _uow.BkbankRepo.ViewDatas(param);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbkbank}")]
        public async Task<IActionResult> Get(long Idbkbank)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkbank data = await _uow.BkbankRepo.ViewData(Idbkbank);
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
                List<Bkubank> bkubank = await _uow.BkubankRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend);
                List<long> ids = new List<long>();
                if (bkubank.Count() > 0)
                {
                    bkubank.ForEach(f =>
                    {
                        ids.Add(f.Idbkbank);
                    });
                }
                List<Bkbank> datas = await _uow.BkbankRepo.Gets(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend && !ids.Contains(w.Idbkbank));
                List<Bkbank> views = new List<Bkbank>();
                if (datas.Count() > 0)
                {
                    foreach (var d in datas)
                    {
                        Bkbank data = await _uow.BkbankRepo.ViewData(d.Idbkbank);
                        if (data != null)
                        {
                            views.Add(data);
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbank post = _mapper.Map<Bkbank>(param);
            try
            {
                using (var trans = await _BludContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Bkbank insert = await _uow.BkbankRepo.Add(post);
                        Bkbankdet bkbankdet = new Bkbankdet
                        {
                            Idbkbank = insert.Idbkbank,
                            Idnojetra = insert.Kdstatus.Trim() == "33" || insert.Kdstatus.Trim() == "85" ? 31 : 32,
                            Nilai = 0
                        };
                        await _uow.BkbankdetRepo.Add(bkbankdet);
                        trans.Commit();
                        return Ok(await _uow.BkbankRepo.ViewData(insert.Idbkbank));
                    }
                    catch (Exception e)
                    {
                        trans.Rollback();
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]BkbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbank post = _mapper.Map<Bkbank>(param);
            try
            {
                bool update = await _uow.BkbankRepo.Update(post);
                if (update) return Ok(await _uow.BkbankRepo.ViewData(post.Idbkbank));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Verifikasi([FromBody]BkbankPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbank post = _mapper.Map<Bkbank>(param);
            try
            {
                if (post.Tglvalid < post.Tglbuku)
                {
                    return BadRequest("Tanggal Pengesahan tidak boleh mendahului tanggal Transaksi Pergeseran!");
                }
                bool update = await _uow.BkbankRepo.Pengesahan(post);
                if (update) return Ok(await _uow.BkbankRepo.ViewData(post.Idbkbank));
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idbkbank}")]
        public async Task<IActionResult> Delete(long Idbkbank)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkbank data = await _uow.BkbankRepo.Get(w => w.Idbkbank == Idbkbank);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                List<Bkbankdet> bkbankdets = await _uow.BkbankdetRepo.Gets(w => w.Idbkbank == data.Idbkbank);
                if (bkbankdets.Count() > 0) return BadRequest("Hapus Gagal, Data Telah Digunakan Pada Rincian");
                _uow.BkbankRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
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