using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkpajakdetstrRepo : Repo<Bkpajakdetstr>, IBkpajakdetstrRepo
    {
        public BkpajakdetstrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Bkpajakdetstr param)
        {
            Bkpajakdetstr data = await _BludContext.Bkpajakdetstr.Where(w => w.Idbkpajakdetstr == param.Idbkpajakdetstr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Idbilling = param.Idbilling;
            data.Tglidbilling = param.Tglidbilling;
            data.Tglexpire = param.Tglexpire;
            data.Ntpn = param.Ntpn;
            data.Ntb = param.Ntb;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Bkpajakdetstr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Bkpajakdetstr> ViewData(long Idbkpajakdetstr)
        {
            Bkpajakdetstr data = await (
                from det in _BludContext.Bkpajakdetstr
                join bkpajak in _BludContext.Bkpajak on det.Idbkpajak equals bkpajak.Idbkpajak
                join pajak in _BludContext.Pajak on det.Idpajak equals pajak.Idpajak
                //join bpk in _BludContext.Bpkpajakstr on det.Idbpkpajakstr equals bpk.Idbpkpajakstr
                where det.Idbkpajakdetstr == Idbkpajakdetstr
                select new Bkpajakdetstr
                {
                    Idbkpajak = det.Idbkpajak,
                    Idbkpajakdetstr = det.Idbkpajakdetstr,
                    Idpajak = det.Idpajak,
                    Idbpkpajakstr = det.Idbpkpajakstr,
                    Datecreate = det.Datecreate,
                    Dateupdate = det.Dateupdate,
                    Idbilling = det.Idbilling,
                    Tglexpire = det.Tglexpire,
                    Tglidbilling = det.Tglidbilling,
                    Ntb = det.Ntb,
                    Ntpn = det.Ntpn,
                    IdbkpajakNavigation = bkpajak ?? null,
                    //IdbpkpajakstrNavigation = bpk ?? null,
                    IdpajakNavigation = pajak ?? null
                }
            ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Bkpajakdetstr>> ViewDatas(long Idbkpajak)
        {
            List<Bkpajakdetstr> data = await (
                from det in _BludContext.Bkpajakdetstr
                join bkpajak in _BludContext.Bkpajak on det.Idbkpajak equals bkpajak.Idbkpajak
                join pajak in _BludContext.Pajak on det.Idpajak equals pajak.Idpajak
                //join bpk in _BludContext.Bpkpajakstr on det.Idbpkpajakstr equals bpk.Idbpkpajakstr
                where det.Idbkpajak == Idbkpajak
                select new Bkpajakdetstr
                {
                    Idbkpajak = det.Idbkpajak,
                    Idbkpajakdetstr = det.Idbkpajakdetstr,
                    Idpajak = det.Idpajak,
                    Idbpkpajakstr = det.Idbpkpajakstr,
                    Datecreate = det.Datecreate,
                    Dateupdate = det.Dateupdate,
                    Idbilling = det.Idbilling,
                    Tglexpire = det.Tglexpire,
                    Tglidbilling = det.Tglidbilling,
                    Ntb = det.Ntb,
                    Ntpn = det.Ntpn,
                    IdbkpajakNavigation = bkpajak ?? null,
                    //IdbpkpajakstrNavigation = bpk ?? null,
                    IdpajakNavigation = pajak ?? null
                }
            ).ToListAsync();
            return data;
        }
    }
}
