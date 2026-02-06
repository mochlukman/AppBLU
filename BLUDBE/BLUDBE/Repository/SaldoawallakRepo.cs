using BLUDBE.Interface;
using BLUDBE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SaldoawallakRepo : Repo<Saldoawallak>, ISaldoawallakRepo
    {
        public SaldoawallakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Saldoawallak param)
        {
            Saldoawallak data = await _BludContext.Saldoawallak.Where(w => w.Idsaldo == param.Idsaldo).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Saldoawallak.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<List<Saldoawallak>> ViewDatas(long Idunit)
        {
            List<Saldoawallak> data = await (
                from d in _BludContext.Saldoawallak
                join rek in _BludContext.Daftreklak on d.Idrek equals rek.Idrek into rekMacth
                from rekData in rekMacth.DefaultIfEmpty()
                join unit in _BludContext.Daftunit on d.Idunit equals unit.Idunit into unitMacth
                from uniData in unitMacth.DefaultIfEmpty()
                where d.Idunit == Idunit
                select new Saldoawallak
                {
                    Idsaldo = d.Idsaldo,
                    Idunit = d.Idunit,
                    Idrek = d.Idrek,
                    Nilai = d.Nilai,
                    Stvalid = d.Stvalid,
                    Datecreate = d.Datecreate,
                    Dateupdate = d.Dateupdate,
                    IdrekNavigation = rekData ?? null,
                    IdunitNavigation = uniData ?? null
                }
                ).ToListAsync();
            return data;
        }
    }
}