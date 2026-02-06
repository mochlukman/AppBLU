using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SaldoawallraRepo : Repo<Saldoawallra>, ISaldoawallraRepo
    {
        public SaldoawallraRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;
        public async Task<bool> Update(Saldoawallra param)
        {
            Saldoawallra data = await _c.Saldoawallra.Where(w => w.Idsaldo == param.Idsaldo).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _c.Saldoawallra.Update(data);
            if (await _c.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Saldoawallra> ViewData(long Idsaldo)
        {
            Saldoawallra data = await (
                from d in _c.Saldoawallra
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                join jakun in _c.Jnsakun on d.Idjnsakun equals jakun.Idjnsakun
                where d.Idsaldo == Idsaldo
                select new Saldoawallra
                {
                    Idsaldo = d.Idsaldo,
                    Idunit = d.Idunit,
                    Idrek = d.Idrek,
                    Nilai = d.Nilai,
                    Stvalid = d.Stvalid,
                    Idjnsakun = d.Idjnsakun,
                    Datecreate = d.Datecreate,
                    Dateupdate = d.Dateupdate,
                    IdrekNavigation = rek ?? null,
                    IdunitNavigation = unit ?? null,
                    IdjnsakunNavigation = jakun ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Saldoawallra>> ViewDatas(long Idunit, long Idjnsakun)
        {
            List<Saldoawallra> data = await (
                from d in _c.Saldoawallra
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                join jakun in _c.Jnsakun on d.Idjnsakun equals jakun.Idjnsakun
                where d.Idunit == Idunit && d.Idjnsakun == Idjnsakun
                select new Saldoawallra
                {
                    Idsaldo = d.Idsaldo,
                    Idunit = d.Idunit,
                    Idrek = d.Idrek,
                    Nilai = d.Nilai,
                    Stvalid = d.Stvalid,
                    Idjnsakun = d.Idjnsakun,
                    Datecreate = d.Datecreate,
                    Dateupdate = d.Dateupdate,
                    IdrekNavigation = rek ?? null,
                    IdunitNavigation = unit ?? null,
                    IdjnsakunNavigation = jakun ?? null
                }
                ).ToListAsync();
            return data;
        }
    }
}
