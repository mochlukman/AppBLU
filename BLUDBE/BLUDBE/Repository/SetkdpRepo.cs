using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetkdpRepo : Repo<Setkdp>, ISetkdpRepo
    {
        public SetkdpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setkdp>> ViewDatas(long Idrekkdp)
        {
            List<Setkdp> result = new List<Setkdp>();
            IQueryable<Setkdp> data = (
                from kdp in _BludContext.Setkdp
                join rekaset in _BludContext.Daftrekening on kdp.Idrekkdp equals rekaset.Idrek into rekasetMacth
                from rekasetData in rekasetMacth.DefaultIfEmpty()
                join rekmodal in _BludContext.Daftrekening on kdp.Idrekbm equals rekmodal.Idrek into rekmodalMacth
                from rekmodalData in rekmodalMacth.DefaultIfEmpty()
                select new Setkdp
                {
                    Idsetkdp = kdp.Idsetkdp,
                    Idrekbm = kdp.Idrekbm,
                    IdrekbmNavigation = rekmodalData ?? null,
                    Idrekkdp = kdp.Idrekkdp,
                    IdrekkdpNavigation = rekasetData ?? null
                }
                ).AsQueryable();
            if (Idrekkdp.ToString() != "0")
            {
                data = data.Where(w => w.Idrekkdp == Idrekkdp).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
