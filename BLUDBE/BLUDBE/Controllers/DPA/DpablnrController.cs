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

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpablnrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpablnrController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpar
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DpablnrView> views = new List<DpablnrView>();
                List<Bulan> bulans = await _uow.BulanRepo.Gets();
                List<Dpablnr> dpablnrs = await _uow.DpablnrRepo.Gets(w => w.Iddpar == Iddpar);
                if(dpablnrs.Count() > 0)
                {
                    foreach (var i in bulans)
                    {
                        Dpablnr find = dpablnrs.Find(f => f.Idbulan == i.Idbulan);
                        if (find != null)
                        {
                            views.Add(new DpablnrView
                            {
                                Iddpablnr = find.Iddpablnr,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpar = find.Iddpar,
                                Nilai = find.Nilai,
                                Datecreate = find.Datecreate,
                                Dateupdate = find.Dateupdate,
                            });
                        }
                        else
                        {
                            views.Add(new DpablnrView
                            {
                                Iddpablnr = find.Iddpablnr,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpar = Iddpar,
                                Nilai = 0,
                                Datecreate = null,
                                Dateupdate = null,
                            });
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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody][Required]DpablnrView post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                decimal? NilaiRek = await _uow.DparRepo.GetNilai(post.Iddpar);
                decimal? NilaiKas = await _uow.DpablnrRepo.TotalNilai(post.Iddpar);
                Dpablnr data_old = await _uow.DpablnrRepo.Get(w => w.Iddpablnr == post.Iddpablnr);

                //NilaiKas -= data_old.Nilai;
                //NilaiKas += post.Nilai;
                NilaiKas = post.Nilai;
                if (NilaiKas > NilaiRek)
                {
                    return BadRequest("Total Nilai Melebihi Nilai Rekening");
                }

                post.Datecreate = DateTime.Now;
                bool update = await _uow.DpablnrRepo.Update(post);
                if (update)
                    return Ok(post);
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