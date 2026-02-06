using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RKPD.API.Helpers;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class WebuserRepo : Repo<Webuser>, IWebuserRepo
    {
        public WebuserRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public void UpdateBlokId(string Userid)
        {
            Webuser webuser = _BludContext.Webuser.Where(w => w.Userid.Trim() == Userid.Trim()).FirstOrDefault();
            if (String.IsNullOrEmpty(webuser.Blokid.ToString()) || webuser.Blokid == 0)
            {
                webuser.Blokid = 1;
            }
            else
            {
                webuser.Blokid = webuser.Blokid + 1;
            }
            _BludContext.Webuser.Update(webuser);
            _BludContext.SaveChanges();
        }
        public async Task<bool> OpenBlok(string Userid)
        {
            Webuser webuser = await _BludContext.Webuser.Where(w => w.Userid.Trim() == Userid.Trim()).FirstOrDefaultAsync();
            webuser.Blokid = 0;
            _BludContext.Webuser.Update(webuser);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> Update(Webuser param)
        {
            Webuser webuser = await _BludContext.Webuser.Where(w => w.Userid.Trim() == param.Userid.Trim()).FirstOrDefaultAsync();
            webuser.Nama = param.Nama;
            webuser.Ket = param.Ket;
            webuser.Stchecker = param.Stchecker;
            webuser.Stmaker = param.Stmaker;
            webuser.Staproval = param.Staproval;
            webuser.Stlegitimator = param.Stlegitimator;
            webuser.Stinsert = param.Stinsert;
            webuser.Stupdate = param.Stupdate;
            webuser.Stdelete = param.Stdelete;
            webuser.Idpeg = param.Idpeg;
            webuser.Groupid = param.Groupid;
            webuser.Idunit = param.Idunit;
            webuser.Kdtahap = param.Kdtahap;
            _BludContext.Webuser.Update(webuser);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<List<Webuser>> UserBloked()
        {
            List<Webuser> webusers = await _BludContext.Webuser.Where(w => w.Blokid != null).ToListAsync();
            return webusers;
        }
        public async Task<bool> ResetPassword(string Userid)
        {
            Webuser data = await _BludContext.Webuser.Where(w => w.Userid.Trim() == Userid).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Pwd = Hashing.Create("123456");
            _BludContext.Webuser.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;

        }

        public async Task<bool> ChangePassword(UbahSandiPost param)
        {
            Webuser data = await _BludContext.Webuser.Where(w => w.Userid.Trim() == param.Userid.Trim()).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Pwd = param.newPass;
                _BludContext.Webuser.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<bool> Approval(userApproval param)
        {
            Webuser data = await _BludContext.Webuser.Where(w => w.Userid.Trim() == param.Userid.Trim()).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Isauthorized = param.Isauthorized;
                data.Authorizedby = param.Authorizedby;
                data.Authorizeddate = param.Authorizeddate;
                _BludContext.Webuser.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<Webuser> ViewData(string Userid)
        {
            Webuser Result = await (
                    from data in _BludContext.Webuser
                    join webgroup in _BludContext.Webgroup on data.Groupid equals webgroup.Groupid
                    where data.Userid.Trim() == Userid.Trim()
                    select new Webuser
                    {
                        Authorizedby = data.Authorizedby,
                        Userid = data.Userid,
                        Authorizeddate = data.Authorizeddate,
                        Blokid = data.Blokid,
                        Email = data.Email,
                        Group = webgroup ?? null,
                        Groupid = data.Groupid,
                        Idpeg = data.Idpeg,
                        IdpegNavigation = !String.IsNullOrEmpty(data.Idpeg.ToString()) ? _BludContext.Pegawai.Where(w => w.Idpeg == data.Idpeg).FirstOrDefault() : null,
                        Idunit = data.Idunit,
                        IdunitNavigation = !String.IsNullOrEmpty(data.Idunit.ToString()) ? _BludContext.Daftunit.Where(w => w.Idunit == data.Idunit).FirstOrDefault() : null,
                        Isauthorized = data.Isauthorized,
                        Kdtahap = data.Kdtahap,
                        Ket = data.Ket,
                        Nama = data.Nama,
                        Pwd = data.Pwd,
                        Staproval = data.Staproval,
                        Stchecker = data.Stchecker,
                        Stdelete = data.Stdelete,
                        Stinsert = data.Stinsert,
                        Stmaker = data.Stmaker,
                        Stlegitimator = data.Stlegitimator,
                        Stupdate = data.Stupdate,
                        Transecure = data.Transecure
                    }
                ).FirstOrDefaultAsync();
            return Result;
        }
    }
}
