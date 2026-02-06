using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JbendRepo : Repo<Jbend>, IJbendRepo
    {
        public JbendRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jbend param)
        {
            Jbend data = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == param.Jnsbend.Trim()).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Idrek = param.Idrek;
                data.Uraibend = param.Uraibend;
                _BludContext.Jbend.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
