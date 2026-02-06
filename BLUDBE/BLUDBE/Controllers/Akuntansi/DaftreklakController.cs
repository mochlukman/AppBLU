using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using AutoMapper;

namespace BLUDBE.Controllers.Akuntansi
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaftreklakController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DaftreklakController(IUow uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery]string Idjnslak,
            [FromQuery]int Mtglevel,
            [FromQuery]string Type
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<int?> Ids = new List<int?>();
            if (!String.IsNullOrEmpty(Idjnslak)) // kondisi memungkinkan Idjnslak kosong / ambil Semua Data
            {
                string[] Idjnslaks = Idjnslak.Split(",");
                List<int> ListIds = Idjnslaks.Select(int.Parse).ToList();
                Ids.AddRange(ListIds.Cast<int?>().ToList());
            }
            try
            {
                List<Daftreklak> data = await _uow.DaftreklakRepo.ViewDatas(Ids, Mtglevel, Type);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("update-nilai")]
        public async Task<IActionResult> UpdateNilai([FromBody] DaftreklakPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftreklak post = _mapper.Map<Daftreklak>(param);
            try
            {
                post.Dateupdate = DateTime.Now;
                bool update = await _uow.DaftreklakRepo.Update(post);
                if (update)
                {
                    return Ok();
                }
                return BadRequest("Update Nilai Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}