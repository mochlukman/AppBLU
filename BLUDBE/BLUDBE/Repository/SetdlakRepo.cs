using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SetdlakRepo : Repo<Setdlak>, ISetdlakRepo
    {
        public SetdlakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Setdlak>> ViewDatas(long Idreklak)
        {
            List<Setdlak> result = new List<Setdlak>();
            IQueryable<Setdlak> data = (
                from lak in _BludContext.Setdlak
                join reklak in _BludContext.Daftreklak on lak.Idreklak equals reklak.Idrek into reklakMacth
                from reklakData in reklakMacth.DefaultIfEmpty()
                join reklra in _BludContext.Daftrekening on lak.Idreklra equals reklra.Idrek into reklraMacth
                from reklraData in reklraMacth.DefaultIfEmpty()
                select new Setdlak
                {
                    Idsetdlak = lak.Idsetdlak,
                    Idreklra = lak.Idreklra,
                    IdreklraNavigation = reklraData ?? null,
                    Idreklak = lak.Idreklak,
                    IdreklakNavigation = reklakData ?? null
                }
                ).AsQueryable();
            if (Idreklak.ToString() != "0")
            {
                data = data.Where(w => w.Idreklak == Idreklak).AsQueryable();
            }
            result = await data.ToListAsync();
            return result;
        }
    }
}
