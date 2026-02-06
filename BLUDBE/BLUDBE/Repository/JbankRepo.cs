using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JbankRepo : Repo<Jbank>, IJbankRepo
    {
        public JbankRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jbank param)
        {
            Jbank data = await _BludContext.Jbank.Where(w => w.Idbank == param.Idbank).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Kdbank = param.Kdbank;
                data.Nmbank = param.Nmbank;
                data.Uraian = param.Uraian;
                data.Akronim = param.Akronim;
                data.Alamat = param.Alamat;
                data.Datecreate = param.Datecreate;
                _BludContext.Jbank.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false; ;
        }
    }
}
