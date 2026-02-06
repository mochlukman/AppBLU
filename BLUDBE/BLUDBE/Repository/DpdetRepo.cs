using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DpdetRepo : Repo<Dpdet>, IDpdetRepo
    {
        public DpdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<Dpdet> ViewData(long Iddpdet)
        {
            Dpdet data = await (
                from det in _BludContext.Dpdet
                join sp2d in _BludContext.Sp2d on det.Idsp2d equals sp2d.Idsp2d
                where det.Iddpdet == Iddpdet
                select new Dpdet
                {
                    Iddp = det.Iddp,
                    Iddpdet = det.Iddpdet,
                    Idsp2d = det.Idsp2d,
                    Datecreate = det.Datecreate,
                    Idsp2dNavigation = sp2d ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Dpdet>> ViewDatas(long Iddp)
        {
            List<Dpdet> data = await (
                from det in _BludContext.Dpdet
                join sp2d in _BludContext.Sp2d on det.Idsp2d equals sp2d.Idsp2d
                where det.Iddp == Iddp
                select new Dpdet
                {
                    Iddp = det.Iddp,
                    Iddpdet = det.Iddpdet,
                    Idsp2d = det.Idsp2d,
                    Datecreate = det.Datecreate,
                    Idsp2dNavigation = sp2d ?? null
                }
                ).ToListAsync();
            return data;
        }
    }
}
