using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StsdettRepo : Repo<Stsdett>, IStsdettRepo
    {
        public StsdettRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Stsdett param)
        {
            Stsdett data = await _BludContext.Stsdett.Where(w => w.Idstsdett == param.Idstsdett).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Stsdett.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<Stsdett> ViewData(long IdStsdett)
        {
            Stsdett data = await (
                    from det in _BludContext.Stsdett
                    join bkbkas in _BludContext.Bkbkas on det.Nobbantu.Trim() equals bkbkas.Nobbantu.Trim()
                    where det.Idstsdett == IdStsdett
                    select new Stsdett
                    {
                        Idstsdett = det.Idstsdett,
                        Idsts = det.Idsts,
                        Nobbantu = det.Nobbantu,
                        Idnojetra = det.Idnojetra,
                        Nilai = det.Nilai,
                        NobbantuNavigation = bkbkas ?? null
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Stsdett>> ViewDatas(long Idsts)
        {
            List<Stsdett> datas = await (
                    from det in _BludContext.Stsdett
                    join bkbkas in _BludContext.Bkbkas on det.Nobbantu.Trim() equals bkbkas.Nobbantu.Trim()
                    where det.Idsts == Idsts
                    select new Stsdett
                    {
                        Idstsdett = det.Idstsdett,
                        NobbantuNavigation = bkbkas ?? null,
                        Idsts = det.Idsts,
                        Nobbantu = det.Nobbantu,
                        Idnojetra = det.Idnojetra,
                        Nilai = det.Nilai
                    }
                ).ToListAsync();
            return datas;
        }
    }
}
