using BLUDBE.Interface;
using BLUDBE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SetrapbdrbaRepo : Repo<Setrapbdrba>, ISetrapbdrbaRepo
    {
        public SetrapbdrbaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Setrapbdrba>> ViewDatas(long Idrekapbd)
        {
            List<Setrapbdrba> result = new List<Setrapbdrba>();
            IQueryable<Setrapbdrba> query = (
                from data in _BludContext.Setrapbdrba
                join apbd in _BludContext.Daftrekening on data.Idrekapbd equals apbd.Idrek into apbdMacth
                from apbdData in apbdMacth.DefaultIfEmpty()
                join rba in _BludContext.Daftrekening on data.Idrekrba equals rba.Idrek into rbaMacth
                from rbaData in rbaMacth.DefaultIfEmpty()
                select new Setrapbdrba
                {
                    Idsetrapbdrba = data.Idsetrapbdrba,
                    Idrekapbd = data.Idrekapbd,
                    Idrekrba = data.Idrekrba,
                    IdrekapbdNavigation = apbdData ?? null,
                    IdrekrbaNavigation = rbaData ?? null
                }
                ).AsQueryable();
            if (Idrekapbd.ToString() != "0")
            {
                query = query.Where(w => w.Idrekapbd == Idrekapbd).AsQueryable();
            }
            result = await query.ToListAsync();
            return result;
        }
    }
}
