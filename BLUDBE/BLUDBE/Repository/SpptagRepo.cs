using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Dto;

namespace BLUDBE.Repository
{
    public class SpptagRepo : Repo<Spptag>, ISpptagRepo
    {
        public SpptagRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> GetIds(long Idspp, long Idtagihan)
        {
            List<long> ids = await _BludContext.Spptag.Where(w => w.Idspp == Idspp && w.Idtagihan == Idtagihan).Select(w => w.Idspptag).ToListAsync();
            return ids;
        }

        public async Task<bool> Update(Spptag param)
        {
            Spptag data = await _BludContext.Spptag.Where(w => w.Idspptag == param.Idspptag).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Updateby = param.Updateby;
            data.Updatedate = param.Updatedate;
            _BludContext.Spptag.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Spptag> ViewData(long Idspptag)
        {
            Spptag result = await (
                from data in _BludContext.Spptag
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp into sppMatch
                from sppData in sppMatch.DefaultIfEmpty()
                join tagihan in _BludContext.Tagihan on data.Idtagihan equals tagihan.Idtagihan into tagihanMatch
                from tagihanData in tagihanMatch.DefaultIfEmpty()
                where data.Idspptag == Idspptag
                select new Spptag
                {
                    Idspptag = data.Idspptag,
                    Idspp = data.Idspp,
                    Idtagihan = data.Idtagihan,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdsppNavigation = sppData ?? null,
                    IdtagihanNavigation = tagihanData ?? null
                }
                ).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Spptag>> ViewDatas(long Idspp)
        {
            List<Spptag> result = await (
                from data in _BludContext.Spptag
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp into sppMatch
                from sppData in sppMatch.DefaultIfEmpty()
                join tagihan in _BludContext.Tagihan on data.Idtagihan equals tagihan.Idtagihan into tagihanMatch
                from tagihanData in tagihanMatch.DefaultIfEmpty()
                where data.Idspp == Idspp
                select new Spptag
                {
                    Idspptag = data.Idspptag,
                    Idspp = data.Idspp,
                    Idtagihan = data.Idtagihan,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdsppNavigation = sppData ?? null,
                    IdtagihanNavigation = tagihanData ?? null
                }
                ).ToListAsync();
            return result;
        }
    }
}
