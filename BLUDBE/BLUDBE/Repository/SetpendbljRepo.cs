using BLUDBE.Interface;
using BLUDBE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SetpendbljRepo : Repo<Setpendblj>, ISetpendbljRepo
    {
        public SetpendbljRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Setpendblj>> ViewDatas(long Idrekd)
        {
            List<Setpendblj> result = new List<Setpendblj>();
            IQueryable<Setpendblj> query = (
                from data in _BludContext.Setpendblj
                join pend in _BludContext.Daftrekening on data.Idrekd equals pend.Idrek into pendMacth
                from pendData in pendMacth.DefaultIfEmpty()
                join bel in _BludContext.Daftrekening on data.Idrekr equals bel.Idrek into belMacth
                from belData in belMacth.DefaultIfEmpty()
                select new Setpendblj
                {
                    Idsetpendblj = data.Idsetpendblj,
                    Idrekd = data.Idrekd,
                    Idrekr = data.Idrekr,
                    IdrekdNavigation = pendData ?? null,
                    IdrekrNavigation = belData ?? null
                }
                ).AsQueryable();
            if (Idrekd.ToString() != "0")
            {
                query = query.Where(w => w.Idrekd == Idrekd).AsQueryable();
            }
            result = await query.ToListAsync();
            return result;
        }
    }
}
