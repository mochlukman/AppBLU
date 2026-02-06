using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TagihandetRepo : Repo<Tagihandet>, ITagihandetRepo
    {
        public TagihandetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public decimal? TotalTagihan(long Idtagihan)
        {
            decimal? total = _BludContext.Tagihandet.Where(w => w.Idtagihan == Idtagihan).Sum(s => s.Nilai);
            return total;
        }

        public async Task<bool> Update(Tagihandet param)
        {
            Tagihandet data = await _BludContext.Tagihandet.Where(w => w.Idtagihandet == param.Idtagihandet).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Idrek = param.Idrek;
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Tagihandet.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
