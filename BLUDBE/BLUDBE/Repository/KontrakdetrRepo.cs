using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class KontrakdetrRepo : Repo<Kontrakdetr>, IKontrakdetrRepo
    {
        public KontrakdetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<decimal?> getTotalNilaiByIdKontrak(long Idkontrak)
        {
            decimal? Total = await _BludContext.Kontrakdetr.Where(w => w.Idkontrak == Idkontrak).SumAsync(s => s.Nilai);
            return Total;
        }

        public async Task<bool> Update(Kontrakdetr param)
        {
            Kontrakdetr data = await _BludContext.Kontrakdetr.Where(w => w.Iddetkontrak == param.Iddetkontrak).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Idrek = param.Idrek;
                data.Nilai = param.Nilai;
                data.Idbulan = param.Idbulan;
                data.Idjtermorlun = param.Idjtermorlun;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Kontrakdetr.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
