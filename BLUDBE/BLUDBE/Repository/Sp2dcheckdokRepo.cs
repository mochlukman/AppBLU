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
    public class Sp2dcheckdokRepo : Repo<Sp2dcheckdok>, ISp2dcheckdokRepo
    {
        public Sp2dcheckdokRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<Sp2dcheckdok> ViewData(long Idsp2d, long Idcheck)
        {
            Sp2dcheckdok Result = await (
                from data in _BludContext.Sp2dcheckdok
                join sp2d in _BludContext.Sp2d on data.Idsp2d equals sp2d.Idsp2d
                join check in _BludContext.Checkdok on data.Idcheck equals check.Idcheck
                where data.Idsp2d == Idsp2d && data.Idcheck == Idcheck
                select new Sp2dcheckdok
                {
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Idcheck = data.Idcheck,
                    Idsp2d = data.Idsp2d,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdcheckNavigation = check ?? null,
                    Idsp2dNavigation = sp2d ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Sp2dcheckdok>> ViewDatas(Sp2dcheckdokGet param)
        {
            List<Sp2dcheckdok> Result = new List<Sp2dcheckdok>();
            IQueryable<Sp2dcheckdok> query = (
                from data in _BludContext.Sp2dcheckdok
                join sp2d in _BludContext.Sp2d on data.Idsp2d equals sp2d.Idsp2d
                join check in _BludContext.Checkdok on data.Idcheck equals check.Idcheck
                select new Sp2dcheckdok
                {
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Idcheck = data.Idcheck,
                    Idsp2d = data.Idsp2d,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    IdcheckNavigation = check ?? null,
                    Idsp2dNavigation = sp2d ?? null
                }
                ).AsQueryable();
            if (param.Idsp2d.ToString() != "0")
            {
                query = query.Where(w => w.Idsp2d == param.Idsp2d).AsQueryable();
            }
            if (param.Idcheck.ToString() != "0")
            {
                query = query.Where(w => w.Idcheck == param.Idcheck).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
