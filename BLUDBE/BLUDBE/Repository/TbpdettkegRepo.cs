using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TbpdettkegRepo : Repo<Tbpdettkeg>, ITbpdettkegRepo
    {
        public TbpdettkegRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Tbpdettkeg param)
        {
            Tbpdettkeg data = await _BludContext.Tbpdettkeg.Where(w => w.Idtbpdettkeg == param.Idtbpdettkeg).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Tbpdettkeg.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Tbpdettkeg> ViewData(long Idtbpdettkeg)
        {
            Tbpdettkeg data = await (
                from tbp_keg in _BludContext.Tbpdettkeg
                join keg in _BludContext.Mkegiatan on tbp_keg.Idkeg equals keg.Idkeg
                where tbp_keg.Idtbpdettkeg == Idtbpdettkeg
                select new Tbpdettkeg
                {
                    Datecreate = tbp_keg.Datecreate,
                    Dateupdate = tbp_keg.Dateupdate,
                    Idkeg = tbp_keg.Idkeg,
                    IdkegNavigation = keg ?? null,
                    Nilai = tbp_keg.Nilai,
                    Idtbpdett = tbp_keg.Idtbpdett,
                    Idtbpdettkeg = tbp_keg.Idtbpdettkeg
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Tbpdettkeg>> ViewDatas(long Idtbpdett)
        {
            List<Tbpdettkeg> datas = await (
                from tbp_keg in _BludContext.Tbpdettkeg
                join keg in _BludContext.Mkegiatan on tbp_keg.Idkeg equals keg.Idkeg
                where tbp_keg.Idtbpdett == Idtbpdett
                select new Tbpdettkeg
                {
                    Datecreate = tbp_keg.Datecreate,
                    Dateupdate = tbp_keg.Dateupdate,
                    Idkeg = tbp_keg.Idkeg,
                    IdkegNavigation = keg ?? null,
                    Nilai = tbp_keg.Nilai,
                    Idtbpdett = tbp_keg.Idtbpdett,
                    Idtbpdettkeg = tbp_keg.Idtbpdettkeg
                }
                ).ToListAsync();
            return datas;
        }
    }
}
