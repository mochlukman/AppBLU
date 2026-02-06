using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JtrnlkasRepo : Repo<Jtrnlkas>, IJtrnlkasRepo
    {
        public JtrnlkasRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jtrnlkas param)
        {
            Jtrnlkas data = await _BludContext.Jtrnlkas.Where(w => w.Idnojetra == param.Idnojetra).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmjetra = param.Nmjetra;
                data.Kdpers = param.Kdpers;
                _BludContext.Jtrnlkas.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
