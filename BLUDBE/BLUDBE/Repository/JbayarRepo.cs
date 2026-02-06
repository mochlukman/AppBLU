using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JbayarRepo : Repo<Jbayar>, IJbayarRepo
    {
        public JbayarRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Jbayar param)
        {
            Jbayar data = await _BludContext.Jbayar.Where(w => w.Idjbayar == param.Idjbayar).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdbayar = param.Kdbayar;
            data.Uraianbayar = param.Uraianbayar;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Jbayar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
