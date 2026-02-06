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

namespace BLUDBE.Controllers.BKU
{
    [Route("api/[controller]")]
    [ApiController]
    public class BkustsController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public BkustsController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idbend
            )
        {
            try
            {
                List<Bkusts> data = await _uow.BkustsRepo.ViewDatas(Idunit, Idbend);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-spjtr")]
        public async Task<IActionResult> GetsForSpjtr(
            [FromQuery][Required]long Idspjtr,
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idbend
            )
        {
            try
            {
                List<Bkusts> data = await _uow.BkustsRepo.ViewDatasForSpjtr(Idspjtr, Idunit, Idbend);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}