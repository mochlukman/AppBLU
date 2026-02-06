using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JdanaRepo : Repo<Jdana>, IJdanaRepo
    {
        public JdanaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Udpate(Jdana param)
        {
            Jdana data = await _BludContext.Jdana.Where(w => w.Idjdana == param.Idjdana).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Kddana = param.Kddana;
                data.Nmdana = param.Nmdana;
                data.Ket = param.Ket;
                _BludContext.Jdana.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
