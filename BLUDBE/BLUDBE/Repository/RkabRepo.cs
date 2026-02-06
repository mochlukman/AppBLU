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
    public class RkabRepo : Repo<Rkab>, IRkabRepo
    {
        public RkabRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public void CalculateNilai(long Idrkab)
        {
            //decimal? TotalChild = _BludContext.Rkadetb.Where(w => w.Idrkab == Idrkab && w.Idrkadetbduk == 0).Sum(s => s.Subtotal);
            decimal? TotalChild = _BludContext.Rkadetb.Where(w => w.Idrkab == Idrkab && w.Type == "D").Sum(s => s.Subtotal);
            Rkab data = _BludContext.Rkab.Where(w => w.Idrkab == Idrkab).FirstOrDefault();
            if (data != null)
            {
                data.Nilai = TotalChild;
                _BludContext.Rkab.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<PrimengTableResult<RkabView>> Paging(PrimengTableParam<RkaGlobalGet> param)
        {
            PrimengTableResult<RkabView> Result = new PrimengTableResult<RkabView>();
            IQueryable<RkabView> Query = (
                 from data in _BludContext.Rkab
                 join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                 select new RkabView
                 {
                     Createddate = data.Createddate,
                     Idrkab = data.Idrkab,
                     Trkr = data.Trkr,
                     Idrek = data.Idrek,
                     Idrkabx = data.Idrkabx,
                     Rkabx = !String.IsNullOrEmpty(data.Idrkabx.ToString()) ? _BludContext.Rkab.Where(w => w.Idrkab == data.Idrkabx).FirstOrDefault() : null,
                     Createdby = data.Createdby,
                     Idunit = data.Idunit,
                     Kdtahap = data.Kdtahap,
                     Nilai = data.Nilai,
                     IdrekNavigation = rek ?? null,
                     Updateby = data.Updateby,
                     Updatetime = data.Updatetime
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
            if (param.Parameters.Trkr.ToString() != "0")
            {
                Query = Query.Where(w => w.Trkr == param.Parameters.Trkr).AsQueryable();
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

        public async Task<decimal?> TotalNilai(long Idunit, int? Trkr)
        {
            decimal? Result = await _BludContext.Rkab.Where(w => w.Idunit == Idunit && w.Trkr == Trkr).SumAsync(s => s.Nilai);
            return Result;
        }

        public async Task<bool> Update(Rkab param)
        {
            Rkab data = await _BludContext.Rkab.Where(w => w.Idrkab == param.Idrkab).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            _BludContext.Rkab.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkabView> ViewData(long Idrkab)
        {
            RkabView Result = await (
                from data in _BludContext.Rkab
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                where data.Idrkab == Idrkab
                select new RkabView
                {
                    Createddate = data.Createddate,
                    Idrkab = data.Idrkab,
                    Trkr = data.Trkr,
                    Idrek = data.Idrek,
                    Idrkabx = data.Idrkabx,
                    Rkabx = !String.IsNullOrEmpty(data.Idrkabx.ToString()) ? _BludContext.Rkab.Where(w => w.Idrkab == data.Idrkabx).FirstOrDefault() : null,
                    Createdby = data.Createdby,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rek ?? null,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<RkabView>> ViewDatas(RkaGlobalGet param)
        {
            List<RkabView> Result = await (
                from data in _BludContext.Rkab
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                where data.Idunit == param.Idunit && data.Kdtahap.Trim() == param.Kdtahap.Trim() && data.Trkr == param.Trkr
                select new RkabView
                {
                    Createddate = data.Createddate,
                    Idrkab = data.Idrkab,
                    Trkr = data.Trkr,
                    Idrkabx = data.Idrkabx,
                    Rkabx = !String.IsNullOrEmpty(data.Idrkabx.ToString()) ? _BludContext.Rkab.Where(w => w.Idrkab == data.Idrkabx).FirstOrDefault() : null,
                    Idrek = data.Idrek,
                    Createdby = data.Createdby,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Nilai = data.Nilai,
                    IdrekNavigation = rek ?? null,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime
                }
                ).ToListAsync();
            return Result;
        }
    }
}
