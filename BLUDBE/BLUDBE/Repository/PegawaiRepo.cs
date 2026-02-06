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
    public class PegawaiRepo : Repo<Pegawai>, IPegawaiRepo
    {
        public PegawaiRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> Idpegs(long Idunit)
        {
            List<long> datas = await _BludContext.Pegawai.Where(w => w.Idunit == Idunit).Select(s => s.Idpeg).ToListAsync();
            return datas;
        }

        public async Task<PrimengTableResult<Pegawai>> Paging(PrimengTableParam<PegawaiGet> param)
        {
            PrimengTableResult<Pegawai> Result = new PrimengTableResult<Pegawai>();
            IQueryable<Pegawai> query = (
                from data in _BludContext.Pegawai
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join gol in _BludContext.Golongan on data.Kdgol.Trim() equals gol.Kdgol.Trim()
                select new Pegawai
                {
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idunit = data.Idunit,
                    Idpeg = data.Idpeg,
                    Jabatan = data.Jabatan,
                    Kdgol = data.Kdgol,
                    Nama = data.Nama,
                    Nip = data.Nip,
                    Pddk = data.Pddk,
                    Npwp = data.Npwp,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdunitNavigation = unit ?? null,
                    KdgolNavigation = gol ?? null
                }
                ).AsQueryable();
            if(param.Parameters.Idpeg.ToString() != "0")
            {
                query = query.Where(w => w.Idpeg == param.Parameters.Idpeg).AsQueryable();
            }
            if(param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Kdgol.Trim() != "x")
            {
                query = query.Where(w => w.Kdgol.Trim() == param.Parameters.Kdgol.Trim()).AsQueryable();
            }
            if(param.Parameters.Nip.Trim() != "x")
            {
                query = query.Where(w => w.Nip.Trim() == param.Parameters.Nip.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nip.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nama.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Jabatan.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nip")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nip).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nip).AsQueryable();
                    }
                }
                else if (param.SortField == "nama")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nama).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nama).AsQueryable();
                    }
                }
                else if (param.SortField == "jabatan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Jabatan).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Jabatan).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Pegawai param)
        {
            Pegawai data = await _BludContext.Pegawai.Where(w => w.Idpeg == param.Idpeg).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Nip = param.Nip;
            data.Nama = param.Nama;
            data.Kdgol = param.Kdgol;
            data.Alamat = param.Alamat;
            data.Jabatan = param.Jabatan;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Pegawai.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Pegawai> ViewData(long Idpeg)
        {
            Pegawai Result = await (
                from data in _BludContext.Pegawai
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join gol in _BludContext.Golongan on data.Kdgol.Trim() equals gol.Kdgol.Trim()
                where data.Idpeg == Idpeg
                select new Pegawai
                {
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idunit = data.Idunit,
                    Idpeg = data.Idpeg,
                    Jabatan = data.Jabatan,
                    Kdgol = data.Kdgol,
                    Nama = data.Nama,
                    Nip = data.Nip,
                    Pddk = data.Pddk,
                    Npwp = data.Npwp,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdunitNavigation = unit ?? null,
                    KdgolNavigation = gol ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Pegawai>> ViewDatas(PegawaiGet param)
        {
            List<Pegawai> Result = new List<Pegawai>();
            IQueryable<Pegawai> query = (
                from data in _BludContext.Pegawai
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit into unitMatch from unit_data in unitMatch.DefaultIfEmpty()
                join gol in _BludContext.Golongan on data.Kdgol.Trim() equals gol.Kdgol.Trim() into golMatch from gol_data in golMatch.DefaultIfEmpty()
                select new Pegawai
                {
                    Alamat = data.Alamat,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idunit = data.Idunit,
                    Idpeg = data.Idpeg,
                    Jabatan = data.Jabatan,
                    Kdgol = data.Kdgol,
                    Nama = data.Nama,
                    Nip = data.Nip,
                    Pddk = data.Pddk,
                    Npwp = data.Npwp,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdunitNavigation = unit_data ?? null,
                    KdgolNavigation = gol_data ?? null
                }
                ).AsQueryable();
            if (param.Idpeg.ToString() != "0")
            {
                query = query.Where(w => w.Idpeg == param.Idpeg).AsQueryable();
            }
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if (param.Kdgol.Trim() != "x")
            {
                query = query.Where(w => w.Kdgol.Trim() == param.Kdgol.Trim()).AsQueryable();
            }
            if (param.Nip.Trim() != "x")
            {
                query = query.Where(w => w.Nip.Trim() == param.Nip.Trim()).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
