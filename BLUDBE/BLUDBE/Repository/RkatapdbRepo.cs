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
    public class RkatapdbRepo : Repo<Rkatapdb>, IRkatapdbRepo
    {
        public RkatapdbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<string> GenerateNomor(long Idrka)
        {
            string newno = "";
            string lastno = await _BludContext.Rkatapdb.Where(w => w.Idrkab == Idrka).OrderBy(o => o.Nomor.Trim()).Select(s => s.Nomor).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "01";
            }
            else
            {
                var toNumber = Int32.Parse(lastno);
                var PlusNumber = toNumber + 1;
                if (PlusNumber.ToString().Length == 1) newno = "0" + PlusNumber.ToString();
                if (PlusNumber.ToString().Length == 2) newno = PlusNumber.ToString();
            }
            return newno;
        }
        public async Task<PrimengTableResult<RkatapdbView>> Paging(PrimengTableParam<RkatapdGet> param)
        {
            PrimengTableResult<RkatapdbView> Result = new PrimengTableResult<RkatapdbView>();
            IQueryable<RkatapdbView> query = (
                from data in _BludContext.Rkatapdb
                join rka in _BludContext.Rkab on data.Idrkab equals rka.Idrkab
                join pegawai in _BludContext.Pegawai on data.Idpeg equals pegawai.Idpeg
                select new RkatapdbView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkab = data.Idrkab,
                    Idtapdb = data.Idtapdb,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Tanggal = data.Tanggal,
                    Updateby = data.Updateby,
                    Verifikasi = data.Verifikasi,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegawai ?? null,
                    Nippeg = pegawai != null ? pegawai.Nip : "",
                    Namapeg = pegawai != null ? pegawai.Nama : "",
                    IdrkabNavigation = rka ?? null
                }
                ).AsQueryable();
            if (param.Parameters.Idrka.ToString() != "0")
            {
                query = query.Where(w => w.Idrkab == param.Parameters.Idrka).AsQueryable();
            }
            if (param.Parameters.Idpeg.ToString() != "0")
            {
                query = query.Where(w => w.Idpeg == param.Parameters.Idpeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nomor.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Keterangan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nippeg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Namapeg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Verifikasi.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nomor")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nomor).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nomor).AsQueryable();
                    }
                }
                else if (param.SortField == "nippeg")
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
                else if (param.SortField == "verifikasi")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Verifikasi).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Verifikasi).AsQueryable();
                    }
                }
                else if (param.SortField == "tanggal")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tanggal).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tanggal).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Rkatapdb param)
        {
            Rkatapdb data = await _BludContext.Rkatapdb.Where(w => w.Idtapdb == param.Idtapdb).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            data.Nomor = param.Nomor;
            data.Verifikasi = param.Verifikasi;
            data.Keterangan = param.Keterangan;
            data.Tanggal = param.Tanggal;
            _BludContext.Rkatapdb.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkatapdbView> ViewData(long Idtapd)
        {
            RkatapdbView Result = await (
                from data in _BludContext.Rkatapdb
                join rka in _BludContext.Rkab on data.Idrkab equals rka.Idrkab
                join pegawai in _BludContext.Pegawai on data.Idpeg equals pegawai.Idpeg
                where data.Idtapdb == Idtapd
                select new RkatapdbView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkab = data.Idrkab,
                    Idtapdb = data.Idtapdb,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Tanggal = data.Tanggal,
                    Updateby = data.Updateby,
                    Verifikasi = data.Verifikasi,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegawai ?? null,
                    Nippeg = pegawai != null ? pegawai.Nip : "",
                    Namapeg = pegawai != null ? pegawai.Nama : "",
                    IdrkabNavigation = rka ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }
    }
}
