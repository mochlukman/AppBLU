using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SkpstsRepo : Repo<Skpsts>, ISkpstsRepo
    {
        public SkpstsRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<Skpsts> ViewData(long Idskp, long Idsts)
        {
            Skpsts datas = await (
                from data in _BludContext.Skpsts
                join skp in _BludContext.Skp on data.Idskp equals skp.Idskp
                join sts in _BludContext.Sts on data.Idsts equals sts.Idsts
                where data.Idskp == Idskp && data.Idsts == Idsts
                select new Skpsts
                {
                    Idskp = data.Idskp,
                    Idsts = data.Idsts,
                    IdskpNavigation = skp ?? null,
                    IdstsNavigation = sts ?? null
                }
                ).FirstOrDefaultAsync();
            return datas;
        }
    }
}
