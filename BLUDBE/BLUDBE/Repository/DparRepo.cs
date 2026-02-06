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
    public class DparRepo : Repo<Dpar>, IDparRepo
    {
        public DparRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> UpdateNilai(Dpadetr param, decimal? newTotal)
        {
            Dpar data = await _BludContext.Dpar.Where(w =>
                                 w.Iddpar == param.Iddpar).FirstOrDefaultAsync();
            data.Nilai = newTotal;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<decimal?> GetNilai(long Iddpar)
        {
            decimal? Nilai = await _BludContext.Dpar.Where(w => w.Iddpar == Iddpar)
                    .Select(s => s.Nilai).SumAsync();
            return Nilai;
        }

        public async Task<bool> UpdateULT(Dpar param)
        {
            Dpar data = await _BludContext.Dpar.Where(w => w.Iddpar == param.Iddpar).FirstOrDefaultAsync();
            if(data != null)
            {
                data.UpGu = param.UpGu;
                data.Ls = param.Ls;
                data.Tu = param.Tu;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Dpar.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<List<DparView>> GetByBpkdetr(long Idunit, long Idkeg, long Idbpk)
        {
            List<long> rekInBpkdetr = await _BludContext.Bpkdetr.Where(w => w.Idbpk == Idbpk).Select(s => s.Idrek).Distinct().ToListAsync();
            //List<long> listTahapDpar = await _BludContext.Dpar.Where(w => w.Iddpa == Iddpa).Select(s => Int64.Parse(s.Kdtahap.Trim())).Distinct().ToListAsync();
            List<long> listTahapDpar = await _BludContext.Dpa.Where(w => w.Idunit == Idunit).Select(s => Int64.Parse(s.Kdtahap.Trim())).Distinct().ToListAsync();
            long maxTahap = listTahapDpar[listTahapDpar.Count() - 1];
            List<DparView> datas = await (
                  from dpar in _BludContext.Dpar
                  join dpa in _BludContext.Dpa on dpar.Iddpa equals dpa.Iddpa
                  join kegiatan in _BludContext.Mkegiatan on dpar.Idkeg equals kegiatan.Idkeg
                  join rekening in _BludContext.Daftrekening on dpar.Idrek equals rekening.Idrek
                  where dpa.Idunit == Idunit && dpar.Idkeg == Idkeg && !rekInBpkdetr.Contains(dpar.Idrek) && dpar.Kdtahap.Trim() == maxTahap.ToString()
                  select new DparView
                  {
                      Iddpa = dpar.Iddpa,
                      Idkeg = dpar.Idkeg,
                      Iddpar = dpar.Iddpar,
                      Datecreate = dpar.Datecreate,
                      Dateupdate = dpar.Dateupdate,
                      Idrek = dpar.Idrek,
                      Ls = dpar.Ls,
                      UpGu = dpar.UpGu,
                      Kdtahap = dpar.Kdtahap,
                      Nilai = dpar.Nilai,
                      Tu = dpar.Tu,
                      Kegiatan = kegiatan,
                      Rekening = rekening
                  }
                ).ToListAsync();
            return datas;
        }
    }
}
