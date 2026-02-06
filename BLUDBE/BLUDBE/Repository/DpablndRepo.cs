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
    public class DpablndRepo : Repo<Dpablnd>, IDpablndRepo
    {
        public DpablndRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<decimal?> TotalNilai(long Iddpad)
        {
            decimal? Total = await _BludContext.Dpablnd.Where(w => w.Iddpad == Iddpad).Select(s => s.Nilai).SumAsync();
            return Total;
        }

        public async Task<bool> Update(DpablndView param)
        {
            Dpablnd data = await _BludContext.Dpablnd.Where(w => w.Iddpablnd == param.Iddpablnd).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Dpablnd.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
