using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class ZkodeRepo : Repo<Zkode>, IZkodeRepo
    {
        public ZkodeRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Zkode param)
        {
            Zkode data = await _BludContext.Zkode.Where(w => w.Idxkode == param.Idxkode).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Uraian = param.Uraian;
                _BludContext.Zkode.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
