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
    public class DpaRepo : Repo<Dpa>, IDpaRepo
    {
        public DpaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> GetIds(long Idunit, string kdtahap)
        {
            List<long> datas = new List<long> { };
            if (String.IsNullOrEmpty(kdtahap))
            {
                datas.AddRange(await _BludContext.Dpa.Where(w => w.Idunit == Idunit).Select(s => s.Iddpa).ToListAsync());
            } else
            {
                datas.AddRange(await _BludContext.Dpa.Where(w => w.Idunit == Idunit && w.Kdtahap.Trim() == kdtahap.Trim()).Select(s => s.Iddpa).ToListAsync());
            }
            return datas;
        }

        public async Task<List<long>> GetIdunits()
        {
            List<long> datas = await _BludContext.Dpa.Select(s => s.Idunit).ToListAsync();
            return datas;
        }

        public async Task<PrimengTableResult<Dpa>> Paging(PrimengTableParam<DpaGet> param)
        {
            PrimengTableResult<Dpa> Result = new PrimengTableResult<Dpa>();
            IQueryable<Dpa> query = (
                from data in _BludContext.Dpa
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                select new Dpa
                {
                    Belanja = data.Belanja,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Iddpa = data.Iddpa,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Kdtahap = data.Kdtahap,
                    Jdpa = data.Jdpa,
                    Keterangan = data.Keterangan,
                    Nodpa = data.Nodpa,
                    Nosah = data.Nosah,
                    Pendapatan = data.Pendapatan,
                    Pembiayaankr = data.Pembiayaankr,
                    Pembiayaantr = data.Pembiayaantr,
                    Tglsah = data.Tglsah,
                    Sah = data.Sah,
                    Sahby = data.Sahby,
                    Tgldpa = data.Tgldpa,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null
                }
                ).AsQueryable();
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nodpa.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Belanja.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Pendapatan.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Pembiayaantr.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Pembiayaankr.ToString(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if(param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Kdtahap != "x")
            {
                query = query.Where(w => w.Kdtahap.Trim() == param.Parameters.Kdtahap.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nodpa")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nodpa).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nodpa).AsQueryable();
                    }
                }
                else if (param.SortField == "belanja")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Belanja).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Belanja).AsQueryable();
                    }
                }
                else if (param.SortField == "pendapatan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Pendapatan).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Pendapatan).AsQueryable();
                    }
                }
                else if (param.SortField == "pembiayaantr")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Pembiayaantr).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Pembiayaantr).AsQueryable();
                    }
                }
                else if (param.SortField == "pembiayaankr")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Pembiayaankr).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Pembiayaankr).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Pengesahan(Dpa param)
        {
            Dpa data = await _BludContext.Dpa.Where(w => w.Iddpa == param.Iddpa).FirstOrDefaultAsync();
            data.Tglsah = param.Tglsah;
            data.Sahby = param.Sahby;
            data.Sah = param.Sah;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpa.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> Penolakan(Dpa param)
        {
            Dpa data = await _BludContext.Dpa.Where(w => w.Iddpa == param.Iddpa).FirstOrDefaultAsync();
            data.Tglvalid = param.Tglvalid;
            data.Validby = param.Validby;
            data.Valid = param.Valid;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpa.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> Update(Dpa param)
        {
            Dpa data = await _BludContext.Dpa.Where(w => w.Iddpa == param.Iddpa).FirstOrDefaultAsync();
            data.Dateupdate = param.Dateupdate;
            data.Tgldpa = param.Tgldpa;
            data.Nodpa = param.Nodpa;
            data.Keterangan = param.Keterangan;
            _BludContext.Dpa.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> UpdateNilai(Dpa param)
        {
            Dpa data = await _BludContext.Dpa.Where(w => w.Iddpa == param.Iddpa).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Belanja = param.Belanja;
            data.Pendapatan = param.Pendapatan;
            data.Pembiayaankr = param.Pembiayaankr;
            data.Pembiayaantr = param.Pembiayaantr;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Dpa.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Dpa> ViewData(long Iddpa)
        {
            Dpa Result = await(
                from data in _BludContext.Dpa
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                where data.Iddpa == Iddpa
                select new Dpa
                {
                    Belanja = data.Belanja,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Iddpa = data.Iddpa,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Kdtahap = data.Kdtahap,
                    Jdpa = data.Jdpa,
                    Keterangan = data.Keterangan,
                    Nodpa = data.Nodpa,
                    Nosah = data.Nosah,
                    Pendapatan = data.Pendapatan,
                    Pembiayaankr = data.Pembiayaankr,
                    Pembiayaantr = data.Pembiayaantr,
                    Tglsah = data.Tglsah,
                    Sah = data.Sah,
                    Sahby = data.Sahby,
                    Tgldpa = data.Tgldpa,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Dpa>> ViewDatas(DpaGet param)
        {
            List<Dpa> Result = new List<Dpa>();
            IQueryable<Dpa> query = (
                from data in _BludContext.Dpa
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join tahap in _BludContext.Tahap on data.Kdtahap.Trim() equals tahap.Kdtahap.Trim()
                select new Dpa
                {
                    Belanja = data.Belanja,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Iddpa = data.Iddpa,
                    Idunit = data.Idunit,
                    Idxkode = data.Idxkode,
                    Kdtahap = data.Kdtahap,
                    Jdpa = data.Jdpa,
                    Keterangan = data.Keterangan,
                    Nodpa = data.Nodpa,
                    Nosah = data.Nosah,
                    Pendapatan = data.Pendapatan,
                    Pembiayaankr = data.Pembiayaankr,
                    Pembiayaantr = data.Pembiayaantr,
                    Tglsah = data.Tglsah,
                    Sah = data.Sah,
                    Sahby = data.Sahby,
                    Tgldpa = data.Tgldpa,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    IdunitNavigation = unit ?? null,
                    KdtahapNavigation = tahap ?? null
                }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if (param.Kdtahap != "x")
            {
                query = query.Where(w => w.Kdtahap.Trim() == param.Kdtahap.Trim()).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
