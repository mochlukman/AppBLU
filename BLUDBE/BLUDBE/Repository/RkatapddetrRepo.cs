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
    public class RkatapddetrRepo : Repo<Rkatapddetr>, IRkatapddetrRepo
    {
        public RkatapddetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<string> GenerateNomor(long Idrka)
        {
            string newno = "";
            string lastno = await _BludContext.Rkatapddetr.Where(w => w.Idrkadetr == Idrka).OrderBy(o => o.Nomor.Trim()).Select(s => s.Nomor).LastOrDefaultAsync();
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
        public async Task<PrimengTableResult<RkatapddetrView>> Paging(PrimengTableParam<RkatapddetGet> param)
        {
            PrimengTableResult<RkatapddetrView> Result = new PrimengTableResult<RkatapddetrView>();
            IQueryable<RkatapddetrView> query = (
                from data in _BludContext.Rkatapddetr
                join rkadet in _BludContext.Rkadetr on data.Idrkadetr equals rkadet.Idrkadetr
                join pegawai in _BludContext.Pegawai on data.Idpeg equals pegawai.Idpeg
                select new RkatapddetrView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkadetr = data.Idrkadetr,
                    Idtapddetr = data.Idtapddetr,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Tanggal = data.Tanggal,
                    Updateby = data.Updateby,
                    Verifikasi = data.Verifikasi,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegawai ?? null,
                    Nippeg = pegawai != null ? pegawai.Nip : "",
                    Namapeg = pegawai != null ? pegawai.Nama : "",
                    IdrkadetrNavigation = rkadet ?? null
                }
                ).AsQueryable();
            if (param.Parameters.Idrkadet.ToString() != "0")
            {
                query = query.Where(w => w.Idrkadetr == param.Parameters.Idrkadet).AsQueryable();
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

        public async Task<bool> Update(Rkatapddetr param)
        {
            Rkatapddetr data = await _BludContext.Rkatapddetr.Where(w => w.Idtapddetr == param.Idtapddetr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            data.Nomor = param.Nomor;
            data.Verifikasi = param.Verifikasi;
            data.Keterangan = param.Keterangan;
            data.Tanggal = param.Tanggal;
            _BludContext.Rkatapddetr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkatapddetrView> ViewData(long Idtapddet)
        {
            RkatapddetrView Result = await (
                from data in _BludContext.Rkatapddetr
                join rkadet in _BludContext.Rkadetr on data.Idrkadetr equals rkadet.Idrkadetr
                join pegawai in _BludContext.Pegawai on data.Idpeg equals pegawai.Idpeg
                where data.Idtapddetr == Idtapddet
                select new RkatapddetrView
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Idpeg = data.Idpeg,
                    Idrkadetr = data.Idrkadetr,
                    Idtapddetr = data.Idtapddetr,
                    Keterangan = data.Keterangan,
                    Nomor = data.Nomor,
                    Tanggal = data.Tanggal,
                    Updateby = data.Updateby,
                    Verifikasi = data.Verifikasi,
                    Updatetime = data.Updatetime,
                    IdpegNavigation = pegawai ?? null,
                    Nippeg = pegawai != null ? pegawai.Nip : "",
                    Namapeg = pegawai != null ? pegawai.Nama : "",
                    IdrkadetrNavigation = rkadet ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }
    }
}
