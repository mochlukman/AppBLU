using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JnspajakRepo : Repo<Jnspajak>, IJnspajakRepo
    {
        public JnspajakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Jnspajak param)
        {
            Jnspajak data = await _BludContext.Jnspajak.Where(w => w.Idjnspajak == param.Idjnspajak).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Kdjnspajak = param.Kdjnspajak;
                data.Nmjnspajak = param.Nmjnspajak;
                _BludContext.Jnspajak.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
