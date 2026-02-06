using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TbpdetdRepo : Repo<Tbpdetd>, ITbpdetdRepo
    {
        public TbpdetdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Tbpdetd param)
        {
            Tbpdetd data = await _BludContext.Tbpdetd.Where(w => w.Idtbpdetd == param.Idtbpdetd).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            _BludContext.Tbpdetd.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<Tbpdetd> ViewData(long Idtbpdetd)
        {
            Tbpdetd data = await (
                    from det in _BludContext.Tbpdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idtbpdetd == Idtbpdetd
                    select new Tbpdetd
                    {
                        Idtbpdetd = det.Idtbpdetd,
                        Idtbp = det.Idtbp,
                        Idnojetra = det.Idnojetra,
                        Idrek = det.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Nilai = det.Nilai
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Tbpdetd>> ViewDatas(long Idtbp)
        {
            List<Tbpdetd> datas = await (
                    from det in _BludContext.Tbpdetd
                    join rekening in _BludContext.Daftrekening on det.Idrek equals rekening.Idrek
                    where det.Idtbp == Idtbp
                    select new Tbpdetd
                    {
                        Idtbpdetd = det.Idtbpdetd,
                        Idtbp = det.Idtbp,
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
