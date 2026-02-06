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
    public class RkadRepo : Repo<Rkad>, IRkadRepo
    {
        public RkadRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public void CalculateNilai(long Idrkad)
        {
            //decimal? TotalChild = _BludContext.Rkadetd.Where(w => w.Idrkad == Idrkad && (w.Idrkadetdduk == 0 || w.Idrkadetdduk.ToString() == null)).Sum(s => s.Subtotal);
            decimal? TotalChild = _BludContext.Rkadetd.Where(w => w.Idrkad == Idrkad && w.Type == "D").Sum(s => s.Subtotal);
            Rkad data = _BludContext.Rkad.Where(w => w.Idrkad == Idrkad).FirstOrDefault();
            if(data != null)
            {
                data.Nilai = TotalChild;
                _BludContext.Rkad.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<PrimengTableResult<RkadView>> Paging(PrimengTableParam<RkaGlobalGet> param)
        {
            PrimengTableResult<RkadView> Result = new PrimengTableResult<RkadView>();
            IQueryable<RkadView> Query = (
                 from data in _BludContext.Rkad
                 join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                 select new RkadView
                 {
                     Createddate = data.Createddate,
                     Idrkad = data.Idrkad,
                     Idrkadx = data.Idrkadx,
                     Rkadx = !String.IsNullOrEmpty(data.Idrkadx.ToString()) ? _BludContext.Rkad.Where(w => w.Idrkad == data.Idrkadx).FirstOrDefault() : null,
                     Idrek = data.Idrek,
                     Createdby = data.Createdby,
                     Idunit = data.Idunit,
                     Kdtahap = data.Kdtahap,
                     Nilai = data.Nilai,
                     IdrekNavigation = rek ?? null,
                     Updateby = data.Updateby,
                     Updatetime = data.Updatetime
                 }
                 ).AsQueryable();
            if(param.Parameters.Idunit.ToString() != "0")
            {
                Query = Query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Kdtahap != "x")
            {
                Query = Query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
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
                if(param.SortField == "idrekNavigation.kdper")
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
                else if(param.SortField == "idrekNavigation.nmper")
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
                else if(param.SortField == "nilai")
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

        public async Task<decimal?> TotalNilai(long Idunit, long? Idrkadx)
        {
            decimal? Result = 0;
            if (String.IsNullOrEmpty(Idrkadx.ToString()))
            {
                Result = await _BludContext.Rkad.Where(w => w.Idunit == Idunit && w.Idrkadx == null).SumAsync(s => s.Nilai);
            } else
            {
                Result = await _BludContext.Rkad.Where(w => w.Idunit == Idunit && w.Idrkadx != null).SumAsync(s => s.Nilai); // Idrkadx ini Untuk Perubahan, jiga tidak null berarti perubahan
            }
            return Result;
        }

        public async Task<bool> Update(Rkad param)
        {
            Rkad data = await _BludContext.Rkad.Where(w => w.Idrkad == param.Idrkad).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            _BludContext.Rkad.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkadView> ViewData(long Idrkad)
        {
            RkadView Result = await (
                from data in _BludContext.Rkad
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                where data.Idrkad == Idrkad
                select new RkadView
                {
                    Createddate = data.Createddate,
                    Idrkad = data.Idrkad,
                    Idrkadx = data.Idrkadx,
                    Rkadx = !String.IsNullOrEmpty(data.Idrkadx.ToString()) ? _BludContext.Rkad.Where(w => w.Idrkad == data.Idrkadx).FirstOrDefault() : null,
                    Idrek = data.Idrek,
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

        public async Task<List<RkadView>> ViewDatas(RkaGlobalGet param)
        {
            List<RkadView> Result = await(
                from data in _BludContext.Rkad
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                where data.Idunit == param.Idunit && data.Kdtahap.Trim() == param.Kdtahap.Trim()
                select new RkadView
                {
                    Createddate = data.Createddate,
                    Idrkad = data.Idrkad,
                    Idrkadx = data.Idrkadx,
                    Rkadx = !String.IsNullOrEmpty(data.Idrkadx.ToString()) ? _BludContext.Rkad.Where(w => w.Idrkad == data.Idrkadx).FirstOrDefault() : null,
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
