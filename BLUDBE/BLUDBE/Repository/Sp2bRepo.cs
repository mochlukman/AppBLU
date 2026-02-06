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
    public class Sp2bRepo : Repo<Sp2b>, ISp2bRepo
    {
        public Sp2bRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Sp2b>> ViewDatas(Sp2bGet param)
        {
            List<Sp2b> Result = new List<Sp2b>();
            IQueryable<Sp2b> query = (
                    from data in _BludContext.Sp2b
                    join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                    from unitData in unitMatch.DefaultIfEmpty()
                    select new Sp2b
                    {
                        Idsp2b = data.Idsp2b,
                        Nosp2b = data.Nosp2b,
                        Tglsp2b = data.Tglsp2b,
                        Uraian = data.Uraian,
                        Idunit = data.Idunit,
                        Tglvalid = data.Tglvalid,
                        Valid = data.Valid,
                        Validby = data.Validby,
                        Datecreate = data.Datecreate,
                        Dateupdate = data.Dateupdate
                    }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<bool> Pengesahan(Sp2b param)
        {
            Sp2b data = await _BludContext.Sp2b.Where(w => w.Idsp2b == param.Idsp2b).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglvalid = param.Tglvalid;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            _BludContext.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
