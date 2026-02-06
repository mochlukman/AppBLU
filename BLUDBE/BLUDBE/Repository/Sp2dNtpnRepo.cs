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
    public class Sp2dNtpnRepo : Repo<Sp2dntpn>, ISp2dNtpnRepo
    {
        public Sp2dNtpnRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Sp2dntpn>> Paging(PrimengTableParam<Sp2dGet> param)
        {
            PrimengTableResult<Sp2dntpn> Result = new PrimengTableResult<Sp2dntpn>();
            IQueryable<Sp2dntpn> query = (
                from data in _BludContext.Sp2dntpn
                join sp2d in _BludContext.Sp2d on data.Idsp2d equals sp2d.Idsp2d into sp2dMatch
                from sp2dData in sp2dMatch.DefaultIfEmpty()
                select new Sp2dntpn
                {
                    Idbilling = data.Idbilling,
                    Idntpn = data.Idntpn,
                    Idsp2d = data.Idsp2d,
                    Idsp2dNavigation = sp2dData ?? null,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Nosp2d = data.Nosp2d,
                    Ntpn = data.Ntpn,
                    Tglntpn = data.Tglntpn,
                    Tglsp2d = data.Tglsp2d
                }
                ).AsQueryable();
            if (param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nosp2d.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglsp2d.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Ntpn.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglntpn.ToString(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nosp2d")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nosp2d).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nosp2d).AsQueryable();
                    }
                }
                else if (param.SortField == "tglsp2d")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglsp2d).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglsp2d).AsQueryable();
                    }
                }
                else if (param.SortField == "ntpn")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Ntpn).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Ntpn).AsQueryable();
                    }
                }
                else if (param.SortField == "tglntpn")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglntpn).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglntpn).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Sp2dntpn param)
        {
            Sp2dntpn data = await _BludContext.Sp2dntpn.Where(w => w.Idntpn == param.Idntpn).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Ntpn = param.Ntpn;
            data.Tglntpn = param.Tglntpn;
            _BludContext.Sp2dntpn.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Sp2dntpn> ViewData(long Idntpn)
        {
            Sp2dntpn Result = await (
                from data in _BludContext.Sp2dntpn
                join sp2d in _BludContext.Sp2d on data.Idsp2d equals sp2d.Idsp2d into sp2dMatch
                from sp2dData in sp2dMatch.DefaultIfEmpty()
                where data.Idntpn == Idntpn
                select new Sp2dntpn
                {
                    Idbilling = data.Idbilling,
                    Idntpn = data.Idntpn,
                    Idsp2d = data.Idsp2d,
                    Idsp2dNavigation = sp2dData ?? null,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Nosp2d = data.Nosp2d,
                    Ntpn = data.Ntpn,
                    Tglntpn = data.Tglntpn,
                    Tglsp2d = data.Tglsp2d
                }
                ).FirstOrDefaultAsync();
            return Result;
        }
    }
}
