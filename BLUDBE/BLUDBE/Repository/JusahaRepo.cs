using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JusahaRepo : Repo<Jusaha>, IJusahaRepo
    {
        public JusahaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jusaha param)
        {
            Jusaha data = await _BludContext.Jusaha.Where(w => w.Idjusaha == param.Idjusaha).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Badanusaha = param.Badanusaha;
                data.Keterangan = param.Keterangan;
                data.Akronim = param.Akronim;
                _BludContext.Jusaha.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
