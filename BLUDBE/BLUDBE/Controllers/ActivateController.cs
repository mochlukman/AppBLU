using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RKPD.API.Helpers;
using BLUDBE.Helper;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class ActivateController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DapperService _dapperService;
        public ActivateController(IHttpContextAccessor httpContextAccessor, DapperService dapperService)
        {
            _httpContextAccessor = httpContextAccessor;
            _dapperService = dapperService;
        }
        [HttpGet("GetCPUID")]
        public async Task<IActionResult> GetCPUID()
        {
            try
            {
                CpuId cpuId = new CpuId();
                return Ok(new ReturnMessage
                {
                    Status = true,
                    Message = cpuId.GetCpuId()
                });
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ActivateParam param)
        {
            if (!ModelState.IsValid) return BadRequest();
            ActiveAppModel activeAppModel = new ActiveAppModel();
            byte[] _keyBytes = ASCIIEncoding.ASCII.GetBytes("NewSIPKD");
            try
            {
                CoreEndesc coreEndesc = new CoreEndesc();
                AesAlgoDecrypt aesAlgoDecrypt = new AesAlgoDecrypt();
                string[] split = param.Serial.Split("<>|<>");
                activeAppModel.Serial = split[0];
                activeAppModel.Publickey = split[1];
                string Layer2Dec = aesAlgoDecrypt.DecryptString(activeAppModel.Publickey, activeAppModel.Serial);
                string Layer1Dec = coreEndesc.DecryptString(Layer2Dec, _keyBytes);

                string[] splitLayer1Desc = Layer1Dec.Split("|");
                activeAppModel.Cpuid = splitLayer1Desc[0];
                activeAppModel.Tipe = splitLayer1Desc[1];
                activeAppModel.Aplikasi = splitLayer1Desc[2];
                if(activeAppModel.Tipe.Trim() == "temp")
                {
                   string tempDate = splitLayer1Desc[3].Replace("x", "-");
                   DateTime resultsTglBerlaku;
                   if(DateTime.TryParseExact(tempDate, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out resultsTglBerlaku))
                   {
                        activeAppModel.Tglberlaku = resultsTglBerlaku;
                   }
                }
                activeAppModel.Datecreate = DateTime.Now;
                activeAppModel.Dateupdate = DateTime.Now;
                ReturnMessage returnMessage = new ReturnMessage();
                if (!_dapperService.CheckActivateTable())
                {
                    _dapperService.CreateTable();
                }
                if (_dapperService.InsertDataIntoTable("ACTIVEAPP", activeAppModel))
                {
                    returnMessage.Status = true;
                    returnMessage.Message = "Aktivasi Berhasil";
                    return Ok(returnMessage);
                }
                returnMessage.Status = false;
                returnMessage.Message = "Aktivasi Gagal";
                return BadRequest("Terjadi Kesalahan");
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}