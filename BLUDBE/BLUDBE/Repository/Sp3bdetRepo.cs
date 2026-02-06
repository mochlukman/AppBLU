using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class Sp3bdetRepo : Repo<Sp3bdet>, ISp3bdetRepo
    {
        public Sp3bdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Sp3bdet>> ViewDatas(Sp3bdetGet param)
        {
            List<Sp3bdet> Result = new List<Sp3bdet>();
            IQueryable<Sp3bdet> query = (
                    from data in _BludContext.Sp3bdet
                    join sp3b in _BludContext.Sp3b on data.Idsp3b equals sp3b.Idsp3b into sp3bMatch
                    from sp3bData in sp3bMatch.DefaultIfEmpty()
                    join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek into rekMatch
                    from rekData in rekMatch.DefaultIfEmpty()
                    select new Sp3bdet
                    {
                        Idsp3b = sp3bData.Idsp3b,
                        Idunit = sp3bData.Idunit,
                        Datecreate = sp3bData.Datecreate,
                        Dateupdate = sp3bData.Dateupdate,
                        Idsp3bdet = data.Idsp3bdet,
                        Nospj = data.Nospj,
                        Nilai = data.Nilai,
                        Idrek = data.Idrek,
                        Idjnsakun = data.Idjnsakun,
                        IdrekNavigation = rekData ?? null,
                        Idsp3bNavigation = sp3bData ?? null
                    }
                ).AsQueryable();
            if (param.Idsp3b.ToString() != "0")
            {
                query = query.Where(w => w.Idsp3b == param.Idsp3b).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
