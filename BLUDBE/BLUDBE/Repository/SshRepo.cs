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
    public class SshRepo : Repo<Ssh>, ISshRepo
    {
        public SshRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Ssh>> Paging(PrimengTableParam<SshGet> param)
        {
            PrimengTableResult<Ssh> Result = new PrimengTableResult<Ssh>();
            IQueryable<Ssh> Query = (
                from data in _BludContext.Ssh
                join barang in _BludContext.Daftbarang on data.Idbrg equals barang.Idbrg into barangMatch
                from barangData in barangMatch.DefaultIfEmpty()
                join satuan in _BludContext.Jsatuan on data.Kdsatuan.Trim() equals satuan.Kdsatuan.Trim() into satuanMatch
                from satuanData in satuanMatch.DefaultIfEmpty()
                select new Ssh
                {
                    Idssh = data.Idssh,
                    Idbrg = data.Idbrg,
                    IdbrgNavigation = barangData ?? null,
                    Harga = data.Harga,
                    Kdsatuan = data.Kdsatuan,
                    KdsatuanNavigation = satuanData ?? null,
                    Kdssh = data.Kdssh,
                    Kelompok = data.Kelompok,
                    Kode = data.Kode,
                    Satuan = data.Satuan,
                    Uraian = data.Uraian,
                    Spek = data.Spek,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }
                ).AsQueryable();
            if(param.Parameters != null)
            {
                if (param.Parameters.Kelompok.Trim() != "x")
                {
                    Query = Query.Where(w => w.Kelompok.Trim() == param.Parameters.Kelompok.Trim()).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w =>
                    EF.Functions.Like(w.Kdssh.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Spek.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Satuan.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "kdssh")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdssh).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Kdssh).AsQueryable();
                    }
                }
                else if (param.SortField == "uraian")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Uraian).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Uraian).AsQueryable();
                    }
                }
                else if (param.SortField == "spek")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Spek).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Spek).AsQueryable();
                    }
                }
                else if (param.SortField == "satuan")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Satuan).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Satuan).AsQueryable();
                    }
                }
                else if (param.SortField == "harga")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Harga).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Harga).AsQueryable();
                    }
                }
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Ssh param)
        {
            Ssh data = await _BludContext.Ssh.Where(w => w.Idssh == param.Idssh).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Idbrg = param.Idbrg;
            data.Kdssh = param.Kdssh;
            data.Kode = param.Kode;
            data.Uraian = param.Uraian;
            data.Spek = param.Spek;
            data.Harga = param.Harga;
            data.Satuan = param.Satuan;
            data.Kdsatuan = param.Kdsatuan;
            data.Kelompok = param.Kelompok;
            data.Updateby = param.Updateby;
            data.Createddate = param.Createddate;
            _BludContext.Ssh.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Ssh> ViewData(long Idssh)
        {
            Ssh Result = await (
                from data in _BludContext.Ssh
                join barang in _BludContext.Daftbarang on data.Idbrg equals barang.Idbrg into barangMatch
                from barangData in barangMatch.DefaultIfEmpty()
                join satuan in _BludContext.Jsatuan on data.Kdsatuan.Trim() equals satuan.Kdsatuan.Trim() into satuanMatch
                from satuanData in satuanMatch.DefaultIfEmpty()
                where data.Idssh == Idssh
                select new Ssh
                {
                    Idssh = data.Idssh,
                    Idbrg = data.Idbrg,
                    IdbrgNavigation = barangData ?? null,
                    Harga = data.Harga,
                    Kdsatuan = data.Kdsatuan,
                    KdsatuanNavigation = satuanData ?? null,
                    Kdssh = data.Kdssh,
                    Kelompok = data.Kelompok,
                    Kode = data.Kode,
                    Satuan = data.Satuan,
                    Uraian = data.Uraian,
                    Spek = data.Spek,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Ssh>> ViewDatas(string Kelompok, long Idrek)
        {
            List<Ssh> Result = new List<Ssh>();
            if(Idrek.ToString() != "0")
            {
                List<long> idsshs = await _BludContext.Sshrek.Where(w => w.Idrek == Idrek).Select(s => s.Idssh).ToListAsync();
                if(idsshs.Count() > 0)
                {
                    Result = await (
                    from data in _BludContext.Ssh
                    join barang in _BludContext.Daftbarang on data.Idbrg equals barang.Idbrg into barangMatch
                    from barangData in barangMatch.DefaultIfEmpty()
                    join satuan in _BludContext.Jsatuan on data.Kdsatuan.Trim() equals satuan.Kdsatuan.Trim() into satuanMatch
                    from satuanData in satuanMatch.DefaultIfEmpty()
                    where data.Kelompok.Trim() == Kelompok.Trim() && idsshs.Contains(data.Idssh)
                    select new Ssh
                    {
                        Idssh = data.Idssh,
                        Idbrg = data.Idbrg,
                        IdbrgNavigation = barangData ?? null,
                        Harga = data.Harga,
                        Kdsatuan = data.Kdsatuan,
                        KdsatuanNavigation = satuanData ?? null,
                        Kdssh = data.Kdssh,
                        Kelompok = data.Kelompok,
                        Kode = data.Kode,
                        Satuan = data.Satuan,
                        Uraian = data.Uraian,
                        Spek = data.Spek,
                        Createdby = data.Createdby,
                        Createddate = data.Createddate,
                        Updateby = data.Updateby,
                        Updatedate = data.Updatedate
                    }
                    ).ToListAsync();
                }
            } else
            {
                Result = await (
                    from data in _BludContext.Ssh
                    join barang in _BludContext.Daftbarang on data.Idbrg equals barang.Idbrg into barangMatch
                    from barangData in barangMatch.DefaultIfEmpty()
                    join satuan in _BludContext.Jsatuan on data.Kdsatuan.Trim() equals satuan.Kdsatuan.Trim() into satuanMatch
                    from satuanData in satuanMatch.DefaultIfEmpty()
                    where data.Kelompok.Trim() == Kelompok.Trim()
                    select new Ssh
                    {
                        Idssh = data.Idssh,
                        Idbrg = data.Idbrg,
                        IdbrgNavigation = barangData ?? null,
                        Harga = data.Harga,
                        Kdsatuan = data.Kdsatuan,
                        KdsatuanNavigation = satuanData ?? null,
                        Kdssh = data.Kdssh,
                        Kelompok = data.Kelompok,
                        Kode = data.Kode,
                        Satuan = data.Satuan,
                        Uraian = data.Uraian,
                        Spek = data.Spek,
                        Createdby = data.Createdby,
                        Createddate = data.Createddate,
                        Updateby = data.Updateby,
                        Updatedate = data.Updatedate
                    }
                    ).ToListAsync();
            }
            return Result;
        }
    }
}
