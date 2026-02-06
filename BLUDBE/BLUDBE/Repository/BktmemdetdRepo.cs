using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BktmemdetdRepo : Repo<Bktmemdetd>, IBktmemdetdRepo
    {
        public BktmemdetdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _ctx => _context as BludContext;
        public async Task<bool> Update(long Idbmdet, long Nilai)
        {
            Bktmemdetd data = await _ctx.Bktmemdetd.Where(w => w.Idbmdetd == Idbmdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = Nilai;
            _ctx.Bktmemdetd.Update(data);
            if (await _ctx.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}
