using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BulanRepo : Repo<Bulan>, IBulanRepo
    {
        public BulanRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Bulan param)
        {
            Bulan data = await _BludContext.Bulan.Where(w => w.Idbulan == param.Idbulan).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdperiode = param.Kdperiode;
            data.KetBulan = param.KetBulan;
            _BludContext.Bulan.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
