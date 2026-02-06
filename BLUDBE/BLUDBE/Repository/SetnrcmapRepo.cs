using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetnrcmapRepo : Repo<Setnrcmap>, ISetnrcmapRepo
    {
        public SetnrcmapRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setnrcmap>> ViewDatas(long Idrekaset)
        {
            List<Setnrcmap> result = new List<Setnrcmap>();
            IQueryable<Setnrcmap> data = (
                from aset in _BludContext.Setnrcmap
                join rekaset in _BludContext.Daftrekening on aset.Idrekaset equals rekaset.Idrek into rekasetMacth
                from rekasetData in rekasetMacth.DefaultIfEmpty()
                join rekutang in _BludContext.Daftrekening on aset.Idrekhutang equals rekutang.Idrek into rekutangMacth
                from rekutangData in rekutangMacth.DefaultIfEmpty()
                select new Setnrcmap
                {
                    Idsetnrcmap = aset.Idsetnrcmap,
                    Idrekaset = aset.Idrekaset,
                    IdrekasetNavigation = rekasetData ?? null,
                    Idrekhutang = aset.Idrekhutang,
                    IdrekhutangNavigation = rekutangData ?? null 
                }
                ).AsQueryable();
            if (Idrekaset.ToString() != "0")
            {
                data = data.Where(w => w.Idrekaset == Idrekaset).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
