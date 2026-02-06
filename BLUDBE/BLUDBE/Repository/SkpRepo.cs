using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SkpRepo : Repo<Skp>, ISkpRepo
    {
        public SkpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Skp>> ViewDatas(long Idunit, long? Idbend, long Idxkode, string Kdstatus, bool istglvalid)
        {
            List<Skp> Result = new List<Skp>();
            IQueryable<Skp> data =  (
                from skp in _BludContext.Skp
                join unit in _BludContext.Daftunit on skp.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on skp.Idbend equals bend.Idbend into bendMacth from bendData in bendMacth.DefaultIfEmpty()
                join phk3 in _BludContext.Daftphk3 on skp.Idphk3 equals phk3.Idphk3 into phk3Macth
                from phk3Data in phk3Macth.DefaultIfEmpty()
                select new Skp
                {
                    Alamat = skp.Alamat,
                    Bunga = skp.Bunga,
                    Idbend = skp.Idbend,
                    IdbendNavigation = bendData ?? null,
                    Idskp = skp.Idskp,
                    Idunit = skp.Idunit,
                    IdunitNavigation = unit ?? null,
                    Idxkode = skp.Idxkode,
                    Kdstatus = skp.Kdstatus,
                    Kenaikan = skp.Kenaikan,
                    Noskp = skp.Noskp,
                    Npwpd = skp.Npwpd,
                    //Penyetor = skp.Penyetor,
                    Penyetor = phk3Data.Nmphk3,
                    Tglskp = skp.Tglskp,
                    Tgltempo = skp.Tgltempo,
                    Tglvalid = skp.Tglvalid,
                    Valid = skp.Valid,
                    Validby = skp.Validby,
                    Uraiskp = skp.Uraiskp,
                    Idphk3 = skp.Idphk3,
                    Idphk3Navigation = phk3Data ?? null
                }
                ).AsQueryable();
            if(Idunit.ToString() != "0")
            {
                data = data.Where(w => w.Idunit == Idunit).AsQueryable();
            }
            if(Idbend.ToString() != "0")
            {
                data = data.Where(w => w.Idbend == Idbend).AsQueryable();
            }
            if(Idxkode.ToString() != "0")
            {
                data = data.Where(w => w.Idxkode == Idxkode).AsQueryable();
            }
            if(Kdstatus.Trim() != "x")
            {
                List<string> status = Kdstatus.Split(",").ToList();
                data = data.Where(w => status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if(istglvalid == true)
            {
                data = data.Where(w => !String.IsNullOrEmpty(w.Tglvalid.ToString())).AsQueryable();
            }
            data = data.OrderBy(o => o.Noskp);
            Result = await data.ToListAsync();
            return Result;
        }
        public async Task<Skp> ViewData(long Idskp)
        {
            Skp data = await (
                from skp in _BludContext.Skp
                join unit in _BludContext.Daftunit on skp.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on skp.Idbend equals bend.Idbend
                join phk3 in _BludContext.Daftphk3 on skp.Idphk3 equals phk3.Idphk3 into phk3Macth
                from phk3Data in phk3Macth.DefaultIfEmpty()
                where skp.Idskp == Idskp
                select new Skp
                {
                    Alamat = skp.Alamat,
                    Bunga = skp.Bunga,
                    Idbend = skp.Idbend,
                    IdbendNavigation = bend ?? null,
                    Idskp = skp.Idskp,
                    Idunit = skp.Idunit,
                    IdunitNavigation = unit ?? null,
                    Idxkode = skp.Idxkode,
                    Kdstatus = skp.Kdstatus,
                    Kenaikan = skp.Kenaikan,
                    Noskp = skp.Noskp,
                    Npwpd = skp.Npwpd,
                    Penyetor = phk3Data.Nmphk3,
                    Tglskp = skp.Tglskp,
                    Tgltempo = skp.Tgltempo,
                    Tglvalid = skp.Tglvalid,
                    Valid = skp.Valid,
                    Validby = skp.Validby,
                    Uraiskp = skp.Uraiskp,
                    Idphk3 = skp.Idphk3,
                    Idphk3Navigation = phk3Data ?? null
                }
                ).FirstOrDefaultAsync();
            return data;
        }
        public async Task<bool> Update(Skp param)
        {
            Skp data = await _BludContext.Skp.Where(w => w.Idskp == param.Idskp).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Noskp = param.Noskp;
            data.Npwpd = param.Npwpd;
            data.Tglskp = param.Tglskp;
            data.Tgltempo = param.Tgltempo;
            data.Uraiskp = param.Uraiskp;
            data.Alamat = param.Alamat;
            data.Penyetor = param.Penyetor;
            data.Bunga = param.Bunga;
            data.Idphk3 = param.Idphk3;
            data.Kenaikan = param.Kenaikan;
            data.Idbend = param.Idbend;
            data.Tglvalid = param.Tglvalid;
            _BludContext.Skp.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> Pengesahan(Skp param)
        {
            Skp data = await _BludContext.Skp.Where(w => w.Idskp == param.Idskp).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Dateupdate = param.Dateupdate;
                data.Tglvalid = param.Tglvalid;
                data.Valid = param.Valid;
                data.Validby = param.Validby;
                _BludContext.Skp.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
