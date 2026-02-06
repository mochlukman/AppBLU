using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKPD.API.Helpers;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebuserController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public WebuserController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Gets( )
        {
            try
            {
                List<Webuser> datas = await _uow.WebuserRepo.Gets();
                List<WebuserView> views = _mapper.Map<List<WebuserView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var d in views)
                    {
                        if (!String.IsNullOrEmpty(d.Idunit.ToString()) || d.Idunit != 0)
                        {
                            d.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == d.Idunit);
                        }
                        if (!String.IsNullOrEmpty(d.Idpeg.ToString()) || d.Idpeg != 0)
                        {
                            d.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == d.Idpeg);
                        }
                        if (!String.IsNullOrEmpty(d.Groupid.ToString()) || d.Groupid != 0)
                        {
                            d.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == d.Groupid);
                        }
                        if(d.Stmaker == true)
                        {
                            d.Otorisasi = "Pembuat (Maker)";
                        } else if(d.Stchecker == true)
                        {
                            d.Otorisasi = "Pemeriksa (Checker)";
                        } else if (d.Staproval == true)
                        {
                            d.Otorisasi = "Persetujuan (Aproval)";
                        } else if (d.Stlegitimator == true)
                        {
                            d.Otorisasi = "Pengesahan (Legitimator)";
                        } else
                        {
                            d.Otorisasi = " - ";
                        }
                        if (d.Isauthorized == true)
                        {
                            d.Disetujui = "Disetujui Oleh " + d.Authorizedby;
                        }
                        else
                        {
                            d.Disetujui = "";
                        }
                    }
                }
                return Ok(views);

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }

        }
        [HttpGet("list/bloked")]
        public async Task<IActionResult> GetsBloked()
        {
            try
            {
                List<Webuser> datas = await _uow.WebuserRepo.Gets(w => w.Blokid != 0);
                List<WebuserView> views = _mapper.Map<List<WebuserView>>(datas);
                if (views.Count() > 0)
                {
                    foreach (var d in views)
                    {
                        if (!String.IsNullOrEmpty(d.Idunit.ToString()) || d.Idunit != 0)
                        {
                            d.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == d.Idunit);
                        }
                        if (!String.IsNullOrEmpty(d.Idpeg.ToString()) || d.Idpeg != 0)
                        {
                            d.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == d.Idpeg);
                        }
                        if (!String.IsNullOrEmpty(d.Groupid.ToString()) || d.Groupid != 0)
                        {
                            d.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == d.Groupid);
                        }
                        if (d.Stmaker == true)
                        {
                            d.Otorisasi = "Pembuat (Maker)";
                        }
                        else if (d.Stchecker == true)
                        {
                            d.Otorisasi = "Pemeriksa (Checker)";
                        }
                        else if (d.Staproval == true)
                        {
                            d.Otorisasi = "Persetujuan (Aproval)";
                        }
                        else if (d.Stlegitimator == true)
                        {
                            d.Otorisasi = "Pengesahan (Legitimator)";
                        }
                        else
                        {
                            d.Otorisasi = " - ";
                        }
                        if (d.Isauthorized == true)
                        {
                            d.Disetujui = "Disetujui Oleh " + d.Authorizedby;
                        } else
                        {
                            d.Disetujui = "";
                        }
                    }
                }
                return Ok(views);

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }

        }
        [HttpPost("open-blok/{userid}")]
        public async Task<IActionResult> OpenBlok(string userid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                bool open = await _uow.WebuserRepo.OpenBlok(userid);
                if (open)
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("{UserId}")]
        public async Task<IActionResult> Get(string UserId)
        {
            Webuser data = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == UserId.Trim());
            WebuserView view = _mapper.Map<WebuserView>(data);
            if (view != null)
            {
                if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                {
                    view.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                }
                if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                {
                    view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                }
                if (!String.IsNullOrEmpty(view.Groupid.ToString()) || view.Groupid != 0)
                {
                    view.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == view.Groupid);
                }
                if (view.Stmaker == true)
                {
                    view.Otorisasi = "Pembuat (Maker)";
                }
                else if (view.Stchecker == true)
                {
                    view.Otorisasi = "Pemeriksa (Checker)";
                }
                else if (view.Staproval == true)
                {
                    view.Otorisasi = "Persetujuan (Aproval)";
                }
                else if (view.Stlegitimator == true)
                {
                    view.Otorisasi = "Pengesahan (Legitimator)";
                }
                else
                {
                    view.Otorisasi = " - ";
                }
                if (view.Isauthorized == true)
                {
                    view.Disetujui = "Disetujui Oleh " + view.Authorizedby;
                }
                else
                {
                    view.Disetujui = "";
                }
            }
            return Ok(view);
        }
        [HttpGet("ByGroup")]
        public async Task<IActionResult> GetByGroupId(
            [FromQuery][Required] string GroupId,
            [FromQuery]long Idunit
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<long?> groups = GroupId.Split(",").Select(Int64.Parse).Cast<long?>().ToList();
                List<Webuser> datas = new List<Webuser> { };
                if(Idunit == 0)
                {
                    datas.AddRange(await _uow.WebuserRepo.Gets(w => groups.Contains(w.Groupid)));
                } else
                {
                    datas.AddRange(await _uow.WebuserRepo.Gets(w => groups.Contains(w.Groupid) && w.Idunit == Idunit));
                }
                
                List<WebuserView> views = _mapper.Map<List<WebuserView>>(datas);
                foreach (var d in views)
                {
                    if (!String.IsNullOrEmpty(d.Idunit.ToString()) || d.Idunit != 0)
                    {
                        d.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == d.Idunit);
                    }
                    if (!String.IsNullOrEmpty(d.Idpeg.ToString()) || d.Idpeg != 0)
                    {
                        d.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == d.Idpeg);
                    }
                    if (!String.IsNullOrEmpty(d.Groupid.ToString()) || d.Groupid != 0)
                    {
                        d.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == d.Groupid);
                    }
                    if (d.Stmaker == true)
                    {
                        d.Otorisasi = "Pembuat (Maker)";
                    }
                    else if (d.Stchecker == true)
                    {
                        d.Otorisasi = "Pemeriksa (Checker)";
                    }
                    else if (d.Staproval == true)
                    {
                        d.Otorisasi = "Persetujuan (Aproval)";
                    }
                    else if (d.Stlegitimator == true)
                    {
                        d.Otorisasi = "Pengesahan (Legitimator)";
                    }
                    else
                    {
                        d.Otorisasi = " - ";
                    }
                    if (d.Isauthorized == true)
                    {
                        d.Disetujui = "Disetujui Oleh " + d.Authorizedby;
                    }
                    else
                    {
                        d.Disetujui = "";
                    }
                }
                return Ok(views);

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WebuserPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Webuser post = _mapper.Map<Webuser>(param);
                Webuser check = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == post.Userid.Trim());
                if(check != null) return BadRequest("User ID sudah ada");
                post.Pwd = Hashing.Create(post.Pwd);
                post.Blokid = 0;
                post.Transecure = null;
                if(String.IsNullOrEmpty(param.Idunit.ToString()) || param.Idunit == 0)
                {
                    post.Idunit = null;
                }
                if (String.IsNullOrEmpty(param.Idpeg.ToString()) || param.Idpeg == 0)
                {
                    post.Idpeg = null;
                }
                Webuser insert = await _uow.WebuserRepo.Add(post);
                if(insert != null)
                {
                    WebuserView view = _mapper.Map<WebuserView>(post);
                    if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                    {
                        view.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
                    if (!String.IsNullOrEmpty(view.Groupid.ToString()) || view.Groupid != 0)
                    {
                        view.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == view.Groupid);
                    }
                    if (view.Stmaker == true)
                    {
                        view.Otorisasi = "Pembuat (Maker)";
                    }
                    else if (view.Stchecker == true)
                    {
                        view.Otorisasi = "Pemeriksa (Checker)";
                    }
                    else if (view.Staproval == true)
                    {
                        view.Otorisasi = "Persetujuan (Aproval)";
                    }
                    else if (view.Stlegitimator == true)
                    {
                        view.Otorisasi = "Pengesahan (Legitimator)";
                    }
                    else
                    {
                        view.Otorisasi = " - ";
                    }
                    if (view.Isauthorized == true)
                    {
                        view.Disetujui = "Disetujui Oleh " + view.Authorizedby;
                    }
                    else
                    {
                        view.Disetujui = "";
                    }
                    return Ok(view);
                }
                return BadRequest("Data Gagal Disimpan");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] WebuserPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Webuser post = _mapper.Map<Webuser>(param);
                bool update = await _uow.WebuserRepo.Update(post);
                if (update)
                {
                    WebuserView view = _mapper.Map<WebuserView>(post);
                    if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                    {
                        view.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
                    if (!String.IsNullOrEmpty(view.Groupid.ToString()) || view.Groupid != 0)
                    {
                        view.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == view.Groupid);
                    }
                    if (view.Stmaker == true)
                    {
                        view.Otorisasi = "Pembuat (Maker)";
                    }
                    else if (view.Stchecker == true)
                    {
                        view.Otorisasi = "Pemeriksa (Checker)";
                    }
                    else if (view.Staproval == true)
                    {
                        view.Otorisasi = "Persetujuan (Aproval)";
                    }
                    else if (view.Stlegitimator == true)
                    {
                        view.Otorisasi = "Pengesahan (Legitimator)";
                    }
                    else
                    {
                        view.Otorisasi = " - ";
                    }
                    if (view.Isauthorized == true)
                    {
                        view.Disetujui = "Disetujui Oleh " + view.Authorizedby;
                    }
                    else
                    {
                        view.Disetujui = "";
                    }
                    return Ok(view);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("change_sandi")]
        public async Task<IActionResult> PostChangePassword([FromBody]UbahSandiPost param)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            try
            {
                Webuser webuser = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == param.Userid.Trim());
                if (webuser == null)
                    return BadRequest("User Tidak Ditemukan");
                if (webuser.Pwd.Trim() != Hashing.Create(param.Oldpass))
                    return BadRequest("Password Lama Tidak Benar");
                if (param.newPass != param.Renewpass)
                    return BadRequest("Password dan Retype Password tidak sama");
                param.newPass = Hashing.Create(param.newPass);
                bool ubah = await _uow.WebuserRepo.ChangePassword(param);
                if (ubah)
                    return Ok();
                return BadRequest();

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("reset_password/{Userid}")]
        public async Task<IActionResult> PostResetPassword(string Userid)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            try
            {
                bool reset = await _uow.WebuserRepo.ResetPassword(Userid);
                if (reset) {
                    Webuser data = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == Userid.Trim());
                    WebuserView view = _mapper.Map<WebuserView>(data);
                    if (view != null)
                    {
                        if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                        {
                            view.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                        }
                        if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                        {
                            view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                        }
                        if (!String.IsNullOrEmpty(view.Groupid.ToString()) || view.Groupid != 0)
                        {
                            view.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == view.Groupid);
                        }
                        if (view.Stmaker == true)
                        {
                            view.Otorisasi = "Pembuat (Maker)";
                        }
                        else if (view.Stchecker == true)
                        {
                            view.Otorisasi = "Pemeriksa (Checker)";
                        }
                        else if (view.Staproval == true)
                        {
                            view.Otorisasi = "Persetujuan (Aproval)";
                        }
                        else if (view.Stlegitimator == true)
                        {
                            view.Otorisasi = "Pengesahan (Legitimator)";
                        }
                        else
                        {
                            view.Otorisasi = " - ";
                        }
                        if (view.Isauthorized == true)
                        {
                            view.Disetujui = "Disetujui Oleh " + view.Authorizedby;
                        }
                        else
                        {
                            view.Disetujui = "";
                        }
                    }
                    return Ok(view);
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{UserId}")]
        public async Task<IActionResult> Delete(string UserId)
        {
            try
            {
                Webuser data = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == UserId.Trim());
                if (data == null) return BadRequest("Data tidak ditemukan");
                _uow.WebuserRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("hapus gagal");

            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost("Approval")]
        public async Task<IActionResult> Approval([FromBody]userApproval param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            param.Authorizeddate = DateTime.Now;
            param.Authorizedby = User.Claims.FirstOrDefault().Value;
            try
            {
                Webuser data = await _uow.WebuserRepo.Get(w => w.Userid.Trim() == param.Userid.Trim());
                bool Approval = await _uow.WebuserRepo.Approval(param);
                if (Approval)
                {
                    WebuserView view = _mapper.Map<WebuserView>(data);
                    if (!String.IsNullOrEmpty(view.Idunit.ToString()) || view.Idunit != 0)
                    {
                        view.IdunitNavigation = await _uow.DaftunitRepo.Get(w => w.Idunit == view.Idunit);
                    }
                    if (!String.IsNullOrEmpty(view.Idpeg.ToString()) || view.Idpeg != 0)
                    {
                        view.IdpegNavigation = await _uow.PegawaiRepo.Get(w => w.Idpeg == view.Idpeg);
                    }
                    if (!String.IsNullOrEmpty(view.Groupid.ToString()) || view.Groupid != 0)
                    {
                        view.Group = await _uow.WebgroupRepo.Get(w => w.Groupid == view.Groupid);
                    }
                    if (view.Stmaker == true)
                    {
                        view.Otorisasi = "Pembuat (Maker)";
                    }
                    else if (view.Stchecker == true)
                    {
                        view.Otorisasi = "Pemeriksa (Checker)";
                    }
                    else if (view.Staproval == true)
                    {
                        view.Otorisasi = "Persetujuan (Aproval)";
                    }
                    else if (view.Stlegitimator == true)
                    {
                        view.Otorisasi = "Pengesahan (Legitimator)";
                    }
                    else
                    {
                        view.Otorisasi = " - ";
                    }
                    if (view.Isauthorized == true)
                    {
                        view.Disetujui = "Disetujui Oleh " + view.Authorizedby;
                    }
                    else
                    {
                        view.Disetujui = "";
                    }
                    return Ok(view);
                }
                return BadRequest("Gagal Approval");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}