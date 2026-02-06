using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class Bkusp2dRepo : Repo<Bkusp2d>, IBkusp2dRepo
    {
        public Bkusp2dRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> UpdateValid(Bkusp2d param)
        {
            Bkusp2d data = await _BludContext.Bkusp2d.Where(w => w.Idbkusp2d == param.Idbkusp2d).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valid = param.Valid;
            data.Tglvalid = param.Tglvalid;
            data.Validby = param.Validby;
            _BludContext.Bkusp2d.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
