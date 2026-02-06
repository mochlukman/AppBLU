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

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkbkasController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkbkasController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery] long Idunit)
        {
            if(Idunit.ToString() == "0")
            {
                Idunit = await _uow.PemdaRepo.GetIdunit();
            }
            try
            {
                List<Bkbkas> datas = await _uow.BkbkasRepo.Gets(w => w.Idunit == Idunit);
                List<BkbkasView> views = _mapper.Map<List<BkbkasView>>(datas);
                if(views.Count() > 0)
                {
                    foreach(var v in views)
                    {
                        if(!String.IsNullOrEmpty(v.Idunit.ToString()) || v.Idunit != 0)
                        {
                            v.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == v.Idunit);
                        }
                        if (!String.IsNullOrEmpty(v.Idrek.ToString()) || v.Idrek != 0)
                        {
                            v.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == v.Idrek);
                        }
                        if (!String.IsNullOrEmpty(v.Idbank.ToString()) || v.Idbank != 0)
                        {
                            v.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == v.Idbank);
                        }
                    }
                }
                return Ok(views);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BkbkasPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbkas post = _mapper.Map<Bkbkas>(param);
            Bkbkas checkNo = await _uow.BkbkasRepo.Get(w => w.Nobbantu.Trim() == post.Nobbantu);
            if (checkNo != null) return BadRequest("Kode Telah Digunakan");
            try
            {
                Bkbkas insert = await _uow.BkbkasRepo.Add(post);
                if(insert != null)
                {
                    BkbkasView views = _mapper.Map<BkbkasView>(insert);
                    if (!String.IsNullOrEmpty(views.Idunit.ToString()) || views.Idunit != 0)
                    {
                        views.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == views.Idunit);
                    }
                    if (!String.IsNullOrEmpty(views.Idrek.ToString()) || views.Idrek != 0)
                    {
                        views.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == views.Idrek);
                    }
                    if (!String.IsNullOrEmpty(views.Idbank.ToString()) || views.Idbank != 0)
                    {
                        views.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == views.Idbank);
                    }
                    return Ok(views);
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
        public async Task<IActionResult> Put([FromBody]BkbkasPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Bkbkas post = _mapper.Map<Bkbkas>(param);
            try
            {
                bool update = await _uow.BkbkasRepo.Update(post);
                if (update)
                {
                    BkbkasView views = _mapper.Map<BkbkasView>(post);
                    if (!String.IsNullOrEmpty(views.Idunit.ToString()) || views.Idunit != 0)
                    {
                        views.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == views.Idunit);
                    }
                    if (!String.IsNullOrEmpty(views.Idrek.ToString()) || views.Idrek != 0)
                    {
                        views.IdrekNavigation = await _uow.DaftrekeningRepo.Get(w => w.Idrek == views.Idrek);
                    }
                    if (!String.IsNullOrEmpty(views.Idbank.ToString()) || views.Idbank != 0)
                    {
                        views.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == views.Idbank);
                    }
                    return Ok(views);
                }
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Nobbantu}")]
        public async Task<IActionResult> Delete(string Nobbantu)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bkbkas data = await _uow.BkbkasRepo.Get(w => w.Nobbantu.Trim() == Nobbantu.Trim());
                if (data == null)
                    return BadRequest("Data Tidak Tersedia");
                _uow.BkbkasRepo.Remove(data);
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