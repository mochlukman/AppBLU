using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BktmemdetrRepo : Repo<Bktmemdetr>, IBktmemdetrRepo
    {
        public BktmemdetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _ctx => _context as BludContext;
        public async Task<bool> Update(long Idbmdet, long Nilai)
        {
            Bktmemdetr data = await _ctx.Bktmemdetr.Where(w => w.Idbmdetr == Idbmdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = Nilai;
            _ctx.Bktmemdetr.Update(data);
            if (await _ctx.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}
