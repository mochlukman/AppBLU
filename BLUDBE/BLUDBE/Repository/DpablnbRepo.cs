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
    public class DpablnbRepo : Repo<Dpablnb>, IDpablnbRepo
    {
        public DpablnbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<decimal?> TotalNilai(long Iddpab)
        {
            decimal? Total = await _BludContext.Dpablnb.Where(w => w.Iddpab == Iddpab).Select(s => s.Nilai).SumAsync();
            return Total;
        }

        public async Task<bool> Update(DpablnbView param)
        {
            Dpablnb data = await _BludContext.Dpablnb.Where(w => w.Iddpablnb == param.Iddpablnb).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Dpablnb.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
