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
    public class RkasahRepo : Repo<Rkasah>, IRkasahRepo
    {
        public RkasahRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<RkasahView>> Paging(PrimengTableParam<RkaGlobalGet> param)
        {
            PrimengTableResult<RkasahView> Result = new PrimengTableResult<RkasahView>();
            IQueryable<RkasahView> query = (
                from data in _BludContext.Rkasah
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join peg in _BludContext.Pegawai on data.Idpeg equals peg.Idpeg
                select new RkasahView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkasah = data.Idrkasah,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Tglsah = data.Tglsah,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian,
                    IdpegNavigation = peg ?? null,
                    IdunitNavigation = unit ?? null,
                    Nippeg = peg != null ? peg.Nip : "",
                    Namapeg = peg != null ? peg.Nama : ""
                }
                ).AsQueryable();
            if(param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Kdtahap.Trim() != "x")
            {
                query = query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
            }
            if(param.Parameters.Idpeg.ToString() != "0")
            {
                query = query.Where(w => w.Idpeg == param.Parameters.Idpeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nippeg, "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nippeg, "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglsah.ToString(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nippeg")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nippeg).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nippeg).AsQueryable();
                    }
                }
                else if (param.SortField == "uraian")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Uraian).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Uraian).AsQueryable();
                    }
                }
                else if (param.SortField == "tglsah")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglsah).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglsah).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Rkasah param)
        {
            Rkasah data = await _BludContext.Rkasah.Where(w => w.Idrkasah == param.Idrkasah).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            data.Uraian = param.Uraian;
            data.Tglsah = param.Tglsah;
            _BludContext.Rkasah.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkasahView> ViewData(long Idrkasah)
        {
            RkasahView Result = await (
                from data in _BludContext.Rkasah
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join peg in _BludContext.Pegawai on data.Idpeg equals peg.Idpeg
                where data.Idrkasah == Idrkasah
                select new RkasahView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkasah = data.Idrkasah,
                    Idunit = data.Idunit,
                    Kdtahap = data.Kdtahap,
                    Tglsah = data.Tglsah,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian,
                    IdpegNavigation = peg ?? null,
                    IdunitNavigation = unit ?? null,
                    Nippeg = peg != null ? peg.Nip : "",
                    Namapeg = peg != null ? peg.Nama : ""
                }
                ).FirstOrDefaultAsync();
            return Result;
        }
    }
}
