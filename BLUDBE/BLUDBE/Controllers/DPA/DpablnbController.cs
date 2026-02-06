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
    public class DpablnbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpablnbController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpab
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DpablnbView> views = new List<DpablnbView>();
                List<Bulan> bulans = await _uow.BulanRepo.Gets();
                List<Dpablnb> dpablnbs = await _uow.DpablnbRepo.Gets(w => w.Iddpab == Iddpab);
                if(dpablnbs.Count() > 0)
                {
                    foreach (var i in bulans)
                    {
                        Dpablnb find = dpablnbs.Find(f => f.Idbulan == i.Idbulan);
                        if (find != null)
                        {
                            views.Add(new DpablnbView
                            {
                                Iddpablnb = find.Iddpablnb,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpab = find.Iddpab,
                                Nilai = find.Nilai,
                                Datecreate = find.Datecreate,
                                Dateupdate = find.Dateupdate,
                            });
                        }
                        else
                        {
                            views.Add(new DpablnbView
                            {
                                Iddpablnb = find.Iddpablnb,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpab = Iddpab,
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
        public async Task<IActionResult> Put([FromBody][Required]DpablnbView post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                decimal? NilaiRek = await _uow.DpabRepo.GetNilai(post.Iddpab);
                decimal? NilaiKas = await _uow.DpablnbRepo.TotalNilai(post.Iddpab);
                Dpablnb data_old = await _uow.DpablnbRepo.Get(w => w.Iddpablnb == post.Iddpablnb);
                NilaiKas -= data_old.Nilai;
                NilaiKas += post.Nilai;
                if (NilaiKas > NilaiRek)
                {
                    return BadRequest("Total Nilai Melebihi Nilai Rekening");

                }
                post.Datecreate = DateTime.Now;
                bool update = await _uow.DpablnbRepo.Update(post);
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