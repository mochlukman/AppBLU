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
    public class BpkdetrRepo : Repo<Bpkdetr>, IBpkdetrRepo
    {
        public BpkdetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Bpkdetr>> Paging(PrimengTableParam<BpkdetrGet> param)
        {
            PrimengTableResult<Bpkdetr> Result = new PrimengTableResult<Bpkdetr>();
            var query = (
                    from data in _BludContext.Bpkdetr.AsNoTracking()
                    join bpk in _BludContext.Bpk.AsNoTracking() on data.Idbpk equals bpk.Idbpk
                    join jtrnlkas in _BludContext.Jtrnlkas.AsNoTracking() on data.Idnojetra equals jtrnlkas.Idnojetra into jtrnlkasMatch
                    from jtrnlkas_data in jtrnlkasMatch.DefaultIfEmpty()
                    join rekening in _BludContext.Daftrekening.AsNoTracking() on data.Idrek equals rekening.Idrek
                    join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMatch
                    from dana_data in danaMatch.DefaultIfEmpty()
                    select new Bpkdetr
                    {
                        Idbpkdetr = data.Idbpkdetr,
                        Idbpk = data.Idbpk,
                        Idnojetra = data.Idnojetra,
                        IdnojetraNavigation = jtrnlkas_data ?? null,
                        Idrek = data.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Datecreate = data.Datecreate,
                        Nilai = data.Nilai,
                        Dateupdate = data.Dateupdate,
                        Idkeg = data.Idkeg,
                        IdbpkNavigation = bpk ?? null,
                        Idjdana = data.Idjdana,
                        IdjdanaNavigation = dana_data ?? null
                    }
                );
            if (param.Parameters.Idbpk.ToString() != "0")
            {
                query = query.Where(w => w.Idbpk == param.Parameters.Idbpk);
            }
            if (param.Parameters.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Parameters.Idkeg);
            }
            Result.Totalrecords = await query.CountAsync();
            Result.TotalNilai = query.Sum(s => s.Nilai);
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            return Result;
        }

        public async Task<bool> Update(Bpkdetr param)
        {
            Bpkdetr data = await _BludContext.Bpkdetr.Where(w => w.Idbpkdetr == param.Idbpkdetr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Dateupdate = param.Dateupdate;
            data.Idjdana = param.Idjdana;
            data.Nilai = param.Nilai;
            _BludContext.Bpkdetr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Bpkdetr> ViewData(long Idbpkdetr)
        {
            Bpkdetr Result = await (
                    from data in _BludContext.Bpkdetr
                    join jtrnlkas in _BludContext.Jtrnlkas on data.Idnojetra equals jtrnlkas.Idnojetra into jtrnlkasMatch from jtrnlkas_data in jtrnlkasMatch.DefaultIfEmpty()
                    join rekening in _BludContext.Daftrekening on data.Idrek equals rekening.Idrek
                    join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMatch
                    from dana_data in danaMatch.DefaultIfEmpty()
                    where data.Idbpkdetr == Idbpkdetr
                    select new Bpkdetr
                    {
                        Idbpkdetr = data.Idbpkdetr,
                        Idbpk = data.Idbpk,
                        Idnojetra = data.Idnojetra,
                        IdnojetraNavigation = jtrnlkas_data ?? null,
                        Idrek = data.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Datecreate = data.Datecreate,
                        Nilai = data.Nilai,
                        Dateupdate = data.Dateupdate,
                        Idkeg = data.Idkeg,
                        Idjdana = data.Idjdana,
                        IdjdanaNavigation = dana_data ?? null
                    }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Bpkdetr>> ViewDatas(BpkdetrGet param)
        {
            List<Bpkdetr> Result = new List<Bpkdetr>();
            IQueryable<Bpkdetr> query = (
                    from data in _BludContext.Bpkdetr
                    join jtrnlkas in _BludContext.Jtrnlkas on data.Idnojetra equals jtrnlkas.Idnojetra into jtrnlkasMatch
                    from jtrnlkas_data in jtrnlkasMatch.DefaultIfEmpty()
                    join rekening in _BludContext.Daftrekening on data.Idrek equals rekening.Idrek
                    join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMatch
                    from dana_data in danaMatch.DefaultIfEmpty()
                    select new Bpkdetr
                    {
                        Idbpkdetr = data.Idbpkdetr,
                        Idbpk = data.Idbpk,
                        Idnojetra = data.Idnojetra,
                        IdnojetraNavigation = jtrnlkas_data ?? null,
                        Idrek = data.Idrek,
                        IdrekNavigation = rekening ?? null,
                        Datecreate = data.Datecreate,
                        Nilai = data.Nilai,
                        Dateupdate = data.Dateupdate,
                        Idkeg = data.Idkeg,
                        Idjdana = data.Idjdana,
                        IdjdanaNavigation = dana_data ?? null
                    }
                ).AsQueryable();
            if(param.Idbpk.ToString() != "0")
            {
                query = query.Where(w => w.Idbpk == param.Idbpk).AsQueryable();
            }
            if(param.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Idkeg).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
