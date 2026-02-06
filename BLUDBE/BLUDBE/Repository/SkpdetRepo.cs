using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SkpdetRepo : Repo<Skpdet>, ISkpdetRepo
    {
        public SkpdetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Skpdet param)
        {
            Skpdet data = await _BludContext.Skpdet.Where(w => w.Idskpdet == param.Idskpdet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            _BludContext.Skpdet.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Skpdet> ViewData(long Idskpdet)
        {
            Skpdet data = await (
                    from det in _BludContext.Skpdet
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idskpdet == Idskpdet
                    select new Skpdet
                    {
                        Idskpdet = det.Idskpdet,
                        Idskp = det.Idskp,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Skpdet>> ViewDatas(long Idskp)
        {
            List<Skpdet> datas = await (
                    from det in _BludContext.Skpdet
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idskp == Idskp
                    select new Skpdet
                    {
                        Idskpdet = det.Idskpdet,
                        Idskp = det.Idskp,
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
