using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class SshrekController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public SshrekController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery][Required]long Idssh)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Sshrek> data = await _uow.SshrekRepo.ViewDatas(Idssh);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SshrekPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            List<Sshrek> post = new List<Sshrek>();
            try
            {
                if(param.Idrek.Count() > 0)
                {
                    for(var i = 0; i < param.Idrek.Count(); i++)
                    {
                        bool exist = await _uow.SshrekRepo.isExist(w => w.Idssh == param.Idssh && w.Idrek == param.Idrek[i]);
                        if (!exist)
                        {
                            post.Add(new Sshrek
                            {
                                Idrek = param.Idrek[i],
                                Kdssh = param.Kdssh,
                                Idssh = param.Idssh,
                                Createdby = User.Claims.FirstOrDefault().Value,
                                Createddate = DateTime.Now
                            });
                        }
                    }
                }
                if(post.Count() > 0)
                {
                    _uow.SshrekRepo.AddRange(post);
                    await _uow.Complete();
                }
                return Ok();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idsshrek}")]
        public async Task<IActionResult> Delete(long Idsshrek)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Sshrek data = await _uow.SshrekRepo.Get(w => w.Idsshrek == Idsshrek);
                if(data == null)
                {
                    return BadRequest("Data Tidak Tersedia");
                }
                _uow.SshrekRepo.Remove(data);
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