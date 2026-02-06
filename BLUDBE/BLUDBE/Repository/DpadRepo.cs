using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class DpadRepo : Repo<Dpad>, IDpadRepo
    {
        public DpadRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> UpdateNilai(Dpadetd param, decimal? newTotal)
        {
            Dpad data = await _BludContext.Dpad.Where(w =>
                                 w.Iddpad == param.Iddpad).FirstOrDefaultAsync();
            data.Nilai = newTotal;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpad.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<decimal?> GetNilai(long Iddpad)
        {
            decimal? Nilai = await _BludContext.Dpad.Where(w => w.Iddpad == Iddpad)
                    .Select(s => s.Nilai).SumAsync();
            return Nilai;
        }

        public async Task<List<DpadView>> ViewDatas(DpaRekGet param)
        {
            //string lastTahap = await _BludContext.Dpa.Where(w => w.Idunit == param.Idunit && !String.IsNullOrEmpty(w.Tglsah.ToString())).OrderByDescending(o => o.Kdtahap.Trim()).Select(s => s.Kdtahap).FirstOrDefaultAsync();
            //param.Kdtahap = lastTahap;
            List<DpadView> Result = new List<DpadView>();
            IQueryable<DpadView> query = (
                from data in _BludContext.Dpad
                join dpa in _BludContext.Dpa on data.Iddpa equals dpa.Iddpa
                join rekening in _BludContext.Daftrekening on data.Idrek equals rekening.Idrek
                select new DpadView
                {
                    Iddpa = data.Iddpa,
                    Iddpad = data.Iddpad,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idrek = data.Idrek,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rekening,
                    Dpa = dpa ?? null
                }
                ).AsQueryable();
            if (param.Iddpa.ToString() != "0")
            {
                query = query.Where(w => w.Iddpa == param.Iddpa).AsQueryable();
            }
            if (param.Kdtahap.Trim() != "x")
            {
                query = query.Where(w => w.Kdtahap.Trim() == param.Kdtahap.Trim()).AsQueryable();
            }
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Dpa.Idunit == param.Idunit).AsQueryable();
            }
            if (param.Idskp.ToString() != "0")
            {
                List<long> rekInSkpdet = await _BludContext.Skpdet.Where(w => w.Idskp == param.Idskp).Select(s => s.Idrek).Distinct().ToListAsync();
                query = query.Where(w => !rekInSkpdet.Contains(w.Idrek)).AsQueryable();
            }
            if (param.Idtbp.ToString() != "0")
            {
                List<long> rekInTbpdetd = await _BludContext.Tbpdetd.Where(w => w.Idtbp == param.Idtbp).Select(s => s.Idrek).Distinct().ToListAsync();
                query = query.Where(w => !rekInTbpdetd.Contains(w.Idrek)).AsQueryable();
            }
            if(param.Idsts.ToString() != "0")
            {
                List<long> rekInStsdetd = await _BludContext.Stsdetd.Where(w => w.Idsts == param.Idsts).Select(s => s.Idrek).Distinct().ToListAsync();
                query = query.Where(w => !rekInStsdetd.Contains(w.Idrek)).AsQueryable();
            }
            if (param.Kdtahap.Trim() == "x")
            {
                var last_tahap = await query.Where(w => w.Kdtahap.Trim() == "341").Select(s => s.Kdtahap.Trim()).Distinct().FirstOrDefaultAsync();
                if (!String.IsNullOrEmpty(last_tahap))
                {
                    query = query.Where(w => w.Kdtahap.Trim() == last_tahap).AsQueryable();
                }
            }
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<DpadView> ViewData(long Iddpad)
        {
           DpadView Result = await (
                from data in _BludContext.Dpad
                join dpa in _BludContext.Dpa on data.Iddpa equals dpa.Iddpa
                join rekening in _BludContext.Daftrekening on data.Idrek equals rekening.Idrek
                where data.Iddpad == Iddpad
                select new DpadView
                {
                    Iddpa = data.Iddpa,
                    Iddpad = data.Iddpad,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idrek = data.Idrek,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rekening
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<bool> Update(Dpad param)
        {
            Dpad data = await _BludContext.Dpad.Where(w => w.Iddpad == param.Iddpad).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpad.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
