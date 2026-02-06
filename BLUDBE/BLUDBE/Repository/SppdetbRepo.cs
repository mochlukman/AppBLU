using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SppdetbRepo : Repo<Sppdetb>, ISppdetbRepo
    {
        public SppdetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<decimal?> TotalNilaiSpp(List<long> Idspp)
        {
            decimal? total = await _BludContext.Sppdetb.Where(w => Idspp.Contains(w.Idspp)).SumAsync(s => s.Nilai);
            return total;
        }
        public async Task<bool> Update(Sppdetb param)
        {
            Sppdetb data = await _BludContext.Sppdetb.Where(w => w.Idsppdetb == param.Idsppdetb).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Sppdetb.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
        public async Task<bool> UpdateNilai(long Idsspdetb, decimal? Nilai, DateTime? Dateupdate, string Updateby)
        {
            Sppdetb data = await _BludContext.Sppdetb.Where(w => w.Idsppdetb == Idsspdetb).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = Nilai;
                data.Updatedate = Dateupdate;
                data.Updateby = Updateby;
                _BludContext.Sppdetb.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
