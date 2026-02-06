using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkukRepo : Repo<Bkuk>, IBkukRepo
    {
        public BkukRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> UpdateValid(Bkuk param)
        {
            Bkuk data = await _BludContext.Bkuk.Where(w => w.Idbkuk == param.Idbkuk).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Tglvalid = param.Tglvalid;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Bkuk.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
