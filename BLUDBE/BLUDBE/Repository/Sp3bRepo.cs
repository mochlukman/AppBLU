using BLUDBE.Dto;
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
    public class Sp3bRepo : Repo<Sp3b>, ISp3bRepo
    {
        public Sp3bRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Sp3b>> ViewDatas(Sp3bGet param)
        {
            List<Sp3b> Result = new List<Sp3b>();
            IQueryable<Sp3b> query = (
                    from data in _BludContext.Sp3b
                    join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                    from unitData in unitMatch.DefaultIfEmpty()
                    select new Sp3b
                    {
                        Idsp3b = data.Idsp3b,
                        Idunit = data.Idunit,
                        Nosp3b = data.Nosp3b,
                        Tglsp3b = data.Tglsp3b,
                        Uraisp3b = data.Uraisp3b,
                        Tglvalid = data.Tglvalid,
                        Valid = data.Valid,
                        Keybend = data.Keybend,
                        Validby = data.Validby,
                        Datecreate = data.Datecreate,
                        Dateupdate = data.Dateupdate,
                        IdunitNavigation = unitData ?? null
                    }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if(param.forSp2b == true)
            {
                List<long?> idsp3bs = await _BludContext.Sp2bdet.Select(s => s.Idsp3b).ToListAsync();
                if(idsp3bs.Count() > 0)
                {
                    query = query.Where(w => !idsp3bs.Contains(w.Idsp3b)).AsQueryable();
                }
            }
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<bool> Pengesahan(Sp3b param)
        {
            Sp3b data = await _BludContext.Sp3b.Where(w => w.Idsp3b == param.Idsp3b).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglvalid = param.Tglvalid;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            _BludContext.Update(data);
            if(await _BludContext.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
