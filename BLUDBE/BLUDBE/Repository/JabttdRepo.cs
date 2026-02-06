using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JabttdRepo : Repo<Jabttd>, IJabttdRepo
    {
        public JabttdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jabttd param)
        {
            Jabttd data = await _BludContext.Jabttd.Where(w => w.Idttd == param.Idttd).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Idunit = param.Idunit;
                data.Idpeg = param.Idpeg;
                data.Kddok = param.Kddok;
                data.Jabatan = param.Jabatan;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Jabttd.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
