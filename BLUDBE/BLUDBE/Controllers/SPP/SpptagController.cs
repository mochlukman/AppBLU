using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLUDBE.Controllers.SPP
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpptagController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _ctx;
        public SpptagController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _ctx = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required]long Idspp
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Spptag> datas = await _uow.SpptagRepo.ViewDatas(Idspp);
                List<SpptagView> views = _mapper.Map<List<SpptagView>>(datas);
                if(views.Count() > 0)
                {
                    views.ForEach(f =>
                    {
                        f.Nilai = _uow.TagihandetRepo.TotalTagihan(f.Idtagihan);
                    });
                }
                return Ok(views);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{Idspptag}")]
        public async Task<IActionResult> Get(long Idspptag)
        {
            if (!ModelState.IsValid) return BadRequest(Idspptag);
            try
            {
                Spptag data = await _uow.SpptagRepo.ViewData(Idspptag);
                SpptagView view = _mapper.Map<SpptagView>(data);
                if(view != null)
                {
                    view.Nilai = _uow.TagihandetRepo.TotalTagihan(view.Idtagihan);
                }
                return Ok(view);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SppTagPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if (param.Idtagihans.Count() > 0)
                {
                    for (var i = 0; i < param.Idtagihans.Count(); i++)
                    {
                        bool isexits = await _uow.SpptagRepo.isExist(w => w.Idspp == param.Idspp && w.Idtagihan == param.Idtagihans[i]);
                        if (!isexits)
                        {
                            Spptag post = await _uow.SpptagRepo.Add(new Spptag
                            {
                                Idspp = param.Idspp,
                                Idtagihan = param.Idtagihans[i],
                                Createby = User.Claims.FirstOrDefault().Value,
                                Createdate = DateTime.Now
                            });
                            if (post != null)
                            {
                                var SpName = "WSP_TRANSFER_SPPTAGIHAN";
                                using (IDbConnection dbConnection = _dbConnection)
                                {
                                    dbConnection.Open();
                                    var parameters = new DynamicParameters();
                                    parameters.Add("@Idtagihan", post.Idtagihan);
                                    parameters.Add("@Idspp", post.Idspp);
                                    var rowTransfer = await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                                    if (rowTransfer > 0)
                                    {
                                        dbConnection.Close();
                                    }
                                    else
                                    {
                                        dbConnection.Close();
                                    }
                                }
                            }
                        }
                    }
                    return Ok();
                }
                else
                {
                    return BadRequest("Tagihan Tidak Harus Dipilih");
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        
        [HttpDelete("{Idspptag}")]
        public async Task<IActionResult> Delete(long Idspptag)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Spptag data = await _uow.SpptagRepo.Get(w => w.Idspptag == Idspptag);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                _uow.SpptagRepo.Remove(data);
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