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
    public class RkarRepo : Repo<Rkar>, IRkarRepo
    {
        public RkarRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public void CalculateNilai(long Idrkar)
        {
            //decimal? TotalChild = _BludContext.Rkadetr.Where(w => w.Idrkar == Idrkar && w.Type == "D" && (w.Idrkadetrduk == 0 || w.Idrkadetrduk.ToString() == null)).Sum(s => s.Subtotal);
            decimal? TotalChild = _BludContext.Rkadetr.Where(w => w.Idrkar == Idrkar && w.Type == "D").Sum(s => s.Subtotal);
            Rkar data = _BludContext.Rkar.Where(w => w.Idrkar == Idrkar).FirstOrDefault();
            if (data != null)
            {
                data.Nilai = TotalChild;
                _BludContext.Rkar.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<PrimengTableResult<RkarView>> Paging(PrimengTableParam<RkaGlobalGet> param)
        {
            PrimengTableResult<RkarView> Result = new PrimengTableResult<RkarView>();
            IQueryable<RkarView> Query = (

                 from data in _BludContext.Rkar
                 join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                 join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                 select new RkarView
                 {
                     Createddate = data.Createddate,
                     Idrkar = data.Idrkar,
                     Idrkarx = data.Idrkarx,
                     Rkarx = !String.IsNullOrEmpty(data.Idrkarx.ToString()) ? _BludContext.Rkar.Where(w => w.Idrkar == data.Idrkarx).FirstOrDefault() : null,
                     Idrek = data.Idrek,
                     Createdby = data.Createdby,
                     Idunit = data.Idunit,
                     Kdtahap = data.Kdtahap,
                     Nilai = data.Nilai,
                     IdrekNavigation = rek ?? null,
                     Updateby = data.Updateby,
                     Updatetime = data.Updatetime,
                     Idkeg = data.Idkeg,
                     IdkegNavigation = mkeg ?? null
                 }
                 ).AsQueryable();
            if (param.Parameters.Idunit.ToString() != "0")
            {
                Query = Query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if (param.Parameters.Kdtahap != "x")
            {
                Query = Query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
            }
            if(param.Parameters.Idkeg.ToString() != "0")
            {
                Query = Query.Where(w => w.Idkeg == param.Parameters.Idkeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                    EF.Functions.Like(w.IdrekNavigation.Kdper.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdrekNavigation.Nmper.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "idrekNavigation.kdper")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.IdrekNavigation.Kdper).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.IdrekNavigation.Kdper).AsQueryable();
                    }
                }
                else if (param.SortField == "idrekNavigation.nmper")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.IdrekNavigation.Nmper).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.IdrekNavigation.Nmper).AsQueryable();
                    }
                }
                else if (param.SortField == "nilai")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nilai).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nilai).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).OrderBy(o => o.IdrekNavigation.Kdper).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            if (Result.Data.Count() > 0)
            {
                Result.OptionalResult = new PrimengTableResultOptional
                {
                    TotalNilai = Query.Sum(s => s.Nilai)
                };
            }
            Result.Isvalid = await _BludContext.Rkasah.AnyAsync(w => w.Idunit == param.Parameters.Idunit && w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()) ? true : false;
            return Result;
        }

        public async Task<decimal?> TotalNilai(long Idunit, long Idkeg, string Kdtahap)
        {
            decimal? Result = await _BludContext.Rkar.Where(w => w.Idunit == Idunit && w.Idkeg == Idkeg && w.Kdtahap == Kdtahap).SumAsync(s => s.Nilai);
            return Result;
        }
        public async Task<decimal?> TotalNilaiKeg(long Idunit, long Idkeg, string Kdtahap)
        {
            decimal? Result = await _BludContext.Rkar.Where(w => w.Idunit == Idunit && w.Idkeg == Idkeg && w.Kdtahap == Kdtahap).SumAsync(s => s.Nilai);
            return Result;
        }

        public async Task<bool> Update(Rkar param)
        {
            Rkar data = await _BludContext.Rkar.Where(w => w.Idrkar == param.Idrkar).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            _BludContext.Rkar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkarView> ViewData(long Idrkar)
        {
            RkarView Result = await (
                from data in _BludContext.Rkar
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                where data.Idrkar == Idrkar
                select new RkarView
                {
                    Createddate = data.Createddate,
                    Idrkar = data.Idrkar,
                    Idrek = data.Idrek,
                    Idrkarx = data.Idrkarx,
                    Rkarx = !String.IsNullOrEmpty(data.Idrkarx.ToString()) ? _BludContext.Rkar.Where(w => w.Idrkar == data.Idrkarx).FirstOrDefault() : null,
                    Createdby = data.Createdby,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rek ?? null,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Idkeg = data.Idkeg,
                    IdkegNavigation = mkeg ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<RkarView>> ViewDatas(RkaGlobalGet param)
        {
            List<RkarView> Result = await (
                from data in _BludContext.Rkar
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                where data.Idunit == param.Idunit && data.Kdtahap.Trim() == param.Kdtahap.Trim()
                select new RkarView
                {
                    Createddate = data.Createddate,
                    Idrkar = data.Idrkar,
                    Idrek = data.Idrek,
                    Idrkarx = data.Idrkarx,
                    Rkarx = !String.IsNullOrEmpty(data.Idrkarx.ToString()) ? _BludContext.Rkar.Where(w => w.Idrkar == data.Idrkarx).FirstOrDefault() : null,
                    Createdby = data.Createdby,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rek ?? null,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Idkeg = data.Idkeg,
                    IdkegNavigation = mkeg ?? null
                }
                ).ToListAsync();
            return Result;
        }
    }
}
