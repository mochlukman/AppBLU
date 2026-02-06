using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StattrsRepo : Repo<Stattrs>, IStattrsRepo
    {
        public StattrsRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Stattrs param)
        {
            Stattrs data = await _BludContext.Stattrs.Where(w => w.Kdstatus.Trim() == param.Kdstatus).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Lblstatus = param.Lblstatus;
                data.Uraian = param.Uraian;
                _BludContext.Stattrs.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
