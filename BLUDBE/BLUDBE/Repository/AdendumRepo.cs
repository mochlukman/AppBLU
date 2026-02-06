using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class AdendumRepo : Repo<Adendum>, IAdendumRepo
    {
        public AdendumRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Adendum param)
        {
            Adendum data = await _BludContext.Adendum.Where(w => w.Idadd == param.Idadd).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Noadd = param.Noadd;
                data.Tgladd = param.Tgladd;
                data.Idkontrak = param.Idkontrak;
                data.Nilaiadd = param.Nilaiadd;
                data.Nilaiawal = param.Nilaiawal;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Adendum.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
