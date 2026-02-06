using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetrlraloRepo : Repo<Setrlralo>, ISetrlraloRepo
    {
        public SetrlraloRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setrlralo>> ViewDatas(long Idreklo)
        {
            List<Setrlralo> result = new List<Setrlralo>();
            IQueryable<Setrlralo> data = (
                from lo in _BludContext.Setrlralo
                join reklo in _BludContext.Daftrekening on lo.Idreklo equals reklo.Idrek into rekloMacth
                from rekloData in rekloMacth.DefaultIfEmpty()
                join reklra in _BludContext.Daftrekening on lo.Idreklra equals reklra.Idrek into reklraMacth
                from reklraData in reklraMacth.DefaultIfEmpty()
                select new Setrlralo
                {
                    Idsetrlralo = lo.Idsetrlralo,
                    Idreklo = lo.Idreklo,
                    Idreklra = lo.Idreklra,
                    IdrekloNavigation = rekloData ?? null,
                    IdreklraNavigation = reklraData ?? null
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
