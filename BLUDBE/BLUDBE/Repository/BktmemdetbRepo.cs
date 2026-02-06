using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BktmemdetbRepo : Repo<Bktmemdetb>, IBktmemdetbRepo
    {
        public BktmemdetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _ctx => _context as BludContext;

        public async Task<bool> Update(long Idbmdet, long Nilai)
        {
            Bktmemdetb data = await _ctx.Bktmemdetb.Where(w => w.Idbmdetb == Idbmdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = Nilai;
            _ctx.Bktmemdetb.Update(data);
            if (await _ctx.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}
