using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class Sp2bdetRepo : Repo<Sp2bdet>, ISp2bdetRepo
    {
        public Sp2bdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<dynamic>> RincianSP2B(Sp2bdetGet param)
        {
            List<dynamic> Result = new List<dynamic>();
            IQueryable<dynamic> query = (
                    from sp2bdet in _BludContext.Sp2bdet
                    join sp3bdet in _BludContext.Sp3bdet on sp2bdet.Idsp3b equals sp3bdet.Idsp3b into sp3bdetGroup
                    from sp3bdetData in sp3bdetGroup.DefaultIfEmpty()
                    join daftrekening in _BludContext.Daftrekening on sp3bdetData.Idrek equals daftrekening.Idrek into daftrekeningGroup
                    from daftrekeningData in daftrekeningGroup.DefaultIfEmpty()
                    where sp2bdet.Idsp2b == param.Idsp2b
                    group sp3bdetData by new { daftrekeningData.Kdper, daftrekeningData.Nmper } into g
                    select new
                    {
                        g.Key.Kdper,
                        g.Key.Nmper,
                        Nilai = g.Sum(x => x.Nilai) ?? 0
                    }
                ).AsQueryable();
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<List<dynamic>> RincianSP3B(Sp2bdetGet param)
        {
            List<dynamic> Result = new List<dynamic>();
            IQueryable<dynamic> query = (
                    from sp2bdet in _BludContext.Sp2bdet
                    join sp3bdet in _BludContext.Sp3bdet on sp2bdet.Idsp3b equals sp3bdet.Idsp3b into sp3bdetGroup
                    from sp3bdetData in sp3bdetGroup.DefaultIfEmpty()
                    join sp3b in _BludContext.Sp3b on sp2bdet.Idsp3b equals sp3b.Idsp3b into sp3bGroup
                    from sp3bData in sp3bGroup.DefaultIfEmpty()
                    where sp2bdet.Idsp2b == param.Idsp2b
                    group sp3bdetData by new { sp3bData.Nosp3b, sp3bData.Tglsp3b, sp3bData.Uraisp3b, sp2bdet.Idsp2bdet } into g
                    select new
                    {
                        g.Key.Nosp3b,
                        g.Key.Tglsp3b,
                        g.Key.Uraisp3b,
                        g.Key.Idsp2bdet,
                        Nilai = g.Sum(x => x.Nilai) ?? 0
                    }
                ).AsQueryable();
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<List<Sp2bdet>> ViewDatas(Sp2bdetGet param)
        {
            List<Sp2bdet> Result = new List<Sp2bdet>();
            IQueryable<Sp2bdet> query = (
                    from data in _BludContext.Sp2bdet
                    join sp2b in _BludContext.Sp2b on data.Idsp2b equals sp2b.Idsp2b into sp2bMatch
                    from sp2bData in sp2bMatch.DefaultIfEmpty()
                    join sp3b in _BludContext.Sp3b on data.Idsp3b equals sp3b.Idsp3b into sp3bMatch
                    from sp3bData in sp3bMatch.DefaultIfEmpty()
                    select new Sp2bdet
                    {
                        Idsp3b = data.Idsp3b,
                        Idsp2bdet = data.Idsp2bdet,
                        Iderek = data.Iderek,
                        Idsp2b = data.Idsp2b,
                        Datecreate = data.Datecreate,
                        Dateupdate = data.Dateupdate,
                        Nilai = data.Nilai,
                        Idjnsakun = data.Idjnsakun,
                        Idsp2bNavigation = sp2bData ?? null,
                        Idsp3bNavigation = sp3bData ?? null
                    }
                ).AsQueryable();
            if (param.Idsp3b.ToString() != "0")
            {
                query = query.Where(w => w.Idsp3b == param.Idsp3b).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
