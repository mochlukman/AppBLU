using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKPD.API.Helpers;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkamainController : ControllerBase
    {
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public RkamainController(DbConnection dbConnection, BludContext BludContext)
        {
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] RkaTransfer param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                using (IDbConnection dbConnection = _dbConnection)
                {
                    dbConnection.Open();
                    var parameters = new DynamicParameters();
                    parameters.Add("@IDUNIT", param.Idunit);
                    parameters.Add("@KDTAHAPAWAL", param.Kdtahapawal);
                    parameters.Add("@KDTAHAPAKHIR", param.Kdtahapakhir);
                    parameters.Add("@ISMODE", param.ismode);
                    parameters.Add("@TGLTRANSFER", param.Tgltransfer);
                    var rowTransfer = await dbConnection.ExecuteAsync(param.Spname, parameters, commandType: CommandType.StoredProcedure);
                    dbConnection.Close();
                    if (rowTransfer > 0)
                    {
                        return Ok(
                             new ReturnMessage
                             {
                                 Status = true,
                                 Message = "Transfer Barhasil, " + rowTransfer.ToString() + " Terkirim"
                             }
                         );
                    }
                    return BadRequest(
                        new ReturnMessage
                        {
                            Status = false,
                            Message = "Transfer Gagal, " + rowTransfer.ToString() + " Terkirim"
                        }
                    );
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}