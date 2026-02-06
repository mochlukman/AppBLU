using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SpddetbRepo : Repo<Spddetb>, ISpddetbRepo
    {
        public SpddetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<long>> GetIdReks(long Idspd, long Idkeg)
        {
            List<long> IdReks = new List<long> { };
            if (Idkeg != 0)
            {
                IdReks.AddRange(await _BludContext.Spddetb.Where(w => w.Idspd == Idspd).Select(s => s.Idrek).Distinct().ToListAsync());
            }
            else
            {
                IdReks.AddRange(await _BludContext.Spddetb.Where(w => w.Idspd == Idspd).Select(s => s.Idrek).Distinct().ToListAsync());
            }
            return IdReks;
        }

        public async Task<decimal?> TotalNilaiSpd(long Idspd)
        {
            decimal? Total = await _BludContext.Spddetb.Where(w => w.Idspd == Idspd).SumAsync(s => s.Nilai);
            return Total;
        }
    }
}
