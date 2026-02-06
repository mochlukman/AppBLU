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
    public class BkutbpspjtrRepo : Repo<Bkutbpspjtr>, IBkutbpspjtrRepo
    {
        public BkutbpspjtrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<BkutbpspjtrView> ViewData(long Idbkutbpspjtr)
        {
            BkutbpspjtrView data = await (
                from src in _BludContext.Bkutbpspjtr
                join spjtr in _BludContext.Spjtr on src.Idspjtr equals spjtr.Idspjtr
                join bkutbp in _BludContext.Bkutbp on src.Idbkutbp equals bkutbp.Idbkutbp
                where src.Idbkutbpspjtr == Idbkutbpspjtr
                select new BkutbpspjtrView
                {
                    Idspjtr = src.Idspjtr,
                    Idbkutbp = src.Idbkutbp,
                    Datecreate = src.Datecreate,
                    Dateupdate = src.Dateupdate,
                    Idbkutbpspjtr = src.Idbkutbpspjtr,
                    IdspjtrNavigation = spjtr ?? null,
                    IdbkutbpNavigation = bkutbp ?? null,
                    Nilai = _BludContext.Tbpdetd.Where(w => w.Idtbp == bkutbp.Idtbp).Select(s => s.Nilai).Sum()
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<BkutbpspjtrView>> ViewDatas(long Idspjtr)
        {
            List<BkutbpspjtrView> data = await (
                from src in _BludContext.Bkutbpspjtr
                join spjtr in _BludContext.Spjtr on src.Idspjtr equals spjtr.Idspjtr
                join bkutbp in _BludContext.Bkutbp on src.Idbkutbp equals bkutbp.Idbkutbp
                where src.Idspjtr == Idspjtr
                select new BkutbpspjtrView
                {
                    Idspjtr = src.Idspjtr,
                    Idbkutbp = src.Idbkutbp,
                    Datecreate = src.Datecreate,
                    Dateupdate = src.Dateupdate,
                    Idbkutbpspjtr = src.Idbkutbpspjtr,
                    IdspjtrNavigation = spjtr ?? null, 
                    IdbkutbpNavigation = bkutbp ?? null,
                    Nilai = _BludContext.Tbpdetd.Where(w => w.Idtbp == bkutbp.Idtbp).Select(s => s.Nilai).Sum()
                }
                ).ToListAsync();
            return data;
        }
    }
}
