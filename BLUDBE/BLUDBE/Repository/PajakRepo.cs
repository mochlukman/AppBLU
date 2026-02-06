using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class PajakRepo : Repo<Pajak>, IPajakRepo
    {
        public PajakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Pajak>> GetBySppdetr(long Idsppdetr)
        {
            List<long> pajakUsed = await _BludContext.Sppdetrp.Where(w => w.Idsppdetr == Idsppdetr).Select(w => w.Idpajak).ToListAsync();
            List<Pajak> datas = await _BludContext.Pajak.Where(w => !pajakUsed.Contains(w.Idpajak)).ToListAsync();
            return datas;
        }
        public async Task<bool> Update(Pajak param)
        {
            Pajak data = await _BludContext.Pajak.Where(w => w.Idpajak == param.Idpajak).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Kdpajak = param.Kdpajak;
                data.Nmpajak = param.Nmpajak;
                data.Uraian = param.Uraian;
                data.Keterangan = param.Keterangan;
                data.Rumuspajak = param.Rumuspajak;
                data.Idjnspajak = param.Idjnspajak;
                data.Staktif = param.Staktif;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Pajak.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<Pajak> ViewData(long Idpajak)
        {
            Pajak Result = await (
                 from data in _BludContext.Pajak
                 join jenis in _BludContext.Jnspajak on data.Idjnspajak equals jenis.Idjnspajak into jenisMatch
                 from jenis_data in jenisMatch.DefaultIfEmpty()
                 where data.Idpajak == Idpajak
                 select new Pajak
                 {
                     Datecreate = data.Datecreate,
                     Dateupdate = data.Dateupdate,
                     Idjnspajak = data.Idjnspajak,
                     Idpajak = data.Idpajak,
                     Kdper = data.Kdper,
                     Kdpajak = data.Kdpajak,
                     Keterangan = data.Keterangan,
                     Nmpajak = data.Nmpajak,
                     Uraian = data.Uraian,
                     Staktif = data.Staktif,
                     Rumuspajak = data.Rumuspajak,
                     IdjnspajakNavigation = jenis_data ?? null
                 }
                 ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Pajak>> ViewDatas(PajakGet param)
        {
            List<Pajak> Result = new List<Pajak>();
            IQueryable<Pajak> query = (
                from data in _BludContext.Pajak
                join jenis in _BludContext.Jnspajak on data.Idjnspajak equals jenis.Idjnspajak into jenisMatch
                from jenis_data in jenisMatch.DefaultIfEmpty()
                select new Pajak
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idjnspajak = data.Idjnspajak,
                    Idpajak = data.Idpajak,
                    Kdper = data.Kdper,
                    Kdpajak = data.Kdpajak,
                    Keterangan = data.Keterangan,
                    Nmpajak = data.Nmpajak,
                    Uraian = data.Uraian,
                    Staktif = data.Staktif,
                    Rumuspajak = data.Rumuspajak,
                    IdjnspajakNavigation = jenis_data ?? null
                }
                ).AsQueryable();
            if(param.Idjnspajak.ToString() != "0")
            {
                query = query.Where(w => w.Idjnspajak == param.Idjnspajak).AsQueryable();
            }
            if(param.Idsppdetr.ToString() != "0")
            {
                List<long> sppdetrp = await _BludContext.Sppdetrp.Where(w => w.Idsppdetr == param.Idsppdetr).Select(w => w.Idpajak).ToListAsync();
                if(sppdetrp.Count() > 0)
                {
                    query = query.Where(w => !sppdetrp.Contains(w.Idpajak)).AsQueryable();
                }
            }
            if(param.Idbpkpajak.ToString() != "0")
            {
                List<long> bpkpajakdet = await _BludContext.Bpkpajakdet.Where(w => w.Idbpkpajak == param.Idbpkpajak).Select(s => s.Idpajak).ToListAsync();
                if (bpkpajakdet.Count() > 0)
                {
                    query = query.Where(w => !bpkpajakdet.Contains(w.Idpajak)).AsQueryable();
                }
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
