using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExceuteController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public ExceuteController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets(
            [FromQuery][Required] ParamSP param
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var list = new List<dynamic>();
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    await _dbConnection.OpenAsync();
                    var parameters = new DynamicParameters();
                    if (param.Kdtahap != "x")
                        parameters.Add("@KDTAHAP", param.Kdtahap != "x" ? param.Kdtahap : "");
                    if (param.Idunit.ToString() != "99999") { // ini kondisi jika paramter idunit dilempar dari FE, 99999 berarti tidak digunakan
                        parameters.Add("@IDUNIT", param.Idunit.ToString() != "0" ? param.Idunit : "");
                    }
                       
                    list.AddRange(dbConnection.QueryAsync<dynamic>(param.Spname, parameters, commandType: CommandType.StoredProcedure).Result.ToList());
                    dbConnection.Close();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
    public class ParamSP
    {
        public string Kdtahap { get; set; }
        public string Idunit { get; set; }
        [Required]
        public string Spname { get; set; }
    }
}