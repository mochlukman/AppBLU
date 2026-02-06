using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class BpkpajakdetRepo : Repo<Bpkpajakdet>, IBpkpajakdetRepo
    {
        public BpkpajakdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<decimal?> sumNilai(long Idbpkpajak)
        {
            decimal? total = await _BludContext.Bpkpajakdet.Where(w => w.Idbpkpajak == Idbpkpajak).SumAsync(s => s.Nilai);
            return total;
        }

        public async Task<bool> Update(Bpkpajakdet param)
        {
            Bpkpajakdet data = await _BludContext.Bpkpajakdet.Where(w => w.Idbpkpajakdet == param.Idbpkpajakdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Idbilling = param.Idbilling;
            data.Ntb = param.Ntb;
            data.Ntpn = param.Ntpn;
            data.Tglbilling = param.Tglbilling;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Bpkpajakdet.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Bpkpajakdet> ViewData(long Idbpkpajakdet)
        {
            Bpkpajakdet Result = await (
                from data in _BludContext.Bpkpajakdet
                join bpkpajak in _BludContext.Bpkpajak on data.Idbpkpajak equals bpkpajak.Idbpkpajak
                join pajak in _BludContext.Pajak on data.Idpajak equals pajak.Idpajak
                where data.Idbpkpajakdet == Idbpkpajakdet
                select new Bpkpajakdet
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpajak = data.Idpajak,
                    Idbpkpajak = data.Idbpkpajak,
                    Nilai = data.Nilai,
                    Idbilling = data.Idbilling,
                    Ntb = data.Ntb,
                    Ntpn = data.Ntpn,
                    Tglbilling = data.Tglbilling,
                    Idbpkpajakdet = data.Idbpkpajakdet,
                    IdbpkpajakNavigation = bpkpajak ?? null,
                    IdpajakNavigation = pajak ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Bpkpajakdet>> ViewDatas(BpkpajakdetGet param)
        {
            List<Bpkpajakdet> Result = new List<Bpkpajakdet>();
            IQueryable<Bpkpajakdet> query = (
                from data in _BludContext.Bpkpajakdet
                join bpkpajak in _BludContext.Bpkpajak on data.Idbpkpajak equals bpkpajak.Idbpkpajak
                join pajak in _BludContext.Pajak on data.Idpajak equals pajak.Idpajak
                select new Bpkpajakdet
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpajak = data.Idpajak,
                    Idbpkpajak = data.Idbpkpajak,
                    Nilai = data.Nilai,
                    Idbilling = data.Idbilling,
                    Ntb = data.Ntb,
                    Ntpn = data.Ntpn,
                    Tglbilling = data.Tglbilling,
                    Idbpkpajakdet = data.Idbpkpajakdet,
                    IdbpkpajakNavigation = bpkpajak ?? null,
                    IdpajakNavigation = pajak ?? null
                }
                ).AsQueryable();
            if(param.Idbpkpajak.ToString() != "0")
            {
                query = query.Where(w => w.Idbpkpajak == param.Idbpkpajak).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
