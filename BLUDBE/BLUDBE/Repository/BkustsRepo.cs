using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkustsRepo : Repo<Bkusts>, IBkustsRepo
    {
        public BkustsRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> UpdateValid(Bkusts param)
        {
            Bkusts data = await _BludContext.Bkusts.Where(w => w.Idbkusts == param.Idbkusts).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valid = param.Valid;
            data.Tglvalid = param.Tglvalid;
            data.Validby = param.Validby;
            _BludContext.Bkusts.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<List<Bkusts>> ViewDatas(long Idunit, long Idbend)
        {
            List<Bkusts> data = await (
                from src in _BludContext.Bkusts
                join sts in _BludContext.Sts on src.Idsts equals sts.Idsts
                where src.Idunit == Idunit && src.Idbend == Idbend
                select new Bkusts
                {
                    Datecreate = src.Datecreate,
                    Idbend = src.Idbend,
                    Idunit = src.Idunit,
                    Idbkusts = src.Idbkusts,
                    Dateupdate = src.Dateupdate,
                    Idsts = src.Idsts,
                    Idttd = src.Idttd,
                    IdstsNavigation = sts ?? null,
                    Tglbkuskpd = src.Tglbkuskpd,
                    Tglvalid = src.Tglvalid,
                    Uraian = src.Uraian,
                    Nobkuskpd = src.Nobkuskpd
                }
                ).ToListAsync();
            return data;
        }

        public async Task<List<Bkusts>> ViewDatasForSpjtr(long Idspjtr, long Idunit, long Idbend)
        {
            List<long> Idsbkusts = await _BludContext.Bkustsspjtr.Where(w => w.Idspjtr == Idspjtr).Select(s => s.Idbkusts).ToListAsync();
            List<Bkusts> data = await (
                from src in _BludContext.Bkusts
                join sts in _BludContext.Sts on src.Idsts equals sts.Idsts
                where src.Idunit == Idunit && src.Idbend == Idbend && !Idsbkusts.Contains(src.Idbkusts)
                select new Bkusts
                {
                    Datecreate = src.Datecreate,
                    Idbend = src.Idbend,
                    Idunit = src.Idunit,
                    Idbkusts = src.Idbkusts,
                    Dateupdate = src.Dateupdate,
                    Idsts = src.Idsts,
                    Idttd = src.Idttd,
                    IdstsNavigation = sts ?? null,
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
