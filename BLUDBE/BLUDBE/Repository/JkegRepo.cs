using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JkegRepo : Repo<Jkeg>, IJkegRepo
    {
        public JkegRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jkeg param)
        {
            Jkeg data = await _BludContext.Jkeg.Where(w => w.Jnskeg == param.Jnskeg).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Uraian = param.Uraian;
                _BludContext.Jkeg.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
