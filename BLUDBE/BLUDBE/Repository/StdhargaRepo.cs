using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StdhargaRepo : Repo<Stdharga>, IStdhargaRepo
    {
        public StdhargaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Stdharga>> Paging(PrimengTableParam<Stdharga> param)
        {
            PrimengTableResult<Stdharga> Result = new PrimengTableResult<Stdharga>();
            IQueryable<Stdharga> Query = _BludContext.Stdharga.AsQueryable();
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w => EF.Functions.Like(w.Nostd.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nmstd.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Kdsatuan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Hrgstd.ToString(), "%" + param.GlobalFilter + "%")).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nostd")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nostd).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nostd).AsQueryable();
                    }
                }
                else if (param.SortField == "nmstd")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nmstd).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nmstd).AsQueryable();
                    }
                }
                else if (param.SortField == "kdsatuan")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdsatuan).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Kdsatuan).AsQueryable();
                    }
                }
                else if (param.SortField == "hrgstd")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Hrgstd).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Hrgstd).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).OrderBy(o => o.Nostd.Trim()).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }
    }
}
