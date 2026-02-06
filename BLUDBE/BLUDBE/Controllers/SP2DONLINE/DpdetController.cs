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

namespace BLUDBE.Controllers.SP2DONLINE
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpdetController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUow _uow;
        public DpdetController(IMapper mapper, IUow uow)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Iddp)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpdet> data = await _uow.DpdetRepo.ViewDatas(Iddp);
                List<DpdetView> view = _mapper.Map<List<DpdetView>>(data);
                if(view.Count() > 0)
                {
                    foreach(var v in view)
                    {
                        if (v.Idsp2dNavigation != null)
                        {
                            v.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == v.Idsp2dNavigation.Idunit);
                        }
                    }
                }
                return Ok(view);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Iddpdet}")]
        public async Task<IActionResult> Get(long Iddpdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpdet data = await _uow.DpdetRepo.ViewData(Iddpdet);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DpdetPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DpdetView> Result = new List<DpdetView>();
                if(param.Idsp2d.Count() > 0)
                {
                    for(var i = 0; i < param.Idsp2d.Count(); i++)
                    {
                        Dpdet post = new Dpdet
                        {
                            Iddp = param.Iddp,
                            Idsp2d = param.Idsp2d[i],
                            Datecreate = DateTime.Now
                        };
                        Dpdet Insert = await _uow.DpdetRepo.Add(post);
                        if(Insert != null)
                        {
                            DpdetView temp = _mapper.Map<DpdetView>(await _uow.DpdetRepo.ViewData(Insert.Iddpdet));
                            if(temp != null)
                            {
                                if (temp.Idsp2dNavigation != null)
                                {
                                    temp.Daftunit = await _uow.DaftunitRepo.Get(w => w.Idunit == temp.Idsp2dNavigation.Idunit);
                                }
                            }
                            Result.Add(temp);
                        }
                    }
                }
                if (Result.Count() > 0) return Ok(Result);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddpdet}")]
        public async Task<IActionResult> Delete(long Iddpdet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Dpdet data = await _uow.DpdetRepo.Get(w => w.Iddpdet == Iddpdet);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.DpdetRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}