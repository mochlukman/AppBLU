using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkbkasRepo : Repo<Bkbkas>, IBkbkasRepo
    {
        public BkbkasRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Bkbkas param)
        {
            Bkbkas data = await _BludContext.Bkbkas.Where(w => w.Nobbantu.Trim() == param.Nobbantu.Trim()).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Idunit = param.Idunit;
                data.Idrek = param.Idrek;
                data.Idbank = param.Idbank;
                data.Nmbkas = param.Nmbkas;
                data.Norek = param.Norek;
                data.Saldo = param.Saldo;
                _BludContext.Bkbkas.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
