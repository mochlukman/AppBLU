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
    public class SpjRepo : Repo<Spj>, ISpjRepo
    {
        public SpjRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Spj>> ForLpj(SpjGetsForLpjParam param)
        {
            List<long> Idspj = await _BludContext.Spjlpj.Where(w => w.Idlpj == param.Idlpj).Select(s => s.Idspj).ToListAsync();
            IQueryable<Spj> query = (
               from spj in _BludContext.Spj
               join unit in _BludContext.Daftunit on spj.Idunit equals unit.Idunit
               join bend in _BludContext.Bend on spj.Idbend equals bend.Idbend
               select new Spj
               {
                   Idspj = spj.Idspj,
                   Idbend = spj.Idbend,
                   Idttd = spj.Idttd,
                   Idunit = spj.Idunit,
                   Idxkode = spj.Idxkode,
                   Nosah = spj.Nosah,
                   Kdstatus = spj.Kdstatus,
                   Nospj = spj.Nospj,
                   Tglspj = spj.Tglspj,
                   Tglsah = spj.Tglsah,
                   Tglbuku = spj.Tglbuku,
                   Tglvalid = spj.Tglvalid,
                   Keterangan = spj.Keterangan,
                   Datecreate = spj.Datecreate,
                   Dateupdate = spj.Dateupdate,
                   IdbendNavigation = bend ?? null,
                   IdunitNavigation = unit ?? null,
                   Validby = spj.Validby,
                   Verifikasi = spj.Verifikasi,
                   Sahby = spj.Sahby
               }
               ).AsQueryable();
            query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            if (!String.IsNullOrEmpty(param.Idbend.ToString()) || param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.Kdstatus))
            {
                List<string> split_status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => split_status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if(Idspj.Count() > 0)
            {
                query = query.Where(w => !Idspj.Contains(w.Idspj)).AsQueryable();
            }
            List<Spj> datas = await query.ToListAsync();
            return datas;
        }

        public async Task<List<SpjLookupForSpp>> LookupForSpp(long Idunit, long Idspp, string Kdsatus)
        {
            List<SpjLookupForSpp> datas = new List<SpjLookupForSpp> { };
            /*List<long> IdspjUsed = await _BludContext.Spjspp.Where(w => w.Idspp == Idspp).Select(s => s.Idspj).ToListAsync();*/
            List<long> IdspjUnit = await _BludContext.Spj.Where(w => w.Idunit == Idunit).Select(s => s.Idspj).ToListAsync(); 
             List<long> IdspjUsed = await _BludContext.Spjspp.Where(w => IdspjUnit.Contains(w.Idspj)).Select(s => s.Idspj).ToListAsync();
            List<SpjLookupForSpp> gets = await _BludContext.Spj
                /*.Where(w => !IdspjUsed.Contains(w.Idspj) && w.Idunit == Idunit && w.Kdstatus.Trim() == Kdsatus.Trim() && w.Tglvalid != null)*/
                .Where(w => !IdspjUsed.Contains(w.Idspj) && w.Idunit == Idunit && w.Kdstatus.Trim() == Kdsatus.Trim()  && w.Tglvalid != null)
                .Select(s => new SpjLookupForSpp
                {
                    Idspj = s.Idspj,
                    Keterangan = s.Keterangan,
                    Nospj = s.Nospj,
                    Tglbuku = s.Tglbuku,
                    Tglspj = s.Tglspj
                }).ToListAsync();
            datas.AddRange(gets);
            return datas;
        }

        public async Task<PrimengTableResult<Spj>> Paging(PrimengTableParam<SpjGetsParam> param)
        {
            PrimengTableResult<Spj> Result = new PrimengTableResult<Spj>();
            IQueryable<Spj> query = (
                from spj in _BludContext.Spj
                join unit in _BludContext.Daftunit on spj.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on spj.Idbend equals bend.Idbend
                select new Spj
                {
                    Idspj = spj.Idspj,
                    Idbend = spj.Idbend,
                    Idttd = spj.Idttd,
                    Idunit = spj.Idunit,
                    Idxkode = spj.Idxkode,
                    Nosah = spj.Nosah,
                    Kdstatus = spj.Kdstatus,
                    Nospj = spj.Nospj,
                    Tglspj = spj.Tglspj,
                    Tglsah = spj.Tglsah,
                    Tglbuku = spj.Tglbuku,
                    Tglvalid = spj.Tglvalid,
                    Keterangan = spj.Keterangan,
                    Datecreate = spj.Datecreate,
                    Dateupdate = spj.Dateupdate,
                    IdbendNavigation = bend ?? null,
                    IdunitNavigation = unit ?? null,
                    Validby = spj.Validby,
                    Verifikasi = spj.Verifikasi,
                    Sahby = spj.Sahby,
                    Valid = spj.Valid
                }
                ).AsQueryable();
            if(param.Parameters != null)
            {
                if(param.Parameters.Idunit.ToString() != "0")
                {
                    query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
                }
                if (param.Parameters.Kdstatus != "x")
                {
                    List<string> split_status = param.Parameters.Kdstatus.Split(",").ToList();
                    query = query.Where(w => split_status.Contains(w.Kdstatus.Trim())).AsQueryable();
                }
                if(param.Parameters.Idbend.ToString() != "0")
                {
                    query = query.Where(w => w.Idbend == param.Parameters.Idbend).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nospj.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nosah.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Keterangan.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if(param.SortField == "nospj")
                {
                    if(param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nospj).AsQueryable();
                    } else
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
                else if(param.SortField == "nosah")
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

        public async Task<bool> Update(Spj param)
        {
            Spj data = await _BludContext.Spj.Where(w => w.Idspj == param.Idspj).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nospj = param.Nospj;
            data.Tglspj = param.Tglspj;
            data.Tglbuku = param.Tglbuku;
            data.Keterangan = param.Keterangan;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spj.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<bool> Pengesahan(Spj param)
        {
            Spj data = await _BludContext.Spj.Where(w => w.Idspj == param.Idspj).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglsah = param.Tglsah;
            data.Sahby = param.Sahby;
            data.Verifikasi = param.Verifikasi;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spj.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Spj> ViewData(long Idspj)
        {
            Spj data = await (
                from spj in _BludContext.Spj
                join unit in _BludContext.Daftunit on spj.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on spj.Idbend equals bend.Idbend
                where spj.Idspj == Idspj
                select new Spj
                {
                    Idspj = spj.Idspj,
                    Idbend = spj.Idbend,
                    Idttd = spj.Idttd,
                    Idunit = spj.Idunit,
                    Idxkode = spj.Idxkode,
                    Nosah = spj.Nosah,
                    Kdstatus = spj.Kdstatus,
                    Nospj = spj.Nospj,
                    Tglspj = spj.Tglspj,
                    Tglsah = spj.Tglsah,
                    Tglbuku = spj.Tglbuku,
                    Tglvalid = spj.Tglvalid,
                    Keterangan = spj.Keterangan,
                    Datecreate = spj.Datecreate,
                    Dateupdate = spj.Dateupdate,
                    IdbendNavigation = bend ?? null,
                    IdunitNavigation = unit ?? null,
                    Validby = spj.Validby,
                    Verifikasi = spj.Verifikasi,
                    Sahby = spj.Sahby,
                    Valid = spj.Valid
                }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Spj>> ViewDatas(SpjGetsParam param)
        {
            IQueryable<Spj> query = (
                from spj in _BludContext.Spj
                join unit in _BludContext.Daftunit on spj.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on spj.Idbend equals bend.Idbend
                select new Spj
                {
                    Idspj = spj.Idspj,
                    Idbend = spj.Idbend,
                    Idttd = spj.Idttd,
                    Idunit = spj.Idunit,
                    Idxkode = spj.Idxkode,
                    Nosah = spj.Nosah,
                    Kdstatus = spj.Kdstatus,
                    Nospj = spj.Nospj,
                    Tglspj = spj.Tglspj,
                    Tglsah = spj.Tglsah,
                    Tglbuku = spj.Tglbuku,
                    Tglvalid = spj.Tglvalid,
                    Keterangan = spj.Keterangan,
                    Datecreate = spj.Datecreate,
                    Dateupdate = spj.Dateupdate,
                    IdbendNavigation = bend ?? null,
                    IdunitNavigation = unit ?? null,
                    Validby = spj.Validby,
                    Verifikasi = spj.Verifikasi,
                    Sahby = spj.Sahby,
                    Valid = spj.Valid
                }
                ).AsQueryable();
            query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            if (!String.IsNullOrEmpty(param.Kdstatus))
            {
                List<string> split_status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => split_status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            List<Spj> datas = await query.ToListAsync();
            return datas;
        }

        public async Task<bool> Validasi(Spj param)
        {
            Spj data = await _BludContext.Spj.Where(w => w.Idspj == param.Idspj).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglvalid = param.Tglvalid;
            data.Validby = param.Validby;
            data.Valid = param.Valid;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spj.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
