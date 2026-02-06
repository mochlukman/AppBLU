using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetdlraloRepo : Repo<Setdlralo>, ISetdlraloRepo
    {
        public SetdlraloRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setdlralo>> ViewDatas(long Idreklo)
        {
            List<Setdlralo> result = new List<Setdlralo>();
            IQueryable<Setdlralo> data = (
                from lo in _BludContext.Setdlralo
                join reklo in _BludContext.Daftrekening on lo.Idreklo equals reklo.Idrek into rekloMacth
                from rekloData in rekloMacth.DefaultIfEmpty()
                join reklra in _BludContext.Daftrekening on lo.Idreklra equals reklra.Idrek into reklraMacth
                from reklraData in reklraMacth.DefaultIfEmpty()
                select new Setdlralo
                {
                    Idsetdlralo = lo.Idsetdlralo,
                    Idreklo = lo.Idreklo,
                    Idreklra = lo.Idreklra,
                    IdrekloNavigation = rekloData ?? null,
                    IdreklraNavigation = reklraData ?? null
                }
                ).AsQueryable();
            if(Idreklo.ToString() != "0")
            {
                data = data.Where(w => w.Idreklo == Idreklo).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
