using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class BktmemRepo : Repo<Bktmem>, IBktmemRepo
    {
        public BktmemRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;

        public async Task<bool> Update(Bktmem param)
        {
            Bktmem data = await _c.Bktmem.Where(w => w.Idbm == param.Idbm).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Uraian = param.Uraian;
            data.Referensi = param.Referensi;
            data.Tglbm = param.Tglbm;
            data.Tglvalid = param.Tglvalid;
            data.Nobm = param.Nobm;
            data.Idttd = param.Idttd;
            data.Idjbm = param.Idjbm;
            data.Dateupdate = param.Dateupdate;
            _c.Bktmem.Update(data);
            if (await _c.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<bool> Validasi(BktmemValidasi param)
        {
            Bktmem data = await _c.Bktmem.Where(w => w.Idbm == param.Idbm).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Valid = param.Valid;
            data.Tglvalid = param.Tglvalid;
            _c.Bktmem.Update(data);
            if (await _c.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Bktmem> ViewData(long Idbm)
        {
            Bktmem datas = await (
                from bktmem in _c.Bktmem
                join jbm in _c.Jbm on bktmem.Idjbm equals jbm.Idjbm
                join unit in _c.Daftunit on bktmem.Idunit equals unit.Idunit
                where bktmem.Idbm == Idbm
                select new Bktmem
                {
                    Idunit = bktmem.Idunit,
                    Idbm = bktmem.Idbm,
                    Idttd = bktmem.Idttd,
                    Idjbm = bktmem.Idjbm,
                    Nobm = bktmem.Nobm,
                    Uraian = bktmem.Uraian,
                    Referensi = bktmem.Referensi,
                    Tglbm = bktmem.Tglbm,
                    Tglvalid = bktmem.Tglvalid,
                    Datecreate = bktmem.Datecreate,
                    Dateupdate = bktmem.Dateupdate,
                    IdunitNavigation = unit ?? null,
                    IdjbmNavigation = jbm ?? null,
                    Valid = bktmem.Valid,
                    Validby = bktmem.Validby
                }
                ).FirstOrDefaultAsync();
            return datas;
        }

        public async Task<List<Bktmem>> ViewDatas(long Idunit, string Kdbm)
        {
            List<string> kdbms = Kdbm.Split(",").ToList();
            List<long> Idjmb = await _c.Jbm.Where(w => kdbms.Contains(w.Kdbm.Trim())).Select(s => s.Idjbm).ToListAsync();
            List<Bktmem> datas = await (
                from bktmem in _c.Bktmem
                join jbm in _c.Jbm on bktmem.Idjbm equals jbm.Idjbm
                join unit in _c.Daftunit on bktmem.Idunit equals unit.Idunit
                where bktmem.Idunit == Idunit && Idjmb.Contains(bktmem.Idjbm)
                select new Bktmem
                {
                    Idunit = bktmem.Idunit,
                    Idbm = bktmem.Idbm,
                    Idttd = bktmem.Idttd,
                    Idjbm = bktmem.Idjbm,
                    Nobm = bktmem.Nobm,
                    Uraian = bktmem.Uraian,
                    Referensi = bktmem.Referensi,
                    Tglbm = bktmem.Tglbm,
                    Tglvalid = bktmem.Tglvalid,
                    Datecreate = bktmem.Datecreate,
                    Dateupdate = bktmem.Dateupdate,
                    IdunitNavigation = unit ?? null,
                    IdjbmNavigation = jbm ?? null,
                    Valid = bktmem.Valid,
                    Validby = bktmem.Validby
                }
                ).ToListAsync();
            return datas;
        }
    }
}
