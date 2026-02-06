using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SppdetrpRepo : Repo<Sppdetrp>, ISppdetrpRepo
    {
        public SppdetrpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Sppdetrp param)
        {
            Sppdetrp data = await _BludContext.Sppdetrp.Where(w => w.Idsppdetrp == param.Idsppdetrp).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nilai = param.Nilai;
                data.Keterangan = param.Keterangan;
                data.Idbilling = param.Idbilling;
                data.Tglbilling = param.Tglbilling;
                data.Ntpn = param.Ntpn;
                data.Ntb = param.Ntb;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Sppdetrp.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
