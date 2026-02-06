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
    public class SppcheckdokRepo : Repo<Sppcheckdok>, ISppcheckdokRepo
    {
        public SppcheckdokRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<Sppcheckdok> ViewData(long Idspp, long Idcheck)
        {
            Sppcheckdok Result = await (
                from data in _BludContext.Sppcheckdok
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp
                join check in _BludContext.Checkdok on data.Idcheck equals check.Idcheck
                where data.Idspp == Idspp && data.Idcheck == Idcheck
                select new Sppcheckdok
                {
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Idcheck = data.Idcheck,
                    Idspp = data.Idspp,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdcheckNavigation = check ?? null,
                    IdsppNavigation = spp ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Sppcheckdok>> ViewDatas(SppcheckdokGet param)
        {
            List<Sppcheckdok> Result = new List<Sppcheckdok>();
            IQueryable<Sppcheckdok> query = (
                from data in _BludContext.Sppcheckdok
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp
                join check in _BludContext.Checkdok on data.Idcheck equals check.Idcheck
                select new Sppcheckdok
                {
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Idcheck = data.Idcheck,
                    Idspp = data.Idspp,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdcheckNavigation = check ?? null,
                    IdsppNavigation = spp ?? null
                }
                ).AsQueryable();
            if(param.Idspp.ToString() != "0")
            {
                query = query.Where(w => w.Idspp == param.Idspp).AsQueryable();
            }
            if(param.Idcheck.ToString() != "0")
            {
                query = query.Where(w => w.Idcheck == param.Idcheck).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
