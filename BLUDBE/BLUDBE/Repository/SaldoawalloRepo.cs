using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SaldoawalloRepo : Repo<Saldoawallo>, ISaldoawalloRepo
    {
        public SaldoawalloRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;
        public async Task<bool> Update(Saldoawallo param)
        {
            Saldoawallo data = await _c.Saldoawallo.Where(w => w.Idsaldo == param.Idsaldo).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _c.Saldoawallo.Update(data);
            if (await _c.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Saldoawallo> ViewData(long Idsaldo)
        {
            Saldoawallo data = await (
                from d in _c.Saldoawallo
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                join jakun in _c.Jnsakun on d.Idjnsakun equals jakun.Idjnsakun
                where d.Idsaldo == Idsaldo
                select new Saldoawallo
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

        public async Task<List<Saldoawallo>> ViewDatas(long Idunit, long Idjnsakun)
        {
            List<Saldoawallo> data = await (
                from d in _c.Saldoawallo
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                join jakun in _c.Jnsakun on d.Idjnsakun equals jakun.Idjnsakun
                where d.Idunit == Idunit && d.Idjnsakun == Idjnsakun
                select new Saldoawallo
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
