using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class PemdaRepo : Repo<Pemda>, IPemdaRepo
    {
        public PemdaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<long> GetIdunit()
        {
            Pemda data = await _BludContext.Pemda.Where(w => w.Configid.Trim() == "curskpkd").FirstOrDefaultAsync();
            if (data != null)
                return Int64.Parse(data.Configval);
            return 0;
        }

        public async Task<string> GetPemda(string configid)
        {
            Pemda data = await _BludContext.Pemda.Where(w => w.Configid.Trim().ToLower() == configid.Trim().ToLower()).FirstOrDefaultAsync();
            if (data != null)
                return data.Configval;
            return "";
        }
    }
}
