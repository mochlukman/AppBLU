using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StsdetbRepo : Repo<Stsdetb>, IStsdetbRepo
    {
        public StsdetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Stsdetb param)
        {
            Stsdetb data = await _BludContext.Stsdetb.Where(w => w.Idstsdetb == param.Idstsdetb).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Stsdetb.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<Stsdetb> ViewData(long IdStsdetb)
        {
            Stsdetb data = await (
                    from det in _BludContext.Stsdetb
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idstsdetb == IdStsdetb
                    select new Stsdetb
                    {
                        Idstsdetb = det.Idstsdetb,
                        Idsts = det.Idsts,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Stsdetb>> ViewDatas(long Idsts)
        {
            List<Stsdetb> datas = await (
                    from det in _BludContext.Stsdetb
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idsts == Idsts
                    select new Stsdetb
                    {
                        Idstsdetb = det.Idstsdetb,
                        Idsts = det.Idsts,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).ToListAsync();
            return datas;
        }
    }
}
