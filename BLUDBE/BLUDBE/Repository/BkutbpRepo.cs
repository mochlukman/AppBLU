using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkutbpRepo : Repo<Bkutbp>, IBkutbpRepo
    {
        public BkutbpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> UpdateValid(Bkutbp param)
        {
            Bkutbp data = await _BludContext.Bkutbp.Where(w => w.Idbkutbp == param.Idbkutbp).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valid = param.Valid;
            data.Tglvalid = param.Tglvalid;
            data.Validby = param.Validby;
            _BludContext.Bkutbp.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<List<Bkutbp>> ViewDatas(long Idunit, long Idbend)
        {
            List<Bkutbp> data = await (
                from src in _BludContext.Bkutbp
                join tbp in _BludContext.Tbp on src.Idtbp equals tbp.Idtbp
                where src.Idunit == Idunit && src.Idbend == Idbend
                select new Bkutbp
                {
                    Datecreate = src.Datecreate,
                    Idbend = src.Idbend,
                    Idunit = src.Idunit,
                    Idbkutbp = src.Idbkutbp,
                    Dateupdate = src.Dateupdate,
                    Idtbp = src.Idtbp,
                    Idttd = src.Idttd,
                    IdtbpNavigation = tbp ?? null,
                    Tglbkuskpd = src.Tglbkuskpd,
                    Tglvalid = src.Tglvalid,
                    Uraian = src.Uraian,
                    Nobkuskpd = src.Nobkuskpd
                }
                ).ToListAsync();
            return data;
        }

        public async Task<List<Bkutbp>> ViewDatasForSpjtr(long Idspjtr, long Idunit, long Idbend)
        {
            List<long> Idsbkutbp = await _BludContext.Bkutbpspjtr.Where(w => w.Idspjtr == Idspjtr).Select(s => s.Idbkutbp).ToListAsync();
            List<Bkutbp> data = await (
                from src in _BludContext.Bkutbp
                join tbp in _BludContext.Tbp on src.Idtbp equals tbp.Idtbp
                where src.Idunit == Idunit && src.Idbend == Idbend && !Idsbkutbp.Contains(src.Idbkutbp)
                select new Bkutbp
                {
                    Datecreate = src.Datecreate,
                    Idbend = src.Idbend,
                    Idunit = src.Idunit,
                    Idbkutbp = src.Idbkutbp,
                    Dateupdate = src.Dateupdate,
                    Idtbp = src.Idtbp,
                    Idttd = src.Idttd,
                    IdtbpNavigation = tbp ?? null,
                    Tglbkuskpd = src.Tglbkuskpd,
                    Tglvalid = src.Tglvalid,
                    Uraian = src.Uraian,
                    Nobkuskpd = src.Nobkuskpd
                }
                ).ToListAsync();
            return data;
        }
    }
}
