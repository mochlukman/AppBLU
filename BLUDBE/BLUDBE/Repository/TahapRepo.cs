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
    public class TahapRepo : Repo<Tahap>, ITahapRepo
    {
        public TahapRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Lock(Tahap param)
        {
            Tahap data = await _BludContext.Tahap.Where(w => w.Kdtahap.Trim() == param.Kdtahap.Trim()).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Lock = param.Lock;
                _BludContext.Tahap.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<PrimengTableResult<Tahap>> Paging(PrimengTableParam<TahapGet> param)
        {
            PrimengTableResult<Tahap> Result = new PrimengTableResult<Tahap>();
            IQueryable<Tahap> Query = (
                from data in _BludContext.Tahap
                select new Tahap
                {
                    Uraian = data.Uraian,
                    Kdtahap = data.Kdtahap,
                    Ket = data.Ket,
                    EndDate = data.EndDate,
                    Lock = data.Lock,
                    Nmtahap = data.Nmtahap,
                    StartDate = data.StartDate,
                    Tgltransfer = data.Tgltransfer
                }
                ).AsQueryable();
            if(param.Parameters.Kdtahap != "x")
            {
                Query = Query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                       EF.Functions.Like(w.Kdtahap.Trim(), "%" + param.GlobalFilter + "%") ||
                       EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%") ||
                       EF.Functions.Like(w.Ket.Trim(), "%" + param.GlobalFilter + "%") ||
                       EF.Functions.Like(w.Nmtahap.Trim(), "%" + param.GlobalFilter + "%")
                    ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if(param.SortField == "kdtahap")
                {
                    if(param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdtahap.Trim()).AsQueryable();
                    } else
                    {
                        Query = Query.OrderByDescending(o => o.Kdtahap.Trim()).AsQueryable();
                    }
                }
                else if (param.SortField == "uraian")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Uraian.Trim()).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Uraian.Trim()).AsQueryable();
                    }
                }
                else if (param.SortField == "ket")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Ket.Trim()).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Ket.Trim()).AsQueryable();
                    }
                }
                else if (param.SortField == "mmtahap")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nmtahap.Trim()).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nmtahap.Trim()).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Tahap param)
        {
            Tahap data = await _BludContext.Tahap.Where(w => w.Kdtahap.Trim() == param.Kdtahap.Trim()).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nmtahap = param.Nmtahap;
                data.Uraian = param.Uraian;
                data.Nmtahap = param.Nmtahap;
                data.StartDate = param.StartDate;
                data.EndDate = param.EndDate;
                data.Tgltransfer = param.Tgltransfer;
                data.Ket = param.Ket;
                _BludContext.Tahap.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
