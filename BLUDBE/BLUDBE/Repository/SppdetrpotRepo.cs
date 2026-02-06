using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SppdetrpotRepo : Repo<Sppdetrpot>, ISppdetrpotRepo
    {
        public SppdetrpotRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Sppdetrpot param)
        {
            Sppdetrpot data = await _BludContext.Sppdetrpot.Where(w => w.Idsppdetrpot == param.Idsppdetrpot).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Nilai = param.Nilai;
            data.Keterangan = param.Keterangan;
            data.Updateby = param.Createby;
            data.Updatedate = param.Createdate;
            _BludContext.Sppdetrpot.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Sppdetrpot> ViewData(long Idsppdetrpot)
        {
            Sppdetrpot result = await (
                from data in _BludContext.Sppdetrpot
                join sppdet in _BludContext.Sppdetr on data.Idsppdetr equals sppdet.Idsppdetr into sppdetMatch
                from sppdetData in sppdetMatch.DefaultIfEmpty()
                join pot in _BludContext.Potongan on data.Idpot equals pot.Idpot into potMatch
                from potData in potMatch.DefaultIfEmpty()
                where data.Idsppdetrpot == Idsppdetrpot
                select new Sppdetrpot
                {
                    Idsppdetrpot = data.Idsppdetrpot,
                    Idsppdetr = data.Idsppdetr,
                    IdsppdetrNavigation = sppdetData ?? null,
                    Idpot = data.Idpot,
                    IdpotNavigation = potData ?? null,
                    Nilai = data.Nilai,
                    Keterangan = data.Keterangan,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }).FirstOrDefaultAsync();
            return result;

        }

        public async Task<List<Sppdetrpot>> ViewDatas(long Idsppdetr)
        {
            List<Sppdetrpot> result = new List<Sppdetrpot>();
            IQueryable<Sppdetrpot> query = (
                from data in _BludContext.Sppdetrpot
                join sppdet in _BludContext.Sppdetr on data.Idsppdetr equals sppdet.Idsppdetr into sppdetMatch
                from sppdetData in sppdetMatch.DefaultIfEmpty()
                join pot in _BludContext.Potongan on data.Idpot equals pot.Idpot into potMatch
                from potData in potMatch.DefaultIfEmpty()
                where data.Idsppdetr == Idsppdetr
                select new Sppdetrpot
                {
                    Idsppdetrpot = data.Idsppdetrpot,
                    Idsppdetr = data.Idsppdetr,
                    IdsppdetrNavigation = sppdetData ?? null,
                    Idpot = data.Idpot,
                    IdpotNavigation = potData ?? null,
                    Nilai = data.Nilai,
                    Keterangan = data.Keterangan,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }).AsQueryable();
            result = await query.ToListAsync();
            return result;
        }
    }
}
