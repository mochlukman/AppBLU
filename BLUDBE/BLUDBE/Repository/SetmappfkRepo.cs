using BLUDBE.Interface;
using BLUDBE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SetmappfkRepo : Repo<Setmappfk>, ISetmappfkRepo
    {
        public SetmappfkRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Setmappfk>> ViewDatas(long Idreknrc)
        {
            List<Setmappfk> result = new List<Setmappfk>();
            IQueryable<Setmappfk> query = (
                from data in _BludContext.Setmappfk
                join nrc in _BludContext.Daftrekening on data.Idreknrc equals nrc.Idrek into nrcMacth
                from nrcData in nrcMacth.DefaultIfEmpty()
                join pajak in _BludContext.Jnspajak on data.Idrekpot equals pajak.Idjnspajak into pajakMacth
                from pajakData in pajakMacth.DefaultIfEmpty()
                select new Setmappfk
                {
                    Idmappfk = data.Idmappfk,
                    Idreknrc = data.Idreknrc,
                    Idrekpot = data.Idrekpot,
                    IdreknrcNavigation = nrcData ?? null,
                    IdrekpotNavigation = pajakData ?? null
                }
                ).AsQueryable();
            if (Idreknrc.ToString() != "0")
            {
                query = query.Where(w => w.Idreknrc == Idreknrc).AsQueryable();
            }
            result = await query.ToListAsync();
            return result;
        }
    }
}
