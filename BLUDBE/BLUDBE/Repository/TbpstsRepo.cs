using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TbpstsRepo : Repo<Tbpsts>, ITbpstsRepo
    {
        public TbpstsRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Tbpsts>> GetBySts(long Idsts)
        {
            List<Tbpsts> datas = await (
                from data in _BludContext.Tbpsts
                join tbp in _BludContext.Tbp on data.Idtbp equals tbp.Idtbp
                join sts in _BludContext.Sts on data.Idsts equals sts.Idsts
                where data.Idsts == Idsts
                select new Tbpsts
                {
                    Idsts = data.Idsts,
                    Idtbp = data.Idtbp,
                    IdstsNavigation = sts ?? null,
                    IdtbpNavigation = tbp ?? null
                }
                ).ToListAsync();
            return datas;
        }

        public async Task<List<Tbpsts>> GetByTbp(long Idtbp)
        {
            List<Tbpsts> datas = await(
                from data in _BludContext.Tbpsts
                join tbp in _BludContext.Tbp on data.Idtbp equals tbp.Idtbp
                join sts in _BludContext.Sts on data.Idsts equals sts.Idsts
                where data.Idtbp == Idtbp
                select new Tbpsts
                {
                    Idsts = data.Idsts,
                    Idtbp = data.Idtbp,
                    IdstsNavigation = sts ?? null,
                    IdtbpNavigation = tbp ?? null
                }
                ).ToListAsync();
            return datas;
        }

        public async Task<Tbpsts> ViewData(long Idtbp, long Idsts)
        {
            Tbpsts datas = await (
                from data in _BludContext.Tbpsts
                join tbp in _BludContext.Tbp on data.Idtbp equals tbp.Idtbp
                join sts in _BludContext.Sts on data.Idsts equals sts.Idsts
                where data.Idtbp == Idtbp && data.Idsts == Idsts
                select new Tbpsts
                {
                    Idsts = data.Idsts,
                    Idtbp = data.Idtbp,
                    IdstsNavigation = sts ?? null,
                    IdtbpNavigation = tbp ?? null
                }
                ).FirstOrDefaultAsync();
            return datas;
        }
    }
}
