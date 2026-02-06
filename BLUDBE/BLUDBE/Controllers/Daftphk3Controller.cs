using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Helper;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Daftphk3Controller : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public Daftphk3Controller(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] long Idunit
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftphk3> datas = await _uow.Daftphk3Repo.viewDatas(Idunit);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idphk3}")]
        public async Task<IActionResult> Get(long Idphk3)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftphk3 data = await _uow.Daftphk3Repo.Get(w => w.Idphk3 == Idphk3);
                if (data != null)
                {
                    if (!String.IsNullOrEmpty(data.Idbank.ToString()) || data.Idbank != 0)
                    {
                        data.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == data.Idbank);
                    }
                    if (!String.IsNullOrEmpty(data.Idjusaha.ToString()) || data.Idjusaha != 0)
                    {
                        data.IdjusahaNavigation = await _uow.JusahaRepo.Get(w => w.Idjusaha == data.Idjusaha);
                    }
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Daftphk3Post param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            //if (!String.IsNullOrEmpty(param.Npwp)) param.Npwp = param.Npwp.Trim();
            //param.Npwp = Npwp.RemoveSpecialCharacters(param.Npwp);
            //if (param.Npwp.Length != 15)
            //    return BadRequest("Jumlah No NPWP Harus 15 digit");
            //param.Npwp = Npwp.Format(param.Npwp);
            try
            {
                //Daftphk3 cekNpwp = await _uow.Daftphk3Repo.Get(w => w.Npwp.Trim() == param.Npwp);
                //if (cekNpwp != null) return BadRequest("NPWP sudah Digunakan");
                Daftphk3 post = _mapper.Map<Daftphk3>(param);
                post.Datecreate = DateTime.Now;
                Daftphk3 Insert = await _uow.Daftphk3Repo.Add(post);
                if(Insert != null)
                {
                    if(!String.IsNullOrEmpty(Insert.Idbank.ToString()) || Insert.Idbank != 0)
                        {
                        Insert.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == Insert.Idbank);
                    }
                    if (!String.IsNullOrEmpty(Insert.Idjusaha.ToString()) || Insert.Idjusaha != 0)
                    {
                        Insert.IdjusahaNavigation = await _uow.JusahaRepo.Get(w => w.Idjusaha == Insert.Idjusaha);
                    }
                    return Ok(Insert);
                }
                return BadRequest("Input Gagal");
            }catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Daftphk3Post param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            //if (!String.IsNullOrEmpty(param.Npwp)) param.Npwp = param.Npwp.Trim();
            //param.Npwp = Npwp.RemoveSpecialCharacters(param.Npwp);
            //if (param.Npwp.Length != 15)
            //    return BadRequest("Jumlah No NPWP Harus 15 digit");
            //param.Npwp = Npwp.Format(param.Npwp);
            try
            {
                //Daftphk3 cekNpwp = await _uow.Daftphk3Repo.Get(w => w.Npwp.Trim() == param.Npwp);
                //if (cekNpwp != null)
                //{
                //    if(cekNpwp.Idphk3 != param.Idphk3)
                //    {
                //        return BadRequest("NPWP sudah Digunakan");
                //    }
                //}
                Daftphk3 post = _mapper.Map<Daftphk3>(param);
                post.Dateupdate = DateTime.Now;
                bool update = await _uow.Daftphk3Repo.Update(post);
                if (update)
                {
                    if (!String.IsNullOrEmpty(post.Idbank.ToString()) || post.Idbank != 0)
                    {
                        post.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == post.Idbank);
                    }
                    if (!String.IsNullOrEmpty(post.Idjusaha.ToString()) || post.Idjusaha != 0)
                    {
                        post.IdjusahaNavigation = await _uow.JusahaRepo.Get(w => w.Idjusaha == post.Idjusaha);
                    }
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
        [HttpDelete("{Idphk3}")]
        public async Task<IActionResult> Delete(long Idphk3)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftphk3 data = await _uow.Daftphk3Repo.Get(w => w.Idphk3 == Idphk3);
                if (data == null) return BadRequest(ModelState);
                long kontrak = await _uow.KontrakRepo.Count(w => w.Idphk3 == Idphk3);
                long bpk = await _uow.BpkRepo.Count(w => w.Idphk3 == Idphk3);
                long spm = await _uow.SpmRepo.Count(w => w.Idphk3 == Idphk3);
                long spp = await _uow.SppRepo.Count(w => w.Idphk3 == Idphk3);
                if(kontrak > 0 || bpk > 0 || spm > 0 || spp > 0)
                {
                    return BadRequest("Gagal Hapus, Data Telah Digunakan");
                }
                _uow.Daftphk3Repo.Remove(data);
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