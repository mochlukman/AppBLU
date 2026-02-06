using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SaldoawalnrcRepo : Repo<Saldoawalnrc>, ISaldoawalnrcRepo
    {
        public SaldoawalnrcRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;

        public async Task<bool> Update(Saldoawalnrc param)
        {
            Saldoawalnrc data = await _c.Saldoawalnrc.Where(w => w.Idsaldo == param.Idsaldo).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Kdpers = param.Kdpers;
            data.Dateupdate = param.Dateupdate;
            _c.Saldoawalnrc.Update(data);
            if (await _c.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Saldoawalnrc> ViewData(long Idsaldo)
        {
            Saldoawalnrc data = await (
                from d in _c.Saldoawalnrc
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                where d.Idsaldo == Idsaldo
                select new Saldoawalnrc
                {
                    Idsaldo = d.Idsaldo,
                    Kdpers = d.Kdpers,
                    Idunit = d.Idunit,
                    Idrek = d.Idrek,
                    Nilai = d.Nilai,
                    Stvalid = d.Stvalid,
                    Datecreate = d.Datecreate,
                    Dateupdate = d.Dateupdate,
                    IdrekNavigation = rek ?? null,
                    IdunitNavigation = unit ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Saldoawalnrc>> ViewDatas(long Idunit)
        {
            List<Saldoawalnrc> data = await (
                from d in _c.Saldoawalnrc
                join rek in _c.Daftrekening on d.Idrek equals rek.Idrek
                join unit in _c.Daftunit on d.Idunit equals unit.Idunit
                where d.Idunit == Idunit
                select new Saldoawalnrc
                {
                    Idsaldo = d.Idsaldo,
                    Kdpers = d.Kdpers,
                    Idunit = d.Idunit,
                    Idrek = d.Idrek,
                    Nilai = d.Nilai,
                    Stvalid = d.Stvalid,
                    Datecreate = d.Datecreate,
                    Dateupdate = d.Dateupdate,
                    IdrekNavigation = rek ?? null,
                    IdunitNavigation = unit ?? null
                }
                ).ToListAsync();
            return data;
        }
    }
}
