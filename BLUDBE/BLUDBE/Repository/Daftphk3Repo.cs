using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class Daftphk3Repo : Repo<Daftphk3>, IDaftphk3Repo
    {
        public Daftphk3Repo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Daftphk3 param)
        {
            Daftphk3 data = await _BludContext.Daftphk3.Where(w => w.Idphk3 == param.Idphk3).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmphk3 = param.Nmphk3;
                data.Nminst = param.Nminst;
                data.Idbank = param.Idbank;
                data.Cabangbank = param.Cabangbank;
                data.Alamatbank = param.Alamatbank;
                data.Norekbank = param.Norekbank;
                data.Namapemilik = param.Namapemilik;
                data.Idjusaha = param.Idjusaha;
                data.Alamat = param.Alamat;
                data.Telepon = param.Telepon;
                data.Npwp = param.Npwp;
                data.Warganegara = param.Warganegara;
                data.Stpenduduk = param.Stpenduduk;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Daftphk3.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<List<Daftphk3>> viewDatas(long Idunit)
        {
            List<Daftphk3> Result = new List<Daftphk3>();
            IQueryable<Daftphk3> Query = (
                from data in _BludContext.Daftphk3
                join bank in _BludContext.Daftbank on data.Idbank equals bank.Idbank into bankMatch
                from bankData in bankMatch.DefaultIfEmpty()
                join usaha in _BludContext.Jusaha on data.Idjusaha equals usaha.Idjusaha into usahMatch
                from usahData in usahMatch.DefaultIfEmpty()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                from unitData in unitMatch.DefaultIfEmpty()
                select new Daftphk3
                {
                    Idunit = data.Idunit,
                    Idjusaha = data.Idjusaha,
                    Idbank = data.Idbank,
                    Alamat = data.Alamat,
                    Alamatbank = data.Alamatbank,
                    Cabangbank = data.Cabangbank,
                    Idphk3 = data.Idphk3,
                    Nminst = data.Nminst,
                    Nmphk3 = data.Nmphk3,
                    Namapemilik = data.Namapemilik,
                    Npwp = data.Npwp,
                    Norekbank = data.Norekbank,
                    Stvalid = data.Stvalid,
                    Telepon = data.Telepon,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdbankNavigation = bankData ?? null,
                    IdjusahaNavigation = usahData ?? null,
                    IdunitNavigation = unitData ?? null
                }
                ).AsQueryable();
            if (Idunit.ToString() != "0")
            {
                Query = Query.Where(w => w.Idunit == Idunit).AsQueryable();
            }
            Result = await Query.ToListAsync();
            return Result;
        }
    }
}
