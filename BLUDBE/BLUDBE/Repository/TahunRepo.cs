using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TahunRepo : Repo<Tahun>, ITahunRepo
    {
        public TahunRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public string GetNamaTahun(string kdtahun)
        {
            var nmtahun = _BludContext.Tahun.Where(w => w.Kdtahun.Trim() == kdtahun.Trim()).Select(s => s.Nmtahun).FirstOrDefault();
            return nmtahun;
        }
        public async Task<string> GetKdtahun()
        {
            var tahun = await _BludContext.Tahun.OrderBy(o => o.Kdtahun).Select(s => s.Kdtahun).LastOrDefaultAsync();
            if (tahun == null)
                return "1";
            var toNumber = Int32.Parse(tahun);
            var PlusNumber = toNumber + 1;
            string NewKode = PlusNumber.ToString();
            return NewKode;
        }
        public async Task<List<Tahun>> Search(string Keyword)
        {
            List<Tahun> listTahun = await _BludContext.Tahun.Where(w => w.Kdtahun.Trim().Contains(Keyword) || w.Nmtahun.Trim().Contains(Keyword)).ToListAsync();
            return listTahun;
        }
    }
}
