using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetupdloRepo : Repo<Setupdlo>, ISetupdloRepo
    {
        public SetupdloRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setupdlo>> ViewDatas(long Idreklo)
        {
            List<Setupdlo> result = new List<Setupdlo>();
            IQueryable<Setupdlo> data = (
                from lo in _BludContext.Setupdlo
                join reklo in _BludContext.Daftrekening on lo.Idreklo equals reklo.Idrek into rekloMacth
                from rekloData in rekloMacth.DefaultIfEmpty()
                join reknrc in _BludContext.Daftrekening on lo.Idreknrc equals reknrc.Idrek into reknrcMacth
                from reknrcData in reknrcMacth.DefaultIfEmpty()
                select new Setupdlo
                {
                    Idsetupdlo = lo.Idsetupdlo,
                    Idreklo = lo.Idreklo,
                    Idreknrc = lo.Idreknrc,
                    IdrekloNavigation = rekloData ?? null,
                    IdreknrcNavigation = reknrcData ?? null
                }
                ).AsQueryable();
            if (Idreklo.ToString() != "0")
            {
                data = data.Where(w => w.Idreklo == Idreklo).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
