using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SpjapbdRepo : Repo<Spjapbd>, ISpjapbdRepo
    {
        public SpjapbdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Spjapbd>> Paging(PrimengTableParam<SpjapbdGet> param)
        {
            PrimengTableResult<Spjapbd> Result = new PrimengTableResult<Spjapbd>();
            IQueryable<Spjapbd> query = (
                from data in _BludContext.Spjapbd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMacth
                from unitData in unitMacth.DefaultIfEmpty()
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMacth
                from kegData in kegMacth.DefaultIfEmpty()
                select new Spjapbd
                {
                    Idspjapbd = data.Idspjapbd,
                    Idkeg = data.Idkeg,
                    Idunit = data.Idunit,
                    Kdstatus = data.Kdstatus,
                    Nospj = data.Nospj,
                    Tglspj = data.Tglspj,
                    Tglvalid = data.Tglvalid,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Keterangan = data.Keterangan,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdunitNavigation = unitData ?? null,
                    IdkegNavigation = kegData ?? null
                   
                }
                ).AsQueryable();
            if (param.Parameters != null)
            {
                if (param.Parameters.Idunit.ToString() != "0")
                {
                    query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
                }
                if (!String.IsNullOrEmpty(param.Parameters.Kdstatus))
                {
                    List<string> split_status = param.Parameters.Kdstatus.Split(",").ToList();
                    query = query.Where(w => split_status.Contains(w.Kdstatus.Trim())).AsQueryable();
                }
                if (param.Parameters.Idkeg.ToString() != "0")
                {
                    query = query.Where(w => w.Idkeg == param.Parameters.Idkeg).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nospj.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglspj.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Keterangan.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nospj")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nospj).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nospj).AsQueryable();
                    }
                }
                else if (param.SortField == "tglspj")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglspj).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglspj).AsQueryable();
                    }
                }
                else if (param.SortField == "tglvalid")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglvalid).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglvalid).AsQueryable();
                    }
                }
                else if (param.SortField == "keterangan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Keterangan).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Keterangan).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Pengesahan(Spjapbd param)
        {
            Spjapbd data = await _BludContext.Spjapbd.Where(w => w.Idspjapbd == param.Idspjapbd).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            data.Tglvalid = data.Tglvalid;
            data.Keterangan = param.Keterangan;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spjapbd.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> Update(Spjapbd param)
        {
            Spjapbd data = await _BludContext.Spjapbd.Where(w => w.Idspjapbd == param.Idspjapbd).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nospj = param.Nospj;
            data.Tglspj = param.Tglspj;
            data.Keterangan = param.Keterangan;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spjapbd.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Spjapbd> ViewData(long Idspjapbd)
        {
            Spjapbd result = await (
                from data in _BludContext.Spjapbd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMacth
                from unitData in unitMacth.DefaultIfEmpty()
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMacth
                from kegData in kegMacth.DefaultIfEmpty()
                where data.Idspjapbd == Idspjapbd
                select new Spjapbd
                {
                    Idspjapbd = data.Idspjapbd,
                    Idkeg = data.Idkeg,
                    Idunit = data.Idunit,
                    Kdstatus = data.Kdstatus,
                    Nospj = data.Nospj,
                    Tglspj = data.Tglspj,
                    Tglvalid = data.Tglvalid,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Keterangan = data.Keterangan,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdunitNavigation = unitData ?? null,
                    IdkegNavigation = kegData ?? null

                }
                ).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Spjapbd>> ViewDatas(SpjapbdGet param)
        {
            IQueryable<Spjapbd> query = (
                from data in _BludContext.Spjapbd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMacth
                from unitData in unitMacth.DefaultIfEmpty()
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMacth
                from kegData in kegMacth.DefaultIfEmpty()
                select new Spjapbd
                {
                    Idspjapbd = data.Idspjapbd,
                    Idkeg = data.Idkeg,
                    Idunit = data.Idunit,
                    Kdstatus = data.Kdstatus,
                    Nospj = data.Nospj,
                    Tglspj = data.Tglspj,
                    Tglvalid = data.Tglvalid,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Keterangan = data.Keterangan,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdunitNavigation = unitData ?? null,
                    IdkegNavigation = kegData ?? null

                }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.Kdstatus))
            {
                List<string> split_status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => split_status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if (param.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Idkeg).AsQueryable();
            }
            List<Spjapbd> datas = await query.ToListAsync();
            return datas;
        }
    }
}
