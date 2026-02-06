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
    public class KontrakRepo : Repo<Kontrak>, IKontrakRepo
    {
        public KontrakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Kontrak param)
        {
            Kontrak data = await _BludContext.Kontrak.Where(w => w.Idkontrak == param.Idkontrak).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nokontrak = param.Nokontrak;
                data.Idphk3 = param.Idphk3;
                data.Idkeg = param.Idkeg;
                data.Tglkontrak = param.Tglkontrak;
                data.Tglakhirkontrak = param.Tglakhirkontrak;
                data.Uraian = param.Uraian;
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Kontrak.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<bool> UpdateNilai(long Idkontrak, decimal? Nilai)
        {
            Kontrak data = await _BludContext.Kontrak.Where(w => w.Idkontrak == Idkontrak).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Nilai = Nilai;
                _BludContext.Kontrak.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<List<Kontrak>> viewDatas(long Idunit, long Idkeg)
        {
            List<Kontrak> Result = new List<Kontrak>();
            IQueryable<Kontrak> Query = (
                from data in _BludContext.Kontrak
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMatch
                from kegData in kegMatch.DefaultIfEmpty()
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match
                from phk3Data in phk3Match.DefaultIfEmpty()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                from unitData in unitMatch.DefaultIfEmpty()
                select new Kontrak
                {
                    Idunit = data.Idunit,
                    Idkontrak = data.Idkontrak,
                    Berita = data.Berita,
                    Idkeg = data.Idkeg,
                    Nilai = data.Nilai,
                    Nokontrak = data.Nokontrak,
                    Tglakhirkontrak = data.Tglakhirkontrak,
                    Tglkontrak = data.Tglkontrak,
                    Uraian = data.Uraian,
                    Idphk3 = data.Idphk3,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdkegNavigation = kegData ?? null,
                    Idphk3Navigation = phk3Data ?? null
                }
                ).AsQueryable();
            if (Idunit.ToString() != "0")
            {
                Query = Query.Where(w => w.Idunit == Idunit).AsQueryable();
            }
            if (Idkeg.ToString() != "0")
            {
                Query = Query.Where(w => w.Idkeg == Idkeg).AsQueryable();
            }
            //Query = Query.OrderBy(o => o.Nokontrak);
            Result = await Query.ToListAsync();
            return Result;
        }
        public async Task<PrimengTableResult<Kontrak>> Paging(PrimengTableParam<KontrakGet> param)
        {
            PrimengTableResult<Kontrak> Result = new PrimengTableResult<Kontrak>();
            List<long> idKontraks = new List<long>();
            if (param.Parameters.NoKontrakExist)
            {
                idKontraks = await _BludContext.Tagihan
                    .Where(w => w.Idunit == param.Parameters.Idunit && w.Idkeg == param.Parameters.Idkeg)
                    .Select(s => s.Idkontrak).ToListAsync();
            }
            var query = (
                    from data in _BludContext.Kontrak
                    join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMatch
                    from kegData in kegMatch.DefaultIfEmpty()
                    join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match
                    from phk3Data in phk3Match.DefaultIfEmpty()
                    join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                    from unitData in unitMatch.DefaultIfEmpty()
                    select new Kontrak
                    {
                        Idunit = data.Idunit,
                        Idkontrak = data.Idkontrak,
                        Berita = data.Berita,
                        Idkeg = data.Idkeg,
                        Nilai = data.Nilai,
                        Nokontrak = data.Nokontrak,
                        Tglakhirkontrak = data.Tglakhirkontrak,
                        Tglkontrak = data.Tglkontrak,
                        Uraian = data.Uraian,
                        Idphk3 = data.Idphk3,
                        Datecreate = data.Datecreate,
                        Dateupdate = data.Dateupdate,
                        IdkegNavigation = kegData ?? null,
                        Idphk3Navigation = phk3Data ?? null
                    }
                );
            if (param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if (param.Parameters.Idphk3.ToString() != "0")
            {
                query = query.Where(w => w.Idphk3 == param.Parameters.Idphk3).AsQueryable();
            }
            if (param.Parameters.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Parameters.Idkeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                     EF.Functions.Like((w.Nokontrak ?? "").Trim(), "%" + param.GlobalFilter + "%") ||
                     EF.Functions.Like((w.Uraian ?? "").Trim(), "%" + param.GlobalFilter + "%") ||
                     EF.Functions.Like((w.Idphk3Navigation != null ? (w.Idphk3Navigation.Nmphk3 ?? "") : ""), "%" + param.GlobalFilter + "%")
                );
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nokontrak")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nokontrak);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nokontrak);
                    }
                }
                else if (param.SortField == "tglkontrak")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglkontrak);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglkontrak);
                    }
                }
                else if (param.SortField == "tglakhirkontrak")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglakhirkontrak);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglakhirkontrak);
                    }
                }
                else if (param.SortField == "uraian")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Uraian);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Uraian);
                    }
                }
                
            }
            if ((idKontraks.Count() > 0) && (param.Parameters.Idphk3.ToString() == "0"))
                {
                query = query.Where(w => !idKontraks.Contains(w.Idkontrak));
            }
            //query = query.OrderBy(o => o.Nokontrak);
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            /*if (Result.Data.Count() > 0)
            {
                foreach (var f in Result.Data)
                {
                    if (f.Idphk3Navigation != null)
                    {
                        f.IdbendNavigation.IdpegNavigation = await _BludContext.Pegawai.Where(w => w.Idpeg == f.IdbendNavigation.Idpeg).FirstOrDefaultAsync();
                        if (!String.IsNullOrEmpty(f.IdbendNavigation.Jnsbend))
                        {
                            f.IdbendNavigation.JnsbendNavigation = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == f.IdbendNavigation.Jnsbend.Trim()).FirstOrDefaultAsync();
                        }
                    }
                }
            }*/
            return Result;
        }
    }
}
