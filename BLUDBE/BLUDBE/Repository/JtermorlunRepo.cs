using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JtermorlunRepo : Repo<Jtermorlun>, IJtermorlunRepo
    {
        public JtermorlunRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jtermorlun param)
        {
            Jtermorlun data = await _BludContext.Jtermorlun.Where(w => w.Idjtermorlun == param.Idjtermorlun).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmjtermorlun = param.Nmjtermorlun;
                _BludContext.Jtermorlun.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
