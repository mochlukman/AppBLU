using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BendController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BendController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery]string Jnsbend
            )
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                List<Bend> views = await _uow.BendRepo.GetByPegawai(Idunit, Jnsbend);                
                if(views.Count() > 0)
                {
                    foreach(var v in views)
                    {
                        if(String.IsNullOrEmpty(v.Idpeg.ToString()) || v.Idpeg != 0)
                        {
                            v.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Idpeg);
                        }
                        if (String.IsNullOrEmpty(v.Idbank.ToString()) || v.Idbank != 0)
                        {
                            v.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == v.Idbank);
                        }
                        if (!String.IsNullOrEmpty(v.Jnsbend))
                        {
                            v.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == v.Jnsbend.Trim());
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
        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery][Required]long Idunit,
            [FromQuery]string Jnsbend,
            [FromQuery]string Keyword
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Bend> views = await _uow.BendRepo.Search(Idunit, Jnsbend, Keyword);
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idbend}")]
        public async Task<IActionResult> Get(long Idbend)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Bend view = await _uow.BendRepo.Get(w => w.Idbend == Idbend);
                if(view != null)
                {
                    if (String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
                    if (String.IsNullOrEmpty(view.Idbank.ToString()) || view.Idbank != 0)
                    {
                        view.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == view.Idbank);
                    }
                    if (!String.IsNullOrEmpty(view.Jnsbend))
                    {
                        view.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == view.Jnsbend.Trim());
                    }
                }
                return Ok(view);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BendPost param)
        {
            if (!ModelState.IsValid) return BadRequest();
            Bend post = _mapper.Map<Bend>(param);
            param.Datecreate = DateTime.Now;
            try
            {
                Bend insert = await _uow.BendRepo.Add(post);
                if(insert != null)
                {
                    if (String.IsNullOrEmpty(insert.Idpeg.ToString()) || insert.Idpeg != 0)
                    {
                        insert.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == insert.Idpeg);
                    }
                    if (String.IsNullOrEmpty(insert.Idbank.ToString()) || insert.Idbank != 0)
                    {
                        insert.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == insert.Idbank);
                    }
                    if (!String.IsNullOrEmpty(insert.Jnsbend))
                    {
                        insert.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == insert.Jnsbend.Trim());
                    }
                    return Ok(insert);
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
        public async Task<IActionResult> Put([FromBody]BendPost param)
        {
            if (!ModelState.IsValid) return BadRequest();
            Bend post = _mapper.Map<Bend>(param);
            try
            {
                bool update = await _uow.BendRepo.Update(post);
                if (update)
                {
                    if (String.IsNullOrEmpty(post.Idpeg.ToString()) || post.Idpeg != 0)
                    {
                        post.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == post.Idpeg);
                    }
                    if (String.IsNullOrEmpty(post.Idbank.ToString()) || post.Idbank != 0)
                    {
                        post.IdbankNavigation = await _uow.DaftbankRepo.Get(w => w.Idbank == post.Idbank);
                    }
                    if (!String.IsNullOrEmpty(post.Jnsbend))
                    {
                        post.JnsbendNavigation = await _uow.JbendRepo.Get(w => w.Jnsbend.Trim() == post.Jnsbend.Trim());
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
        [HttpDelete("{Idbend}")]
        public async Task<IActionResult> Delete(long Idbend)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                Bend data = await _uow.BendRepo.Get(w => w.Idbend == Idbend);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.BendRepo.Remove(data);
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