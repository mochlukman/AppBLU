using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DaftreklakRepo : Repo<Daftreklak>, IDaftreklakRepo
    {
        public DaftreklakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;

        public async Task<bool> Update(Daftreklak param)
        {
            Daftreklak data = await _c.Daftreklak.Where(w => w.Idrek == param.Idrek).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nlakawal = param.Nlakawal;
            data.Dateupdate = param.Dateupdate;
            _c.Daftreklak.Update(data);
            if (await _c.SaveChangesAsync() > 0) return true;
            return false;

        }

        public async Task<Daftreklak> ViewData(long Idrek)
        {
            Daftreklak data = await (
                from rek in _c.Daftreklak
                join jns in _c.Jnslak on rek.Idjnslak equals jns.Idjnslak
                where rek.Idrek == Idrek
                select new Daftreklak
                {
                    Idjnslak = rek.Idjnslak,
                    Datecreate = rek.Datecreate,
                    Dateupdate = rek.Dateupdate,
                    Idrek = rek.Idrek,
                    Kdkhusus = rek.Kdkhusus,
                    Kdper = rek.Kdper,
                    Mtglevel = rek.Mtglevel,
                    Nlakawal = rek.Nlakawal,
                    Nmper = rek.Nmper,
                    Staktif = rek.Staktif,
                    Type = rek.Type,
                    IdjnslakNavigation = jns ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Daftreklak>> ViewDatas(List<int?> Idjnslak, int Mtglevel, string Type)
        {
            IEnumerable<Daftreklak> data = await (
                from rek in _c.Daftreklak
                join jns in _c.Jnslak on rek.Idjnslak equals jns.Idjnslak
                select new Daftreklak
                {
                    Idjnslak = rek.Idjnslak,
                    Datecreate = rek.Datecreate,
                    Dateupdate = rek.Dateupdate,
                    Idrek = rek.Idrek,
                    Kdkhusus = rek.Kdkhusus,
                    Kdper = rek.Kdper,
                    Mtglevel = rek.Mtglevel,
                    Nlakawal = rek.Nlakawal,
                    Nmper = rek.Nmper,
                    Staktif = rek.Staktif,
                    Type = rek.Type,
                    IdjnslakNavigation = jns ?? null
                }
                ).ToListAsync();
            data = data.AsQueryable();
            if(Idjnslak.Count() > 0)
            {
                data = data.Where(w => Idjnslak.Contains(w.Idjnslak));
            }
            if(Mtglevel.ToString() != "0")
            {
                data = data.Where(w => w.Mtglevel == Mtglevel).AsQueryable();
            }
            if (!String.IsNullOrEmpty(Type))
            {
                data = data.Where(w => w.Type.Trim() == Type.Trim()).AsQueryable();
            }
            return data.ToList();
        }
    }
}
