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
    public class LpjRepo : Repo<Lpj>, ILpjRepo
    {
        public LpjRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<PrimengTableResult<Lpj>> Paging(PrimengTableParam<LpjGetsParam> param)
        {
            PrimengTableResult<Lpj> Result = new PrimengTableResult<Lpj>();
            IQueryable<Lpj> query = (
                from Lpj in _BludContext.Lpj
                join unit in _BludContext.Daftunit on Lpj.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on Lpj.Idbend equals bend.Idbend
                select new Lpj
                {
                    Idlpj = Lpj.Idlpj,
                    Idbend = Lpj.Idbend,
                    Idttd = Lpj.Idttd,
                    Idunit = Lpj.Idunit,
                    Idxkode = Lpj.Idxkode,
                    Nosah = Lpj.Nosah,
                    Kdstatus = Lpj.Kdstatus,
                    Nolpj = Lpj.Nolpj,
                    Tgllpj = Lpj.Tgllpj,
                    Tglsah = Lpj.Tglsah,
                    Tglbuku = Lpj.Tglbuku,
                    Tglvalid = Lpj.Tglvalid,
                    Keterangan = Lpj.Keterangan,
                    Datecreate = Lpj.Datecreate,
                    Dateupdate = Lpj.Dateupdate,
                    Validby = Lpj.Validby,
                    Verifikasi = Lpj.Verifikasi
                }
                ).AsQueryable();
            if (param.Parameters != null)
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit);
                if (!String.IsNullOrEmpty(param.Parameters.Idbend.ToString()) || param.Parameters.Idbend.ToString() != "0")
                {
                    query = query.Where(w => w.Idbend == param.Parameters.Idbend).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nolpj.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nosah.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Keterangan.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nolpj")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nolpj).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nolpj).AsQueryable();
                    }
                }
                else if (param.SortField == "tgllpj")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tgllpj).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tgllpj).AsQueryable();
                    }
                }
                else if (param.SortField == "nosah")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nosah).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nosah).AsQueryable();
                    }
                }
                else if (param.SortField == "tglbuku")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglbuku).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglbuku).AsQueryable();
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

        public async Task<bool> Update(Lpj param)
        {
            Lpj data = await _BludContext.Lpj.Where(w => w.Idlpj == param.Idlpj).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nolpj = param.Nolpj;
            data.Tgllpj = param.Tgllpj;
            data.Tglbuku = param.Tglbuku;
            data.Keterangan = param.Keterangan;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Lpj.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Lpj> ViewData(long Idlpj)
        {
            Lpj data = await (
                from Lpj in _BludContext.Lpj
                join unit in _BludContext.Daftunit on Lpj.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on Lpj.Idbend equals bend.Idbend
                where Lpj.Idlpj == Idlpj
                select new Lpj
                {
                    Idlpj = Lpj.Idlpj,
                    Idbend = Lpj.Idbend,
                    Idttd = Lpj.Idttd,
                    Idunit = Lpj.Idunit,
                    Idxkode = Lpj.Idxkode,
                    Nosah = Lpj.Nosah,
                    Kdstatus = Lpj.Kdstatus,
                    Nolpj = Lpj.Nolpj,
                    Tgllpj = Lpj.Tgllpj,
                    Tglsah = Lpj.Tglsah,
                    Tglbuku = Lpj.Tglbuku,
                    Tglvalid = Lpj.Tglvalid,
                    Keterangan = Lpj.Keterangan,
                    Datecreate = Lpj.Datecreate,
                    Dateupdate = Lpj.Dateupdate,
                    Validby = Lpj.Validby,
                    Verifikasi = Lpj.Verifikasi
                }
                ).FirstOrDefaultAsync();
            return data;
        }
        public async Task<bool> Pengesahan(Lpj param)
        {
            Lpj data = await _BludContext.Lpj.Where(w => w.Idlpj == param.Idlpj).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglsah = param.Tglsah;
            data.Validby = param.Validby;
            data.Verifikasi = param.Verifikasi;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Lpj.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
