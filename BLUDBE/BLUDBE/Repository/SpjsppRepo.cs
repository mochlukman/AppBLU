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
    public class SpjsppRepo : Repo<Spjspp>, ISpjsppRepo
    {
        public SpjsppRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<SpjsppView>> GetBySpp(long Idspp, string Kdstatus)
        {
            List<SpjsppView> datas = new List<SpjsppView> { };
            List<SpjsppView> gets = await _BludContext.Spjspp.Where(w => w.Idspp == Idspp)
                .Join(_BludContext.Spj.Where(w => w.Kdstatus.Trim() == Kdstatus.Trim() && w.Tglvalid != null),
                s1 => s1.Idspj,
                s2 => s2.Idspj,
                (s1, s2) => new SpjsppView
                {
                    Idspj = s1.Idspj,
                    Idsppspj = s1.Idsppspj,
                    Idspp = s1.Idspp,
                    Nospj = s2.Nospj,
                    Tglspj = s2.Tglspj,
                    Tglbuku = s2.Tglbuku,
                    Keterangan = s2.Keterangan,
                    Nilai = _BludContext.Bpkspj.Where(w => w.Idspj == s1.Idspj)
                    .Join(_BludContext.Bpkdetr,
                    bpkspk => bpkspk.Idbpk, bpkdetr => bpkdetr.Idbpk,
                    (bpkspj, bpkdetr) => new { bpkspj, bpkdetr.Nilai}).Select(s => s.Nilai).Sum()
                }).ToListAsync();
            datas.AddRange(gets);
            return datas;
        }
    }
}
