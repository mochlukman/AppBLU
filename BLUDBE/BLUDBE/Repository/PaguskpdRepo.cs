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
    public class PaguskpdRepo : Repo<Paguskpd>, IPaguskpdRepo
    {
        public PaguskpdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<PaguskpdView>> Paging(PrimengTableParam<PaguskpdGet> param)
        {
            PrimengTableResult<PaguskpdView> Result = new PrimengTableResult<PaguskpdView>();
            IQueryable<PaguskpdView> Query = (
                from data in _BludContext.Paguskpd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                select new PaguskpdView
                {
                    Idpaguskpd = data.Idpaguskpd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Kdtahap = data.Kdtahap,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null,
                    Kdunit = unit != null ? unit.Kdunit : "",
                    Nmunit = unit != null ? unit.Nmunit : "",
                    Nilai = data.Nilai,
                    Nilaiup = data.Nilaiup
                }
                ).AsQueryable();
            if (param.Parameters.Kdtahap.Trim() != "x")
            {
                Query = Query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                    EF.Functions.Like(w.Kdunit.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nmunit.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nilai.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nilaiup.ToString(), "%" + param.GlobalFilter + "%")).AsQueryable();
            }
            if(!String.IsNullOrEmpty(param.SortField))
            {
                if(param.SortField == "kdunit")
                {
                    if(param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdunit).AsQueryable();
                    } else
                    {
                        Query = Query.OrderByDescending(o => o.Kdunit).AsQueryable();
                    }
                }
                else if (param.SortField == "nmunit")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nmunit).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nmunit).AsQueryable();
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
                else if (param.SortField == "nilaiup")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nilaiup).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nilaiup).AsQueryable();
                    }
                }
            } else
            {
                Query = Query.OrderBy(o => o.Kdunit).AsQueryable();
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Paguskpd param)
        {
            Paguskpd data = await _BludContext.Paguskpd.Where(w => w.Idpaguskpd == param.Idpaguskpd).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nilai = param.Nilai;
                data.Nilaiup = param.Nilaiup;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Paguskpd.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<PaguskpdView> ViewData(long Idpaguskpd)
        {
            PaguskpdView Result = await (
                from data in _BludContext.Paguskpd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                where data.Idpaguskpd == Idpaguskpd
                select new PaguskpdView
                {
                    Idpaguskpd = data.Idpaguskpd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Kdtahap = data.Kdtahap,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null,
                    Kdunit = unit != null ? unit.Kdunit : "",
                    Nmunit = unit != null ? unit.Nmunit : "",
                    Nilai = data.Nilai,
                    Nilaiup = data.Nilaiup
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<PaguskpdView>> ViewDatas(PaguskpdGet param)
        {
            List<PaguskpdView> Result = await (
                from data in _BludContext.Paguskpd
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                where data.Kdtahap.Trim() == param.Kdtahap.Trim()
                select new PaguskpdView
                {
                    Idpaguskpd = data.Idpaguskpd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Kdtahap = data.Kdtahap,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null,
                    Kdunit = unit != null ? unit.Kdunit : "",
                    Nmunit = unit != null ? unit.Nmunit : "",
                    Nilai = data.Nilai,
                    Nilaiup = data.Nilaiup
                }
                ).ToListAsync();
            return Result;
        }
    }
}
