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
    public class PpkRepo : Repo<Ppk>, IPpkRepo
    {
        public PpkRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<PrimengTableResult<Ppk>> Paging(PrimengTableParam<PpkGet> param)
        {
            PrimengTableResult<Ppk> Result = new PrimengTableResult<Ppk>();
            IQueryable<Ppk> query = (
                from data in _BludContext.Ppk
                join peg in _BludContext.Pegawai on data.Idpeg equals peg.Idpeg into pegMatch from pegData in pegMatch.DefaultIfEmpty()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch from unitData in unitMatch.DefaultIfEmpty()
                select new Ppk
                {
                    Idppk = data.Idppk,
                    Idpeg = data.Idpeg,
                    Idunit = data.Idunit,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegData ?? null,
                    IdunitNavigation = unitData ?? null
                }
                ).AsQueryable();
            if(param.Parameters != null)
            {
                if(param.Parameters.Idunit.ToString() != "0")
                {
                    query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.IdunitNavigation.Kdunit.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdunitNavigation.Nmunit.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdpegNavigation.Nip.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdpegNavigation.Nama.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "idunitNavigation.kdunit")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdunitNavigation.Kdunit).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdunitNavigation.Kdunit).AsQueryable();
                    }
                }
                else if (param.SortField == "idunitNavigation.nmunit")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdunitNavigation.Nmunit).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdunitNavigation.Nmunit).AsQueryable();
                    }
                }
                else if (param.SortField == "idpegNavigation.nip")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdpegNavigation.Nip).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdpegNavigation.Nip).AsQueryable();
                    }
                }
                else if (param.SortField == "idpegNavigation.nama")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdpegNavigation.Nama).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdpegNavigation.Nama).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Ppk param)
        {
            Ppk data = await _BludContext.Ppk.Where(w => w.Idppk == param.Idppk).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Idpeg = param.Idpeg;
            data.Idunit = param.Idunit;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            _BludContext.Ppk.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Ppk> ViewData(long Idppk)
        {
            Ppk Result = await (
               from data in _BludContext.Ppk
               join peg in _BludContext.Pegawai on data.Idpeg equals peg.Idpeg into pegMatch
               from pegData in pegMatch.DefaultIfEmpty()
               join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
               from unitData in unitMatch.DefaultIfEmpty()
               where data.Idppk == Idppk
               select new Ppk
               {
                   Idppk = data.Idppk,
                   Idpeg = data.Idpeg,
                   Idunit = data.Idunit,
                   Createdby = data.Createdby,
                   Createddate = data.Createddate,
                   Updateby = data.Updateby,
                   Updatetime = data.Updatetime,
                   IdpegNavigation = pegData ?? null,
                   IdunitNavigation = unitData ?? null
               }).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Ppk>> ViewDatas(PpkGet param)
        {
            List<Ppk> Result = new List<Ppk>();
            IQueryable<Ppk> query = (
                from data in _BludContext.Ppk
                join peg in _BludContext.Pegawai on data.Idpeg equals peg.Idpeg into pegMatch
                from pegData in pegMatch.DefaultIfEmpty()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch
                from unitData in unitMatch.DefaultIfEmpty()
                select new Ppk
                {
                    Idppk = data.Idppk,
                    Idpeg = data.Idpeg,
                    Idunit = data.Idunit,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegData ?? null,
                    IdunitNavigation = unitData ?? null
                }
                ).AsQueryable();
            if (!String.IsNullOrEmpty(param.Idunit.ToString()))
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
