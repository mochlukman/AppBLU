using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetkorolariRepo : Repo<Setkorolari>, ISetkorolariRepo
    {
        public SetkorolariRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setkorolari>> ViewDatas(long Idrek)
        {
            List<Setkorolari> result = new List<Setkorolari>();
            IQueryable<Setkorolari> data = (
                from koro in _BludContext.Setkorolari
                join rek in _BludContext.Daftrekening on koro.Idrek equals rek.Idrek into rekMacth
                from rekData in rekMacth.DefaultIfEmpty()
                join reknrc in _BludContext.Daftrekening on koro.Idreknrc equals reknrc.Idrek into reknrcMacth
                from reknrcData in reknrcMacth.DefaultIfEmpty()
                select new Setkorolari
                {
                    Idkorolari = koro.Idkorolari,
                    Idrek = koro.Idrek,
                    IdrekNavigation = rekData ?? null,
                    Idreknrc = koro.Idreknrc,
                    IdreknrcNavigation = reknrcData ?? null,
                    Kdpers = koro.Kdpers
                }
                ).AsQueryable();
            if (Idrek.ToString() != "0")
            {
                data = data.Where(w => w.Idrek == Idrek).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
