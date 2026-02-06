using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class WebgroupRexpo : Repo<Webgroup>, IWebgroupRepo
    {
        public WebgroupRexpo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Webgroup param)
        {
            Webgroup data = await _BludContext.Webgroup.Where(w => w.Groupid == param.Groupid).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmgroup = param.Nmgroup;
                data.Ket = param.Ket;
                _BludContext.Webgroup.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
