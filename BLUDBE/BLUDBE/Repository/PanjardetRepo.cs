using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class PanjardetRepo : Repo<Panjardet>, IPanjardetRepo
    {
        public PanjardetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<decimal?> TotalNilaiPanjar(List<long> Idpanjar)
        {
            decimal? total = await _BludContext.Panjardet.Where(w => Idpanjar.Contains(w.Idpanjar)).SumAsync(s => s.Nilai);
            return total;
        }

        public async Task<decimal?> TotalNilai(long Idpanjar)
        {
            decimal? Total = await _BludContext.Panjardet.Where(w => w.Idpanjar == Idpanjar).SumAsync(s => s.Nilai);
            return Total;
        }

        public async Task<bool> Update(Panjardet param)
        {
            Panjardet data = await _BludContext.Panjardet.Where(w => w.Idpanjardet == param.Idpanjardet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Panjardet.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<PanjardetView> ViewData(long Idpanjardet)
        {
            PanjardetView data = await (
                from det in _BludContext.Panjardet
                join panjar in _BludContext.Panjar on det.Idpanjar equals panjar.Idpanjar
                join kegiatan in _BludContext.Mkegiatan on det.Idkeg equals kegiatan.Idkeg
                join jetra in _BludContext.Jtrnlkas on det.Idnojetra equals jetra.Idnojetra
                where det.Idpanjardet == Idpanjardet
                select new PanjardetView
                {
                    Idkeg = det.Idkeg,
                    Datecreate = det.Datecreate,
                    Idnojetra = det.Idnojetra,
                    Idpanjar = det.Idpanjar,
                    Dateupdate = det.Dateupdate,
                    Idpanjardet = det.Idpanjardet,
                    Nilai = det.Nilai,
                    IdnojetraNavigation = jetra ?? null,
                    Kegiatan = kegiatan ?? null,
                    IdpanjarNavigation = panjar ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<PanjardetView>> ViewDatas(long Idpanjar)
        {
            List<PanjardetView> data = await (
                from det in _BludContext.Panjardet
                join panjar in _BludContext.Panjar on det.Idpanjar equals panjar.Idpanjar
                join kegiatan in _BludContext.Mkegiatan on det.Idkeg equals kegiatan.Idkeg
                join jetra in _BludContext.Jtrnlkas on det.Idnojetra equals jetra.Idnojetra
                where det.Idpanjar == Idpanjar
                select new PanjardetView
                {
                    Idkeg = det.Idkeg,
                    Datecreate = det.Datecreate,
                    Idnojetra = det.Idnojetra,
                    Idpanjar = det.Idpanjar,
                    Dateupdate = det.Dateupdate,
                    Idpanjardet = det.Idpanjardet,
                    Nilai = det.Nilai,
                    IdnojetraNavigation = jetra ?? null,
                    Kegiatan = kegiatan ?? null,
                    IdpanjarNavigation = panjar ?? null
                }
                ).ToListAsync();
            return data;
        }
    }
}
