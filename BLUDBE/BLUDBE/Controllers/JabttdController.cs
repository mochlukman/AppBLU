using System;
using System.Collections.Generic;
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
    public class JabttdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JabttdController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]string Kddok)
        {
            long Idunit = await _uow.PemdaRepo.GetIdunit();
            try
            {
                List<Jabttd> datas = new List<Jabttd> { };
                if (String.IsNullOrEmpty(Kddok))
                {
                    datas.AddRange(await _uow.JabttdRepo.Gets(w => w.Idunit == Idunit));
                } else
                {
                    datas.AddRange(await _uow.JabttdRepo.Gets(w => w.Idunit == Idunit && w.Kddok.Trim() == Kddok.Trim()));
                }
                List<JabttdView> views = _mapper.Map<List<JabttdView>>(datas);
                if(views.Count() > 0)
                {
                    foreach(var v in views)
                    {
                        if (!String.IsNullOrEmpty(v.Kddok))
                        {
                            v.KddokNavigation = await _uow.DaftdokRepo.Get(w => w.Kddok.Trim() == v.Kddok.Trim());
                        }
                        if(!String.IsNullOrEmpty(v.Idpeg.ToString()) || v.Idpeg != 0)
                        {
                            v.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == v.Idpeg);
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
        public async Task<IActionResult> Post([FromBody] JabttdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jabttd post = _mapper.Map<Jabttd>(param);
            post.Datecreate = DateTime.Now;
            post.Idunit = await _uow.PemdaRepo.GetIdunit();
            try
            {
                Jabttd insert = await _uow.JabttdRepo.Add(post);
                if(insert != null)
                {
                    JabttdView view = _mapper.Map<JabttdView>(insert);
                    if(!String.IsNullOrEmpty(view.Kddok))
                    {
                        view.KddokNavigation = await _uow.DaftdokRepo.Get(w => w.Kddok.Trim() == view.Kddok.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
                    return Ok(view);
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
        public async Task<IActionResult> Put([FromBody] JabttdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jabttd post = _mapper.Map<Jabttd>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.JabttdRepo.Update(post);
                if (update)
                {
                    JabttdView view = _mapper.Map<JabttdView>(post);
                    if (!String.IsNullOrEmpty(view.Kddok))
                    {
                        view.KddokNavigation = await _uow.DaftdokRepo.Get(w => w.Kddok.Trim() == view.Kddok.Trim());
                    }
                    if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
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
        [HttpDelete("{Idttd}")]
        public async Task<IActionResult> Delete(long Idttd)
        {
            try
            {
                Jabttd data = await _uow.JabttdRepo.Get(w => w.Idttd == Idttd);
                if (data == null)
                    return BadRequest("Data Tidak Ditemukan");
                _uow.JabttdRepo.Remove(data);
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