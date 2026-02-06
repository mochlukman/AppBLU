using BLUDBE.Interface;
using BLUDBE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SetdapbdrbaRepo : Repo<Setdapbdrba>, ISetdapbdrbaRepo
    {
        public SetdapbdrbaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Setdapbdrba>> ViewDatas(long Idrekapbd)
        {
            List<Setdapbdrba> result = new List<Setdapbdrba>();
            IQueryable<Setdapbdrba> query = (
                from data in _BludContext.Setdapbdrba
                join apbd in _BludContext.Daftrekening on data.Idrekapbd equals apbd.Idrek into apbdMacth
                from apbdData in apbdMacth.DefaultIfEmpty()
                join rba in _BludContext.Daftrekening on data.Idrekrba equals rba.Idrek into rbaMacth
                from rbaData in rbaMacth.DefaultIfEmpty()
                select new Setdapbdrba
                {
                    Idsetdapbdrba = data.Idsetdapbdrba,
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
