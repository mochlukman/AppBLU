using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BpkspjRepo : Repo<Bpkspj>, IBpkspjRepo
    {
        public BpkspjRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<BpkspjView>> ByBpk(long Idbpk)
        {
            List<BpkspjView> data = await (
                from bpkspj in _BludContext.Bpkspj
                join bpk in _BludContext.Bpk on bpkspj.Idbpk equals bpk.Idbpk
                where bpkspj.Idbpk == Idbpk
                select new BpkspjView
                {
                    Datecreate = bpkspj.Datecreate,
                    Dateupdate = bpkspj.Dateupdate,
                    Idbpk = bpkspj.Idbpk,
                    Idspj = bpkspj.Idspj,
                    Idbpkspj = bpkspj.Idbpkspj,
                    IdbpkNavigation = bpk ?? null,
                    Nilai = _BludContext.Bpkdetr.Where(w => w.Idbpk == bpkspj.Idbpk).Select(s => s.Nilai).Sum()
                }
                ).ToListAsync();
            return data;
        }

        public async Task<List<BpkspjView>> BySpj(long Idspj)
        {
            List<BpkspjView> data = await (
                from bpkspj in _BludContext.Bpkspj
                join bpk in _BludContext.Bpk on bpkspj.Idbpk equals bpk.Idbpk
                where bpkspj.Idspj == Idspj
                select new BpkspjView
                {
                    Datecreate = bpkspj.Datecreate,
                    Dateupdate = bpkspj.Dateupdate,
                    Idbpk = bpkspj.Idbpk,
                    Idspj = bpkspj.Idspj,
                    Idbpkspj = bpkspj.Idbpkspj,
                    IdbpkNavigation = bpk ?? null,
                    Nilai = _BludContext.Bpkdetr.Where(w => w.Idbpk == bpkspj.Idbpk).Select(s => s.Nilai).Sum()
                }
                ).ToListAsync();
            return data;
        }

        public async Task<BpkspjView> ViewData(long Idbpkspj)
        {
            BpkspjView data = await (
                from bpkspj in _BludContext.Bpkspj
                join bpk in _BludContext.Bpk on bpkspj.Idbpk equals bpk.Idbpk
                where bpkspj.Idbpkspj == Idbpkspj
                select new BpkspjView
                {
                    Datecreate = bpkspj.Datecreate,
                    Dateupdate = bpkspj.Dateupdate,
                    Idbpk = bpkspj.Idbpk,
                    Idspj = bpkspj.Idspj,
                    Idbpkspj = bpkspj.Idbpkspj,
                    IdbpkNavigation = bpk ?? null,
                    Nilai = _BludContext.Bpkdetr.Where(w => w.Idbpk == bpkspj.Idbpk).Select(s => s.Nilai).Sum()
                }
                ).FirstOrDefaultAsync();
            return data;
        }
    }
}
