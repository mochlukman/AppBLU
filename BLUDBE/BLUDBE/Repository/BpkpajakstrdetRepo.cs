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
    public class BpkpajakstrdetRepo : Repo<Bpkpajakstrdet>, IBpkpajakstrdetRepo
    {
        public BpkpajakstrdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Bpkpajakstrdet param)
        {
            Bpkpajakstrdet data = await _BludContext.Bpkpajakstrdet.Where(w => w.Idbpkpajakstrdet == param.Idbpkpajakstrdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Bpkpajakstrdet.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Bpkpajakstrdet> ViewData(long Idbpkpajakstrdet)
        {
            Bpkpajakstrdet Result = await (
                from data in _BludContext.Bpkpajakstrdet
                join bpkpajakstr in _BludContext.Bpkpajakstr on data.Idbpkpajakstr equals bpkpajakstr.Idbpkpajakstr
                join bpkpajak in _BludContext.Bpkpajak on data.Idbpkpajak equals bpkpajak.Idbpkpajak into bpkpajakMatch from bpkpajak_data in bpkpajakMatch
                where data.Idbpkpajakstrdet == Idbpkpajakstrdet
                select new Bpkpajakstrdet
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idbpkpajak = data.Idbpkpajak,
                    Idbpkpajakstr = data.Idbpkpajakstr,
                    Nilai = data.Nilai,
                    Idbpkpajakstrdet = data.Idbpkpajakstrdet,
                    IdbpkpajakstrNavigation = bpkpajakstr ?? null,
                    IdbpkpajakNavigation = bpkpajak_data ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Bpkpajakstrdet>> ViewDatas(BpkpajakstrdetGet param)
        {
            List<Bpkpajakstrdet> Result = new List<Bpkpajakstrdet>();
            IQueryable<Bpkpajakstrdet> query = (
                from data in _BludContext.Bpkpajakstrdet
                join bpkpajakstr in _BludContext.Bpkpajakstr on data.Idbpkpajakstr equals bpkpajakstr.Idbpkpajakstr
                join bpkpajak in _BludContext.Bpkpajak on data.Idbpkpajak equals bpkpajak.Idbpkpajak into bpkpajakMatch from bpkpajak_data in bpkpajakMatch
                select new Bpkpajakstrdet
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idbpkpajak = data.Idbpkpajak,
                    Idbpkpajakstr = data.Idbpkpajakstr,
                    Nilai = data.Nilai,
                    Idbpkpajakstrdet = data.Idbpkpajakstrdet,
                    IdbpkpajakstrNavigation = bpkpajakstr ?? null,
                    IdbpkpajakNavigation = bpkpajak_data ?? null
                }
                ).AsQueryable();
            if (param.Idbpkpajakstr.ToString() != "0")
            {
                query = query.Where(w => w.Idbpkpajakstr == param.Idbpkpajakstr).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
