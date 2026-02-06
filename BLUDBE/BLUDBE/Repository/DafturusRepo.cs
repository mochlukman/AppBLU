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
    public class DafturusRepo : Repo<Dafturus>, IDafturusRepo
    {
        public DafturusRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Dafturus>> Paging(PrimengTableParam<DafturusGet> param)
        {
            PrimengTableResult<Dafturus> Result = new PrimengTableResult<Dafturus>();
            IQueryable<Dafturus> query = (
                from data in _BludContext.Dafturus
                join struunit in _BludContext.Struunit on data.Kdlevel equals struunit.Kdlevel
                select new Dafturus
                {
                    Akrounit = data.Akrounit,
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idurus = data.Idurus,
                    Kdlevel = data.Kdlevel,
                    KdlevelNavigation = struunit ?? null,
                    Kdurus = data.Kdurus,
                    Nmurus = data.Nmurus,
                    Type = data.Type,
                    Staktif = data.Staktif,
                    Telepon = data.Telepon
                }).AsQueryable();
            if(param.Parameters.Kdlevel.ToString() != "0")
            {
                string[] Kdlevels = param.Parameters.Kdlevel.Split(',');
                List<int> ListKdlevel = Kdlevels.Select(int.Parse).ToList();
                List<int> ListKdlevels = ListKdlevel.Cast<int>().ToList();
                query = query.Where(w => ListKdlevels.Contains(w.Kdlevel)).AsQueryable();
            }
            if(param.Parameters.Kdurus.Trim() != "x")
            {
                query = query.Where(w => w.Kdurus.Trim() == param.Parameters.Kdurus.Trim()).AsQueryable();
            }
            if(param.Parameters.Nmurus.Trim() != "x")
            {
                query = query.Where(w => w.Nmurus.Trim() == param.Parameters.Nmurus.Trim()).AsQueryable();
            }
            if(param.Parameters.Type.Trim() != "x")
            {
                query = query.Where(w => w.Type.Trim() == param.Parameters.Type.Trim()).AsQueryable();
            }
            if(!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Kdurus.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nmurus.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Type.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "kdurus")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Kdurus).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Kdurus).AsQueryable();
                    }
                }
                else if (param.SortField == "nmurus")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nmurus).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nmurus).AsQueryable();
                    }
                }
                else if (param.SortField == "type")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Type).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Type).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Dafturus param)
        {
            Dafturus data = await _BludContext.Dafturus.Where(w => w.Idurus == param.Idurus).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdurus = param.Kdurus;
            data.Nmurus = param.Nmurus;
            data.Type = param.Type;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dafturus.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Dafturus> ViewData(long Idurus)
        {
            Dafturus Result = await (
                from data in _BludContext.Dafturus
                join struunit in _BludContext.Struunit on data.Kdlevel equals struunit.Kdlevel
                where data.Idurus == Idurus
                select new Dafturus
                {
                    Akrounit = data.Akrounit,
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idurus = data.Idurus,
                    Kdlevel = data.Kdlevel,
                    KdlevelNavigation = struunit ?? null,
                    Kdurus = data.Kdurus,
                    Nmurus = data.Nmurus,
                    Type = data.Type,
                    Staktif = data.Staktif,
                    Telepon = data.Telepon
                }).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Dafturus>> ViewDatas(DafturusGet param)
        {
            List<Dafturus> Result = new List<Dafturus>();
            IQueryable<Dafturus> query = (
                from data in _BludContext.Dafturus
                join struunit in _BludContext.Struunit on data.Kdlevel equals struunit.Kdlevel
                select new Dafturus
                {
                    Akrounit = data.Akrounit,
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idurus = data.Idurus,
                    Kdlevel = data.Kdlevel,
                    KdlevelNavigation = struunit ?? null,
                    Kdurus = data.Kdurus,
                    Nmurus = data.Nmurus,
                    Type = data.Type,
                    Staktif = data.Staktif,
                    Telepon = data.Telepon
                }).AsQueryable();
            if (param.Kdlevel.ToString() != "0")
            {
                string[] Kdlevels = param.Kdlevel.Split(',');
                List<int> ListKdlevel = Kdlevels.Select(int.Parse).ToList();
                List<int> ListKdlevels = ListKdlevel.Cast<int>().ToList();
                query = query.Where(w => ListKdlevels.Contains(w.Kdlevel)).AsQueryable();
            }
            if (param.Kdurus.Trim() != "x")
            {
                query = query.Where(w => w.Kdurus.Trim() == param.Kdurus.Trim()).AsQueryable();
            }
            if (param.Nmurus.Trim() != "x")
            {
                query = query.Where(w => w.Nmurus.Trim() == param.Nmurus.Trim()).AsQueryable();
            }
            if (param.Type.Trim() != "x")
            {
                query = query.Where(w => w.Type.Trim() == param.Type.Trim()).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
