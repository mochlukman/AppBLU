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
    public class DpablndController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DpablndController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Iddpad
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<DpablndView> views = new List<DpablndView>();
                List<Bulan> bulans = await _uow.BulanRepo.Gets();
                List<Dpablnd> dpablnds = await _uow.DpablndRepo.Gets(w => w.Iddpad == Iddpad);
                if(dpablnds.Count() > 0)
                {
                    foreach (var i in bulans)
                    {
                        Dpablnd find = dpablnds.Find(f => f.Idbulan == i.Idbulan);
                        if (find != null)
                        {
                            views.Add(new DpablndView
                            {
                                Iddpablnd = find.Iddpablnd,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpad = find.Iddpad,
                                Nilai = find.Nilai,
                                Datecreate = find.Datecreate,
                                Dateupdate = find.Dateupdate,
                            });
                        }
                        else
                        {
                            views.Add(new DpablndView
                            {
                                Iddpablnd = find.Iddpablnd,
                                Idbulan = i.Idbulan,
                                Ketbulan = i.KetBulan,
                                Iddpad = Iddpad,
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
        public async Task<IActionResult> Put([FromBody][Required]DpablndView post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                decimal? NilaiRek = await _uow.DpadRepo.GetNilai(post.Iddpad);
                decimal? NilaiKas = await _uow.DpablndRepo.TotalNilai(post.Iddpad);
                Dpablnd data_old = await _uow.DpablndRepo.Get(w => w.Iddpablnd == post.Iddpablnd);
                NilaiKas -= data_old.Nilai;
                NilaiKas += post.Nilai;
                if (NilaiKas > NilaiRek)
                {
                    return BadRequest("Total Nilai Melebihi Nilai Rekening");

                }
                post.Datecreate = DateTime.Now;
                bool update = await _uow.DpablndRepo.Update(post);
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