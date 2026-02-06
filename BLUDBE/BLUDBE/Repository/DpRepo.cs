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
    public class DpRepo : Repo<Dp>, IDpRepo
    {
        public DpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<string> GenerateNo()
        {
            string new_kode = "";
            List<string> data = await _BludContext.Dp.Select(s => s.Nodp).Distinct().ToListAsync();
            data.Sort((a, b) => b.CompareTo(a));
            if (data.Count() > 0)
            {
                long temp = Int64.Parse(data[0]) + 1;
                if (temp.ToString().Length == 1)
                {
                    new_kode = "00" + temp.ToString();

                }
                else if (temp.ToString().Length == 2)
                {
                    new_kode = "0" + temp.ToString();
                }
                else
                {
                    new_kode = temp.ToString();
                }
            }
            else
            {
                new_kode = "001";
            }
            return new_kode;
        }

        public async Task<PrimengTableResult<Dp>> Paging(PrimengTableParam<DpGet> param)
        {
            PrimengTableResult<Dp> Result = new PrimengTableResult<Dp>();
            IQueryable<Dp> query = (
                from dp in _BludContext.Dp
                select new Dp
                {
                    Datecreate = dp.Datecreate,
                    Dateupdate = dp.Dateupdate,
                    Iddp = dp.Iddp,
                    Idttd = dp.Idttd,
                    Idxkode = dp.Idxkode,
                    Nodp = dp.Nodp,
                    Tgldp = dp.Tgldp,
                    Tglvalid = dp.Tglvalid,
                    Uraian = dp.Uraian
                }
            ).AsQueryable();
            if (param.Parameters != null)
            {
                if(param.Parameters.Idttd.ToString() != "0")
                {
                    query = query.Where(w => w.Idttd == param.Parameters.Idttd).AsQueryable();
                }
                if(param.Parameters.Idxkode.ToString() != "0")
                {
                    query = query.Where(w => w.Idxkode == param.Parameters.Idxkode).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nodp.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nodp")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nodp).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nodp).AsQueryable();
                    }
                }
                else if (param.SortField == "tgldp")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tgldp).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tgldp).AsQueryable();
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
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Dp param)
        {
            Dp data = await _BludContext.Dp.Where(w => w.Iddp == param.Iddp).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Dateupdate = param.Dateupdate;
            data.Nodp = param.Nodp;
            data.Tgldp = param.Tgldp;
            data.Tglvalid = param.Tglvalid;
            data.Uraian = param.Uraian;
            _BludContext.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}
