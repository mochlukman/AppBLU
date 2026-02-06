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
    public class KinkegRepo : Repo<Kinkeg>, IKinkegRepo
    {
        public KinkegRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<KinkegView>> Paging(PrimengTableParam<KinkegGet> param)
        {
            PrimengTableResult<KinkegView> Result = new PrimengTableResult<KinkegView>();
            IQueryable<KinkegView> Query = (
                from data in _BludContext.Kinkeg
                join kegunit in _BludContext.Kegunit on data.Idkegunit equals kegunit.Idkegunit
                into kegunitMacth from kegunitData in kegunitMacth.DefaultIfEmpty()
                join jkinkeg in _BludContext.Jkinkeg on data.Kdjkk equals jkinkeg.Kdjkk
                into jkinkegMacth from jkinkegData in jkinkegMacth.DefaultIfEmpty()
                select new KinkegView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idkinkeg = data.Idkinkeg,
                    Kdjkk = data.Kdjkk,
                    Idkegunit = data.Idkegunit,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Satuan = data.Satuan,
                    Target = data.Target,
                    Tolokur = data.Tolokur,
                    IdkegunitNavigation = kegunitData ?? null,
                    KdjkkNavigation = jkinkegData ?? null,
                    Kinkegx = !String.IsNullOrEmpty(data.Idkinkegx.ToString()) ? _BludContext.Kinkeg.Where(w => w.Idkinkeg == data.Idkinkegx).FirstOrDefault() : null,
                    Idkinkegx = data.Idkinkegx
                }
                ).AsQueryable();
            if(param.Parameters.Idkegunit.ToString() != "0")
            {
                Query = Query.Where(w => w.Idkegunit == param.Parameters.Idkegunit).AsQueryable();
            }
            if(param.Parameters.Kdjkk.Trim() != "x")
            {
                Query = Query.Where(w => w.Kdjkk.Trim() == param.Parameters.Kdjkk.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                    EF.Functions.Like(w.Keterangan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Satuan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Target.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nomor.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tolokur.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nomor")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Nomor).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Nomor).AsQueryable();
                    }
                }
                else if (param.SortField == "tolokur")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Tolokur).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Tolokur).AsQueryable();
                    }
                }
                else if (param.SortField == "target")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Target).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Target).AsQueryable();
                    }
                }
                else if (param.SortField == "keterangan")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Keterangan).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Keterangan).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            Result.Isvalid = await _BludContext.Rkasah.AnyAsync(w => w.Idunit == param.Parameters.Idunit && w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()) ? true : false;
            return Result;
        }

        public async Task<bool> Update(Kinkeg param)
        {
            Kinkeg data = await _BludContext.Kinkeg.Where(w => w.Idkinkeg == param.Idkinkeg).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Target = param.Target;
            data.Satuan = param.Satuan;
            data.Keterangan = param.Keterangan;
            data.Tolokur = param.Tolokur;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Kinkeg.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<KinkegView> ViewData(long Idkinkeg)
        {
            KinkegView Result = await (
                from data in _BludContext.Kinkeg
                join kegunit in _BludContext.Kegunit on data.Idkegunit equals kegunit.Idkegunit
                into kegunitMacth from kegunitData in kegunitMacth.DefaultIfEmpty()
                join jkinkeg in _BludContext.Jkinkeg on data.Kdjkk equals jkinkeg.Kdjkk
                into jkinkegMacth from jkinkegData in jkinkegMacth.DefaultIfEmpty()
                where data.Idkinkeg == Idkinkeg
                select new KinkegView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idkinkeg = data.Idkinkeg,
                    Kdjkk = data.Kdjkk,
                    Idkegunit = data.Idkegunit,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Satuan = data.Satuan,
                    Target = data.Target,
                    Tolokur = data.Tolokur,
                    IdkegunitNavigation = kegunitData ?? null,
                    KdjkkNavigation = jkinkegData ?? null,
                    Kinkegx = !String.IsNullOrEmpty(data.Idkinkegx.ToString()) ? _BludContext.Kinkeg.Where(w => w.Idkinkeg == data.Idkinkegx).FirstOrDefault() : null,
                    Idkinkegx = data.Idkinkegx
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<KinkegView>> ViewDatas(long Idkegunit, string Kdjkk)
        {
            List<KinkegView> Result = await (
               from data in _BludContext.Kinkeg
               join kegunit in _BludContext.Kegunit on data.Idkegunit equals kegunit.Idkegunit
               into kegunitMacth from kegunitData in kegunitMacth.DefaultIfEmpty()
               join jkinkeg in _BludContext.Jkinkeg on data.Kdjkk equals jkinkeg.Kdjkk
               into jkinkegMacth from jkinkegData in jkinkegMacth.DefaultIfEmpty()
               where data.Idkegunit == Idkegunit && data.Kdjkk.Trim() == Kdjkk.Trim()
               select new KinkegView
               {
                   Datecreate = data.Datecreate,
                   Dateupdate = data.Dateupdate,
                   Idkinkeg = data.Idkinkeg,
                   Kdjkk = data.Kdjkk,
                   Idkegunit = data.Idkegunit,
                   Keterangan = data.Keterangan,
                   Nomor = data.Nomor,
                   Satuan = data.Satuan,
                   Target = data.Target,
                   Tolokur = data.Tolokur,
                   IdkegunitNavigation = kegunitData ?? null,
                   KdjkkNavigation = jkinkegData ?? null,
                   Kinkegx = !String.IsNullOrEmpty(data.Idkinkegx.ToString()) ? _BludContext.Kinkeg.Where(w => w.Idkinkeg == data.Idkinkegx).FirstOrDefault() : null,
                   Idkinkegx = data.Idkinkegx
               }
               ).ToListAsync();
            return Result;
        }
    }
}
