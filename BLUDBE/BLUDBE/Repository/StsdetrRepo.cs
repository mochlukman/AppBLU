using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StsdetrRepo : Repo<Stsdetr>, IStsdetrRepo
    {
        public StsdetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Stsdetr param)
        {
            Stsdetr data = await _BludContext.Stsdetr.Where(w => w.Idstsdetr == param.Idstsdetr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Stsdetr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<Stsdetr> ViewData(long Idstsdetr)
        {
            Stsdetr data = await (
                    from det in _BludContext.Stsdetr
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    join keg in _BludContext.Mkegiatan on det.Idkeg equals keg.Idkeg
                    where det.Idstsdetr == Idstsdetr
                    select new Stsdetr
                    {
                        Idstsdetr = det.Idstsdetr,
                        IdkegNavigation = keg ?? null,
                        Idkeg = det.Idkeg,
                        Idsts = det.Idsts,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Stsdetr>> ViewDatas(long Idsts)
        {
            List<Stsdetr> datas = await (
                    from det in _BludContext.Stsdetr
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    join keg in _BludContext.Mkegiatan on det.Idkeg equals keg.Idkeg
                    where det.Idsts == Idsts
                    select new Stsdetr
                    {
                        Idstsdetr = det.Idstsdetr,
                        Idkeg = det.Idkeg,
                        IdkegNavigation = keg ?? null,
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
