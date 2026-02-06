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
    public class DaftbarangRepo : Repo<Daftbarang>, IDaftbarangRepo
    {
        public DaftbarangRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Daftbarang>> Paging(PrimengTableParam<DaftbarangGet> param)
        {
            PrimengTableResult<Daftbarang> Result = new PrimengTableResult<Daftbarang>();
            IQueryable<Daftbarang> Query = (
                from data in _BludContext.Daftbarang
                join strurek in _BludContext.Strurek on data.Mtglevel equals strurek.Mtglevel into mtlevelMatch from mtlevelData in mtlevelMatch.DefaultIfEmpty()
                select new Daftbarang
                {
                    Idbrg = data.Idbrg,
                    Idparent = data.Idparent,
                    Kdbrg = data.Kdbrg,
                    Nmbrg = data.Nmbrg,
                    Ket = data.Ket,
                    Mtglevel = data.Mtglevel,
                    Type = data.Type,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    MtglevelNavigation = mtlevelData ?? null
                }
                ).AsQueryable();
            if (param.Parameters.Kdbrg.Trim() != "x")
            {
                Query = Query.Where(w => w.Kdbrg.Trim() == param.Parameters.Kdbrg.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                    EF.Functions.Like(w.Kdbrg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nmbrg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Ket.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Type.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "kdbrg")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdbrg).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Kdbrg).AsQueryable();
                    }
                }
                else if (param.SortField == "nmbrg")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nmbrg).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nmbrg).AsQueryable();
                    }
                }
                else if (param.SortField == "type")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Type).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Type).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Daftbarang param)
        {
            Daftbarang data = await _BludContext.Daftbarang.Where(w => w.Idbrg == param.Idbrg).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdbrg = param.Kdbrg;
            data.Nmbrg = param.Nmbrg;
            data.Idparent = param.Idparent;
            data.Ket = param.Ket;
            data.Type = param.Type;
            data.Mtglevel = param.Mtglevel;
            data.Updateby = param.Updateby;
            data.Updatedate = param.Updatedate;
            _BludContext.Daftbarang.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Daftbarang> ViewData(long Idbrg)
        {
            Daftbarang result = await (
                 from data in _BludContext.Daftbarang
                 join strurek in _BludContext.Strurek on data.Mtglevel equals strurek.Mtglevel into mtlevelMatch
                 from mtlevelData in mtlevelMatch.DefaultIfEmpty()
                 where data.Idbrg == Idbrg
                 select new Daftbarang
                 {
                     Idbrg = data.Idbrg,
                     Idparent = data.Idparent,
                     Kdbrg = data.Kdbrg,
                     Nmbrg = data.Nmbrg,
                     Ket = data.Ket,
                     Mtglevel = data.Mtglevel,
                     Type = data.Type,
                     Createdby = data.Createdby,
                     Createddate = data.Createddate,
                     Updateby = data.Updateby,
                     Updatedate = data.Updatedate,
                     MtglevelNavigation = mtlevelData ?? null
                 }
                ).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Daftbarang>> ViewDatas(DaftbarangGet param)
        {
            List<Daftbarang> result = await (
                 from data in _BludContext.Daftbarang
                 join strurek in _BludContext.Strurek on data.Mtglevel equals strurek.Mtglevel into mtlevelMatch
                 from mtlevelData in mtlevelMatch.DefaultIfEmpty()
                 select new Daftbarang
                 {
                     Idbrg = data.Idbrg,
                     Idparent = data.Idparent,
                     Kdbrg = data.Kdbrg,
                     Nmbrg = data.Nmbrg,
                     Ket = data.Ket,
                     Mtglevel = data.Mtglevel,
                     Type = data.Type,
                     Createdby = data.Createdby,
                     Createddate = data.Createddate,
                     Updateby = data.Updateby,
                     Updatedate = data.Updatedate,
                     MtglevelNavigation = mtlevelData ?? null
                 }
                ).ToListAsync();
            return result;
        }
    }
}
