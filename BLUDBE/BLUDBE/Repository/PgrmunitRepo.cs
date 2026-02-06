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
    public class PgrmunitRepo : Repo<Pgrmunit>, IPgrmunitRepo
    {
        public PgrmunitRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<PgrmunitView>> Paging(PrimengTableParam<PgrmunitGet> param)
        {
            PrimengTableResult<PgrmunitView> Result = new PrimengTableResult<PgrmunitView>();
            IQueryable<PgrmunitView> query = (
                from data in _BludContext.Pgrmunit
                join mprogram in _BludContext.Mpgrm on data.Idprgrm equals mprogram.Idprgrm
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                select new PgrmunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprgrm = data.Idprgrm,
                    IdprgrmNavigation = mprogram ?? null,
                    Idsas = data.Idsas,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Indikator = data.Indikator,
                    Kdtahap = data.Kdtahap,
                    KdtahapNavigation = tahap ?? null,
                    Ket = data.Ket,
                    Noprio = data.Noprio,
                    Sasaran = data.Sasaran,
                    Target = data.Target,
                    Tglvalid = data.Tglvalid,
                    IdunitNavigation = unit ?? null,
                    Pgrmunitx = !String.IsNullOrEmpty(data.Idpgrmunitx.ToString()) ? _BludContext.Pgrmunit.Where(w => w.Idpgrmunit == data.Idpgrmunitx).FirstOrDefault() : null,
                    Idpgrmunitx = data.Idpgrmunitx
                }
                ).AsQueryable();
            if(param.Parameters != null)
            {
                if (param.Parameters.Idunit.ToString() != "0")
                {
                    query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
                }
                if (param.Parameters.Kdtahap.Trim() != "x")
                {
                    query = query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
                }
                if (param.Parameters.Idprgrm.ToString() != "0")
                {
                    query = query.Where(w => w.Idprgrm == param.Parameters.Idprgrm).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "indikator")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Indikator).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Indikator).AsQueryable();
                    }
                } else if(param.SortField == "target")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Target).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Target).AsQueryable();
                    }
                }
            }
            if (param.GlobalFilter != null)
            {
                query = query.Where(w => EF.Functions.Like(w.Indikator.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Target.Trim(), "%" + param.GlobalFilter + "%")).AsQueryable();
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            Result.Isvalid = await _BludContext.Rkasah.AnyAsync(w => w.Idunit == param.Parameters.Idunit && w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()) ? true : false;
            return Result;
        }

        public async Task<bool> Update(Pgrmunit param)
        {
            Pgrmunit data = await _BludContext.Pgrmunit.Where(w => w.Idpgrmunit == param.Idpgrmunit).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Target = param.Target;
            data.Indikator = param.Indikator;
            data.Tglvalid = param.Tglvalid;
            data.Dateupdate = param.Tglvalid;
            _BludContext.Pgrmunit.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<PgrmunitView> ViewData(long Idpgrmunit)
        {
            PgrmunitView Result = await (
                from data in _BludContext.Pgrmunit
                join mprogram in _BludContext.Mpgrm on data.Idprgrm equals mprogram.Idprgrm
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                where data.Idpgrmunit == Idpgrmunit
                select new PgrmunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprgrm = data.Idprgrm,
                    IdprgrmNavigation = mprogram ?? null,
                    Idsas = data.Idsas,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Indikator = data.Indikator,
                    Kdtahap = data.Kdtahap,
                    KdtahapNavigation = tahap ?? null,
                    Ket = data.Ket,
                    Noprio = data.Noprio,
                    Sasaran = data.Sasaran,
                    Target = data.Target,
                    Tglvalid = data.Tglvalid,
                    IdunitNavigation = unit ?? null,
                    Pgrmunitx = !String.IsNullOrEmpty(data.Idpgrmunitx.ToString()) ? _BludContext.Pgrmunit.Where(w => w.Idpgrmunit == data.Idpgrmunitx).FirstOrDefault() : null,
                    Idpgrmunitx = data.Idpgrmunitx
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<PgrmunitView>> ViewDatas(PgrmunitGet param)
        {
            List<PgrmunitView> Result = new List<PgrmunitView>();
            IQueryable<PgrmunitView> query = (
                from data in _BludContext.Pgrmunit
                join mprogram in _BludContext.Mpgrm on data.Idprgrm equals mprogram.Idprgrm
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                select new PgrmunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprgrm = data.Idprgrm,
                    IdprgrmNavigation = mprogram ?? null,
                    Idsas = data.Idsas,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Indikator = data.Indikator,
                    Kdtahap = data.Kdtahap,
                    KdtahapNavigation = tahap ?? null,
                    Ket = data.Ket,
                    Noprio = data.Noprio,
                    Sasaran = data.Sasaran,
                    Target = data.Target,
                    Tglvalid = data.Tglvalid,
                    IdunitNavigation = unit ?? null,
                    Pgrmunitx = !String.IsNullOrEmpty(data.Idpgrmunitx.ToString()) ? _BludContext.Pgrmunit.Where(w => w.Idpgrmunit == data.Idpgrmunitx).FirstOrDefault() : null,
                    Idpgrmunitx = data.Idpgrmunitx
                }
                ).AsQueryable();
            if(param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if(param.Kdtahap.Trim() != "x")
            {
                query = query.Where(w => w.Kdtahap.Trim() == param.Kdtahap.Trim()).AsQueryable();
            }
            if(param.Idprgrm.ToString() != "0")
            {
                query = query.Where(w => w.Idprgrm == param.Idprgrm).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
