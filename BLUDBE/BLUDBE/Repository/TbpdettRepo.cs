using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TbpdettRepo : Repo<Tbpdett>, ITbpdettRepo
    {
        public TbpdettRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<decimal?> TotalNilaiPelimpahan(List<long> Idtbp)
        {
            decimal? total = await _BludContext.Tbpdett.Where(w => Idtbp.Contains(w.Idtbp)).SumAsync(s => s.Nilai);
            return total;
        }
        public async Task<bool> Update(Tbpdett param)
        {
            Tbpdett data = await _BludContext.Tbpdett.Where(w => w.Idtbpdett == param.Idtbpdett).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Tbpdett.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Tbpdett> ViewData(long Idtbpdett)
        {
            Tbpdett data = await (
                from det in _BludContext.Tbpdett
                join tbp in _BludContext.Tbp on det.Idtbp equals tbp.Idtbp
                join bend in _BludContext.Bend on det.Idbend equals bend.Idbend
                join trans in _BludContext.Jtrnlkas on det.Idnojetra equals trans.Idnojetra
                where det.Idtbpdett == Idtbpdett
                select new Tbpdett
                {
                    Idbend = det.Idbend,
                    IdbendNavigation = bend ?? null,
                    Datecreate = det.Datecreate,
                    Dateupdate = det.Dateupdate,
                    Idnojetra = det.Idnojetra,
                    IdnojetraNavigation = trans ?? null,
                    Idtbp = det.Idtbp,
                    Idtbpdett = det.Idtbpdett,
                    Nilai = det.Nilai,
                    IdtbpNavigation = tbp ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Tbpdett>> ViewDatas(long Idtbp)
        {
            List<Tbpdett> datas = await (
                from det in _BludContext.Tbpdett
                join tbp in _BludContext.Tbp on det.Idtbp equals tbp.Idtbp
                join bend in _BludContext.Bend on det.Idbend equals bend.Idbend
                join trans in _BludContext.Jtrnlkas on det.Idnojetra equals trans.Idnojetra
                where det.Idtbp == Idtbp
                select new Tbpdett
                {
                    Idbend = det.Idbend,
                    IdbendNavigation = bend ?? null,
                    Datecreate = det.Datecreate,
                    Dateupdate = det.Dateupdate,
                    Idnojetra = det.Idnojetra,
                    IdnojetraNavigation = trans ?? null,
                    Idtbp = det.Idtbp,
                    Idtbpdett = det.Idtbpdett,
                    Nilai = det.Nilai,
                    IdtbpNavigation = tbp ?? null
                }
                ).ToListAsync();
            return datas;
        }
    }
}
