using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SpmdetdRepo : Repo<Spmdetd>, ISpmdetdRepo
    {
        public SpmdetdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Spmdetd param)
        {
            Spmdetd data = await _BludContext.Spmdetd.Where(w => w.Idspmdetd == param.Idspmdetd).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Spmdetd.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
        public async Task<Spmdetd> ViewData(long Idspmdetd)
        {
            Spmdetd data = await (
                    from det in _BludContext.Spmdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idspmdetd == Idspmdetd
                    select new Spmdetd
                    {
                        Idspmdetd = det.Idspmdetd,
                        Idspm = det.Idspm,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Spmdetd>> ViewDatas(long Idspm)
        {
            List<Spmdetd> datas = await (
                    from det in _BludContext.Spmdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idspm == Idspm
                    select new Spmdetd
                    {
                        Idspmdetd = det.Idspmdetd,
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
