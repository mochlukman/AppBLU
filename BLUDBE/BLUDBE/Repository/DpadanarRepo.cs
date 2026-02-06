using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DpadanarRepo : Repo<Dpadanar>, IDpadanarRepo
    {
        public DpadanarRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Dpadanar param)
        {
            Dpadanar data = await _BludContext.Dpadanar.Where(w => w.Iddpadanar == param.Iddpadanar).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Idjdana = param.Idjdana;
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Dpadanar.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
