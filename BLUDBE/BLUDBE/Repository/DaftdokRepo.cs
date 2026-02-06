using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DaftdokRepo : Repo<Daftdok>, IDaftdokRepo
    {
        public DaftdokRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Daftdok param)
        {
            Daftdok data = await _BludContext.Daftdok.Where(w => w.Iddaftdok == param.Iddaftdok).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Kddok = param.Kddok;
                data.Nmdok = param.Nmdok;
                data.Ket = param.Kddok;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Daftdok.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
