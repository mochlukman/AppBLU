using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKPD.API.Helpers;
using BLUDBE.Dto;
using BLUDBE.Interface;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public List<Menu> Menus { get; set; }
        public MenuController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] long GroupId,
            long Idapp)
        {
            try
            {
                if (String.IsNullOrEmpty(Idapp.ToString()) || Idapp.ToString() == "0")
                {
                    Idapp = 4; // 4 = TUKD, 5 = Akuntansi
                }
                if (User.FindFirst("GroupId").Value == "1")
                {
                    Menus = await _uow.MenuRepo.GetMenuAdmin(Idapp);
                }
                else
                {
                    Menus = await _uow.MenuRepo.GetMenuByGroupId(GroupId, Idapp);
                }
                return Ok(_mapper.Map<List<MenuDto>>(Menus));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("TreeMenuWebRole")]
        public async Task<IActionResult> GetTree([FromQuery] long GroupId)
        {
            try
            {
                var TreeMenu = await _uow.MenuRepo.TreeMenuWeRole(GroupId);
                return Ok(TreeMenu);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}