using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class AtasbendRepo : Repo<Atasbend>, IAtasbendRepo
    {
        public AtasbendRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Atasbend post)
        {
            Atasbend data = await _BludContext.Atasbend.Where(w => w.Idpa == post.Idpa).FirstOrDefaultAsync();
            if(data == null)
            {
                return false;
            }
            data.Idpeg = post.Idpeg;
            data.Updateby = post.Updateby;
            data.Updatetime = post.Updatetime;
            _BludContext.Atasbend.Update(data);
            if(await _BludContext.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<Atasbend> ViewData(long Idpa)
        {
            Atasbend result = new Atasbend();
            IQueryable<Atasbend> data = (
                from atas in _BludContext.Atasbend
                join unit in _BludContext.Daftunit on atas.Idunit equals unit.Idunit into unitMacth
                from unitData in unitMacth.DefaultIfEmpty()
                join pegawai in _BludContext.Pegawai on atas.Idpeg equals pegawai.Idpeg into pegawaiMacth
                from pegawaiData in pegawaiMacth.DefaultIfEmpty()
                where atas.Idpa == Idpa
                select new Atasbend
                {
                    Idpa = atas.Idpa,
                    Idpeg = atas.Idpeg,
                    IdpegNavigation = pegawaiData ?? null,
                    Idunit = atas.Idunit,
                    IdunitNavigation = unitData ?? null
                }
                ).AsQueryable();
            result = await data.FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Atasbend>> ViewDatas()
        {
            List<Atasbend> result = new List<Atasbend>();
            IQueryable<Atasbend> data = (
                from atas in _BludContext.Atasbend
                join unit in _BludContext.Daftunit on atas.Idunit equals unit.Idunit into unitMacth
                from unitData in unitMacth.DefaultIfEmpty()
                join pegawai in _BludContext.Pegawai on atas.Idpeg equals pegawai.Idpeg into pegawaiMacth
                from pegawaiData in pegawaiMacth.DefaultIfEmpty()
                select new Atasbend
                {
                    Idpa = atas.Idpa,
                    Idpeg = atas.Idpeg,
                    IdpegNavigation = pegawaiData ?? null,
                    Idunit = atas.Idunit,
                    IdunitNavigation = unitData?? null
                }
                ).AsQueryable();
            result = await data.ToListAsync();
            return result;
        }
    }
}
