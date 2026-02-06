using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StrurekRepo : Repo<Strurek>, IStrurekRepo
    {
        public StrurekRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Strurek param)
        {
            Strurek data = await _BludContext.Strurek.Where(w => w.Idstrurek == param.Idstrurek).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmlevel = param.Nmlevel;
                _BludContext.Strurek.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
