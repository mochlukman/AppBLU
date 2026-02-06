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
    public class DpabRepo : Repo<Dpab>, IDpabRepo
    {
        public DpabRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> UpdateNilai(Dpadetb param, decimal? newTotal)
        {
            Dpab data = await _BludContext.Dpab.Where(w =>
                                 w.Iddpab == param.Iddpab).FirstOrDefaultAsync();
            data.Nilai = newTotal;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpab.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<decimal?> GetNilai(long Iddpab)
        {
            decimal? Nilai = await _BludContext.Dpab.Where(w => w.Iddpab == Iddpab)
                    .Select(s => s.Nilai).SumAsync();
            return Nilai;
        }

        public async Task<List<DpabView>> GetByStsdetd(long Idunit, long Idsts)
        {
            List<long> rekInStsdetd = await _BludContext.Stsdetd.Where(w => w.Idsts == Idsts).Select(s => s.Idrek).Distinct().ToListAsync();
            List<DpabView> datas = await (
                  from dpab in _BludContext.Dpab
                  join dpa in _BludContext.Dpa on dpab.Iddpa equals dpa.Iddpa
                  join rekening in _BludContext.Daftrekening on dpab.Idrek equals rekening.Idrek
                  where dpa.Idunit == Idunit && !rekInStsdetd.Contains(dpab.Idrek) && rekening.Kdper.StartsWith("6.1.")
                  select new DpabView
                  {
                      Iddpa = dpab.Iddpa,
                      Iddpab = dpab.Iddpab,
                      Datecreate = dpab.Datecreate,
                      Dateupdate = dpab.Dateupdate,
                      Idrek = dpab.Idrek,
                      Kdtahap = dpab.Kdtahap,
                      Nilai = dpab.Nilai,
                      Rekening = rekening
                  }
                ).ToListAsync();
            return datas;
        }
    }
}
