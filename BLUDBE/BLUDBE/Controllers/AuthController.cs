using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RKPD.API.Helpers;
using BLUDBE.Helper;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUow _uow;
        private readonly BludContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DapperService _dapperService;
        private readonly BlacklistService _blacklistService;
        public AuthController(
            IConfiguration configuration, 
            IUow uow, 
            BludContext BludContext, 
            IHttpContextAccessor httpContextAccessor, 
            DapperService dapperService,
            BlacklistService blacklistService)
        {
            _config = configuration;
            _uow = uow;
            _context = BludContext;
            _httpContextAccessor = httpContextAccessor;
            _dapperService = dapperService;
            _blacklistService = blacklistService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                Webuser user = await _uow.WebuserRepo.ViewData(param.UserId.Trim());
                if(user == null)
                {
                    return BadRequest("Login Gagal");
                }
                if (!String.IsNullOrEmpty(user.Blokid.ToString()))
                {
                    if (user.Blokid >= 3)
                    {
                        return BadRequest("User Terblokir, Hubungi Administrator Untuk Membuka Kembali");
                    }
                }
                if (Hashing.Check(param.Pwd, user.Pwd))
                {
                    return Ok(new { token = CreateToken(user, param.kdTahun) });
                }
                else
                {
                    if (user.Groupid != 1)
                    {
                        _uow.WebuserRepo.UpdateBlokId(user.Userid);
                    }
                    return BadRequest("Login Gagal");
                }
            } catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        private string CreateToken(Webuser user, string KdTahun)
        {
            var nmtahun = _uow.TahunRepo.GetNamaTahun(KdTahun);
            CpuId cpuId = new CpuId();
            string StatusAktif = "";
            ActiveAppModel activeAppModel = _dapperService.getByCPUID(cpuId.GetCpuId(), _dapperService._namaAplikasi);
            if(activeAppModel != null)
            {
                if(activeAppModel.Tipe.Trim() == "full")
                {
                    StatusAktif = "Full Version";
                } else
                {
                    if (activeAppModel.Tglberlaku.HasValue)
                    {
                        StatusAktif = $"Aktif Sampai Dengan {activeAppModel.Tglberlaku.Value.ToString("dd-MM-yyyy")}";
                    }
                }
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Userid.Trim()),
                new Claim(ClaimTypes.GivenName, user.Nama ?? user.Userid.Trim()),
                new Claim("KdTahap", !String.IsNullOrEmpty(user.Kdtahap) ? user.Kdtahap.Trim() : ""),
                new Claim("GroupId", !String.IsNullOrEmpty(user.Groupid.ToString()) ? user.Groupid.ToString() : "0"),
                new Claim("Kdgroup", !String.IsNullOrEmpty(user.Group.Kdgroup) ? user.Group.Kdgroup.Trim() : ""),
                new Claim("KdTahun", KdTahun),
                new Claim("NmTahun", nmtahun),
                new Claim("RoleName", user.Group != null ? user.Group.Nmgroup.Trim() : ""),
                new Claim("Idunit", user.IdunitNavigation != null ? user.IdunitNavigation.Idunit.ToString() : "0"),
                new Claim("Kdunit", user.IdunitNavigation != null ? user.IdunitNavigation.Kdunit.Trim() : ""),
                new Claim("Nmunit", user.IdunitNavigation != null ? user.IdunitNavigation.Nmunit.Trim() : ""),
                new Claim("Insert", user.Stinsert.ToString()),
                new Claim("Update", user.Stupdate.ToString()),
                new Claim("Delete", user.Stdelete.ToString()),
                new Claim("IniPakEndul", user.Userid == "pakendul" ? "true" : "false"),
                new Claim("Stmaker", user.Stmaker.ToString()),
                new Claim("Stchecker", user.Stchecker.ToString()),
                new Claim("Staproval", user.Staproval.ToString()),
                new Claim("Stlegitimator", user.Stlegitimator.ToString()),
                new Claim("StatusActive", StatusAktif)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Token:Key").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        [Authorize]
        [HttpGet]
        public ActionResult<String> ReadToken()
        {
            var user = User.Claims.FirstOrDefault(x => x.Type.Equals("UnitKey", StringComparison.InvariantCultureIgnoreCase));
            return Ok(user.Value);
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Token:Key"]));

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    IssuerSigningKey = key
                }, out SecurityToken validatedToken);

                var jwtSecurityToken = (JwtSecurityToken)validatedToken;
                //var expires = DateTime.Now;

                _blacklistService.AddTokenToBlacklist(token, null);
            }

            return Ok();
        }
    }
}