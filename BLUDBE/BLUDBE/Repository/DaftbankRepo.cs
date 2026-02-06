using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DaftbankRepo : Repo<Daftbank>, IDaftbankRepo
    {
        public DaftbankRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Daftbank param)
        {
            Daftbank data = await _BludContext.Daftbank.Where(w => w.Idbank == param.Idbank).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Kdbank = param.Kdbank;
                data.Akbank = param.Akbank;
                data.Alamat = param.Alamat;
                data.Telepon = param.Telepon;
                data.Cabang = param.Cabang;
                data.Datecreate = param.Datecreate;
                _BludContext.Daftbank.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
