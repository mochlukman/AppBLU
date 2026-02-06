using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkustsspjtrRepo : Repo<Bkustsspjtr>, IBkustsspjtrRepo
    {
        public BkustsspjtrRepo(DbContext context) : base(context)
        {
        }
        BludContext _BludContext => _context as BludContext;
        public async Task<BkustsspjtrView> ViewData(long Idbkustsspjtr)
        {
            BkustsspjtrView data = await (
                from src in _BludContext.Bkustsspjtr
                join spjtr in _BludContext.Spjtr on src.Idspjtr equals spjtr.Idspjtr
                join bkusts in _BludContext.Bkusts on src.Idbkusts equals bkusts.Idbkusts
                where src.Idbkustsspjtr == Idbkustsspjtr
                select new BkustsspjtrView
                {
                    Idspjtr = src.Idspjtr,
                    Idbkusts = src.Idbkusts,
                    Datecreate = src.Datecreate,
                    Dateupdate = src.Dateupdate,
                    Idbkustsspjtr = src.Idbkustsspjtr,
                    IdspjtrNavigation = spjtr ?? null,
                    IdbkustsNavigation = bkusts ?? null,
                    Nilai = _BludContext.Stsdetd.Where(w => w.Idsts == bkusts.Idsts).Select(s => s.Nilai).Sum()
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<BkustsspjtrView>> ViewDatas(long Idspjtr)
        {
            List<BkustsspjtrView> data = await (
                from src in _BludContext.Bkustsspjtr
                join spjtr in _BludContext.Spjtr on src.Idspjtr equals spjtr.Idspjtr
                join bkusts in _BludContext.Bkusts on src.Idbkusts equals bkusts.Idbkusts
                where src.Idspjtr == Idspjtr
                select new BkustsspjtrView
                {
                    Idspjtr = src.Idspjtr,
                    Idbkusts = src.Idbkusts,
                    Datecreate = src.Datecreate,
                    Dateupdate = src.Dateupdate,
                    Idbkustsspjtr = src.Idbkustsspjtr,
                    IdspjtrNavigation = spjtr ?? null,
                    IdbkustsNavigation = bkusts ?? null,
                    Nilai = _BludContext.Stsdetd.Where(w => w.Idsts == bkusts.Idsts).Select(s => s.Nilai).Sum()
                }
                ).ToListAsync();
            return data;
        }
    }
}
