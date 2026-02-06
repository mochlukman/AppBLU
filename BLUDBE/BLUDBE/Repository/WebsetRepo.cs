using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class WebsetRepo : Repo<Webset>, IWebsetRepo
    {
        public WebsetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Webset param)
        {
            Webset data = await _BludContext.Webset.Where(w => w.Idwebset == param.Idwebset && w.Kdset.Trim() == param.Kdset.Trim()).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valset = param.Valset;
            _BludContext.Webset.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
