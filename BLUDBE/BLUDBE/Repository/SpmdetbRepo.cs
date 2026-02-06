using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SpmdetbRepo : Repo<Spmdetb>, ISpmdetbRepo
    {
        public SpmdetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Spmdetb param)
        {
            Spmdetb data = await _BludContext.Spmdetb.Where(w => w.Idspmdetb == param.Idspmdetb).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Spmdetb.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
        public async Task<Spmdetb> ViewData(long Idspmdetb)
        {
            Spmdetb data = await (
                    from det in _BludContext.Spmdetb
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idspmdetb == Idspmdetb
                    select new Spmdetb
                    {
                        Idspmdetb = det.Idspmdetb,
                        Idspm = det.Idspm,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Spmdetb>> ViewDatas(long Idspm)
        {
            List<Spmdetb> datas = await (
                    from det in _BludContext.Spmdetb
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idspm == Idspm
                    select new Spmdetb
                    {
                        Idspmdetb = det.Idspmdetb,
                        Idspm = det.Idspm,
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
