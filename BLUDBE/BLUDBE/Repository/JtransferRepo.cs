using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JtransferRepo : Repo<Jtransfer>, IJtransferRepo
    {
        public JtransferRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jtransfer param)
        {
            Jtransfer data = await _BludContext.Jtransfer.Where(w => w.Idjtransfer == param.Idjtransfer).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Minnominal = param.Minnominal;
            data.Nmtransfer = param.Nmtransfer;
            data.Uraiantrans = param.Uraiantrans;
            data.Flagsnom = param.Flagsnom;
            _BludContext.Jtransfer.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
