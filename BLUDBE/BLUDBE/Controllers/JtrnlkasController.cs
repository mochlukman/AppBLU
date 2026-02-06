using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JtrnlkasController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public JtrnlkasController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]string Idnojetra)
        {
            try
            {
                int[] ids = Array.Empty<int>();
                List<Jtrnlkas> datas = new List<Jtrnlkas> { };
                if (!String.IsNullOrEmpty(Idnojetra))
                {
                    ids = Array.ConvertAll(Idnojetra.Split(','), int.Parse);
                }
                if(ids.Count() > 0)
                {
                     datas = await _uow.JtrnlkasRepo.Gets(w => ids.Contains(w.Idnojetra));
                } else
                {
                   datas = await _uow.JtrnlkasRepo.Gets();
                }
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idnojetra}")]
        public async Task<IActionResult> Get(int Idnojetra)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtrnlkas data = await _uow.JtrnlkasRepo.Get(w => w.Idnojetra == Idnojetra);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JtrnlkasPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtrnlkas post = _mapper.Map<Jtrnlkas>(param);
            try
            {
                Jtrnlkas insert = await _uow.JtrnlkasRepo.Add(post);
                if (insert != null) return Ok(insert);
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] JtrnlkasPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Jtrnlkas post = _mapper.Map<Jtrnlkas>(param);
            try
            {
                bool update = await _uow.JtrnlkasRepo.Update(post);
                if (update) return Ok(post);
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idnojetra}")]
        public async Task<IActionResult> Delete(int Idnojetra)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Jtrnlkas data = await _uow.JtrnlkasRepo.Get(w => w.Idnojetra == Idnojetra);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.JtrnlkasRepo.Remove(data);
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