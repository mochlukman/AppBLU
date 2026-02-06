using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StsdetdRepo : Repo<Stsdetd>, IStsdetdRepo
    {
        public StsdetdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Stsdetd param)
        {
            Stsdetd data = await _BludContext.Stsdetd.Where(w => w.Idstsdetd == param.Idstsdetd).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Stsdetd.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<Stsdetd> ViewData(long Idstsdetd)
        {
            Stsdetd data = await (
                    from det in _BludContext.Stsdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idstsdetd == Idstsdetd
                    select new Stsdetd
                    {
                        Idstsdetd = det.Idstsdetd,
                        Idsts = det.Idsts,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Stsdetd>> ViewDatas(long Idsts)
        {
            List<Stsdetd> datas = await (
                    from det in _BludContext.Stsdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idsts == Idsts
                    select new Stsdetd
                    {
                        Idstsdetd = det.Idstsdetd,
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
