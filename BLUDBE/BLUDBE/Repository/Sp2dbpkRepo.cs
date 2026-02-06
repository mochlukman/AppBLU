using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class Sp2dbpkRepo : Repo<Sp2dbpk>, ISp2dbpkRepo
    {
        public Sp2dbpkRepo(DbContext context) : base(context)
        {
        }
        BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> Sp2dIds()
        {
            List<long> datas = await _BludContext.Sp2dbpk.Select(s => s.Idsp2d).ToListAsync();
            return datas;
        }
    }
}
