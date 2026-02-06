using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class BpkRepo : Repo<Bpk>, IBpkRepo
    {
        private readonly IMapper _mapper;
        public BpkRepo(DbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<BpkView> DataViewOld(long Idbpk)
        {
            BpkView data = await (
                    from bpk in _BludContext.Bpk
                    join unit in _BludContext.Daftunit on bpk.Idunit equals unit.Idunit
                    join phk3 in _BludContext.Daftphk3 on bpk.Idphk3 equals phk3.Idphk3 into phk3Macth
                    from phk3_data in phk3Macth.DefaultIfEmpty()
                    join tgh in _BludContext.Tagihan on bpk.Idtagihan equals tgh.Idtagihan into tghMacth
                    from tgh_data in tghMacth.DefaultIfEmpty()
                    join byr in _BludContext.Jbayar on bpk.Idjbayar equals byr.Idjbayar into byrMacth
                    from byr_data in byrMacth.DefaultIfEmpty()
                    join jtrans in _BludContext.Jtransfer on bpk.Idjtransfer equals jtrans.Idjtransfer into jtransMatch
                    from jtrans_data in jtransMatch.DefaultIfEmpty()
                    join bend in _BludContext.Bend on bpk.Idbend equals bend.Idbend into bendMacth
                    from bend_data in bendMacth.DefaultIfEmpty()
                    join cair in _BludContext.Jcair on bpk.Stcair equals cair.Stcair into cairMacth
                    from cair_data in cairMacth.DefaultIfEmpty()
                    join kirim in _BludContext.Jkirim on bpk.Stcair equals kirim.Stkirim into kirimMatch
                    from kirim_data in kirimMatch.DefaultIfEmpty()
                    where bpk.Idbpk == Idbpk
                    select new BpkView
                    {
                        Nobpk = bpk.Nobpk,
                        Idbpk = bpk.Idbpk,
                        Createby = bpk.Createby,
                        Createdate = bpk.Createdate,
                        Updatedate = bpk.Updatedate,
                        Updateby = bpk.Updateby,
                        Noref = bpk.Noref,
                        Kdstatus = bpk.Kdstatus,
                        Idxkode = bpk.Idxkode,
                        Tglbpk = bpk.Tglbpk,
                        Uraibpk = bpk.Uraibpk,
                        Penerima = bpk.Penerima,
                        Tglvalid = bpk.Tglvalid,
                        Idtagihan = bpk.Idtagihan,
                        IdtagihanNavigation = tgh_data ?? null,
                        Idunit = bpk.Idunit,
                        IdunitNavigation = unit,
                        Idphk3 = bpk.Idphk3,
                        Idphk3Navigation = phk3_data ?? null,
                        Idjbayar = bpk.Idjbayar,
                        IdjbayarNavigation = byr_data ?? null,
                        Idbend = bpk.Idbend,
                        IdbendNavigation = bend_data ?? null,
                        Stcair = bpk.Stcair,
                        StcairNavigation = cair_data ?? null,
                        Stkirim = bpk.Stkirim,
                        StkirimNavigation = kirim_data ?? null,
                        Kdrilis = bpk.Kdrilis,
                        Idjtransfer = bpk.Idjtransfer,
                        IdjtransferNavigation = jtrans_data ?? null,
                        Valid = bpk.Valid,
                        Validby = bpk.Validby,
                        Verifikasi = bpk.Verifikasi
                    }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<BpkView>> DataViewsOld(BpkGet param)
        {
            string[] kdstatus = param.Kdstatus.Split(',');
            List<BpkView> datas = await (
                    from bpk in _BludContext.Bpk
                    join unit in _BludContext.Daftunit on bpk.Idunit equals unit.Idunit
                    join phk3 in _BludContext.Daftphk3 on bpk.Idphk3 equals phk3.Idphk3 into phk3Macth from phk3_data in phk3Macth.DefaultIfEmpty()
                    join tgh in _BludContext.Tagihan on bpk.Idtagihan equals tgh.Idtagihan into tghMacth from tgh_data in tghMacth.DefaultIfEmpty()
                    join byr in _BludContext.Jbayar on bpk.Idjbayar equals byr.Idjbayar into byrMacth from byr_data in byrMacth.DefaultIfEmpty()
                    join jtrans in _BludContext.Jtransfer on bpk.Idjtransfer equals jtrans.Idjtransfer into jtransMatch from jtrans_data in jtransMatch.DefaultIfEmpty()
                    join bend in _BludContext.Bend on bpk.Idbend equals bend.Idbend into bendMacth from bend_data in bendMacth.DefaultIfEmpty()
                    join cair in _BludContext.Jcair on bpk.Stcair equals cair.Stcair into cairMacth from cair_data in cairMacth.DefaultIfEmpty()
                    join kirim in _BludContext.Jkirim on bpk.Stcair equals kirim.Stkirim into kirimMatch from kirim_data in kirimMatch.DefaultIfEmpty()
                    where bpk.Idunit == param.Idunit && bpk.Idxkode == param.Idxkode && kdstatus.Contains(bpk.Kdstatus.Trim())
                    select new BpkView
                    {
                        Nobpk = bpk.Nobpk,
                        Idbpk = bpk.Idbpk,
                        Createby = bpk.Createby,
                        Createdate = bpk.Createdate,
                        Updatedate = bpk.Updatedate,
                        Updateby = bpk.Updateby,
                        Noref = bpk.Noref,
                        Kdstatus = bpk.Kdstatus,
                        Idxkode = bpk.Idxkode,
                        Tglbpk = bpk.Tglbpk,
                        Uraibpk = bpk.Uraibpk,
                        Penerima = bpk.Penerima,
                        Tglvalid = bpk.Tglvalid,
                        Idtagihan = bpk.Idtagihan,
                        IdtagihanNavigation = tgh_data ?? null,
                        Idunit = bpk.Idunit,
                        IdunitNavigation = unit,
                        Idphk3 = bpk.Idphk3,
                        Idphk3Navigation = phk3_data ?? null,
                        Idjbayar = bpk.Idjbayar,
                        IdjbayarNavigation = byr_data ?? null,
                        Idbend = bpk.Idbend,
                        IdbendNavigation = bend_data ?? null,
                        Stcair = bpk.Stcair,
                        StcairNavigation = cair_data ?? null,
                        Stkirim = bpk.Stkirim,
                        StkirimNavigation = kirim_data ?? null,
                        Kdrilis = bpk.Kdrilis,
                        Idjtransfer = bpk.Idjtransfer,
                        IdjtransferNavigation = jtrans_data ?? null,
                        Valid = bpk.Valid,
                        Validby = bpk.Validby,
                        Verifikasi = bpk.Verifikasi
                    }
                ).ToListAsync();
            return datas;
        }

        public async Task<PrimengTableResult<Bpk>> Paging(PrimengTableParam<BpkGet> param)
        {
            PrimengTableResult<Bpk> Result = new PrimengTableResult<Bpk>();
            IQueryable<Bpk> query = (
                from data in _BludContext.Bpk
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Macth
                from phk3_data in phk3Macth.DefaultIfEmpty()
                join tgh in _BludContext.Tagihan on data.Idtagihan equals tgh.Idtagihan into tghMacth
                from tgh_data in tghMacth.DefaultIfEmpty()
                join byr in _BludContext.Jbayar on data.Idjbayar equals byr.Idjbayar into byrMacth
                from byr_data in byrMacth.DefaultIfEmpty()
                join jtrans in _BludContext.Jtransfer on data.Idjtransfer equals jtrans.Idjtransfer into jtransMatch
                from jtrans_data in jtransMatch.DefaultIfEmpty()
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMacth
                from bend_data in bendMacth.DefaultIfEmpty()
                join cair in _BludContext.Jcair on data.Stcair equals cair.Stcair into cairMacth
                from cair_data in cairMacth.DefaultIfEmpty()
                join kirim in _BludContext.Jkirim on data.Stcair equals kirim.Stkirim into kirimMatch
                from kirim_data in kirimMatch.DefaultIfEmpty()
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                join zkode in _BludContext.Zkode on data.Idxkode equals zkode.Idxkode into zkodeMatch
                from zkode_data in zkodeMatch.DefaultIfEmpty()
                select new Bpk
                {
                    Nobpk = data.Nobpk,
                    Idbpk = data.Idbpk,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updatedate = data.Updatedate,
                    Updateby = data.Updateby,
                    Noref = data.Noref,
                    Kdstatus = data.Kdstatus,
                    Idxkode = data.Idxkode,
                    Tglbpk = data.Tglbpk,
                    Uraibpk = data.Uraibpk,
                    Penerima = data.Penerima,
                    Tglvalid = data.Tglvalid,
                    Idtagihan = data.Idtagihan,
                    IdtagihanNavigation = tgh_data ?? null,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit,
                    Idphk3 = data.Idphk3,
                    Idphk3Navigation = phk3_data ?? null,
                    Idjbayar = data.Idjbayar,
                    IdjbayarNavigation = byr_data ?? null,
                    Idbend = data.Idbend,
                    IdbendNavigation = bend_data ?? null,
                    Stcair = data.Stcair,
                    StcairNavigation = cair_data ?? null,
                    Stkirim = data.Stkirim,
                    StkirimNavigation = kirim_data ?? null,
                    Kdrilis = data.Kdrilis,
                    Idjtransfer = data.Idjtransfer,
                    IdjtransferNavigation = jtrans_data ?? null,
                    Idkeg = data.Idkeg,
                    Sp2dbpk = _BludContext.Sp2dbpk.Where(w => w.Idbpk == data.Idbpk).ToList(),
                    KdstatusNavigation = status_data ?? null,
                    IdxkodeNavigation = zkode_data ?? null,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Verifikasi = data.Verifikasi
                }
                ).AsQueryable();
            if(param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Parameters.Idxkode).AsQueryable();
            }
            if(param.Parameters.Kdstatus != "x")
            {
                List<string> status = param.Parameters.Kdstatus.Split(",").ToList();
                query = query.Where(w => status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if(param.Parameters.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Parameters.Idkeg).AsQueryable();
            }
            if (param.Parameters.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Parameters.Idbend).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nobpk.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglbpk.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraibpk.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Penerima.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nobpk")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nobpk).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nobpk).AsQueryable();
                    }
                }
                else if (param.SortField == "tglbpk")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglbpk).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglbpk).AsQueryable();
                    }
                }
                else if (param.SortField == "penerima")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Penerima).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Penerima).AsQueryable();
                    }
                }
                else if (param.SortField == "uraibpk")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Uraibpk).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Uraibpk).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            if(Result.Data.Count() > 0)
            {
                foreach(var i in Result.Data)
                {
                    if(i.Sp2dbpk.Count() > 0)
                    {
                        foreach(var j in i.Sp2dbpk)
                        {
                            j.Idsp2dNavigation = await _BludContext.Sp2d.Where(w => w.Idsp2d == j.Idsp2d).FirstOrDefaultAsync();
                        }
                    }
                }
            }
            return Result;
        }

        public async Task<bool> Update(Bpk param)
        {
            Bpk data = await _BludContext.Bpk.Where(w => w.Idbpk == param.Idbpk).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Idphk3 = param.Idphk3;
            data.Uraibpk = param.Uraibpk;
            data.Idtagihan = param.Idtagihan;
            data.Tglbpk = param.Tglbpk;
            data.Updatedate = param.Updatedate;
            data.Updateby = param.Updateby;
            data.Penerima = param.Penerima;
            data.Nobpk = param.Nobpk;
            data.Kdstatus = param.Kdstatus;
            data.Idjbayar = param.Idjbayar;
            data.Idjtransfer = param.Idjtransfer;
            _BludContext.Bpk.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
        public async Task<bool> Pengesahan(Bpk param)
        {
            Bpk data = await _BludContext.Bpk.Where(w => w.Idbpk == param.Idbpk).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglvalid = param.Tglvalid;
                data.Validby = param.Validby;
                data.Valid = param.Valid;
                data.Verifikasi = param.Verifikasi;
                data.Updateby = param.Updateby;
                data.Updatedate = param.Updatedate;
                _BludContext.Bpk.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<Bpk> ViewData(long Idbpk)
        {
            Bpk Result = await (
                from data in _BludContext.Bpk
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Macth
                from phk3_data in phk3Macth.DefaultIfEmpty()
                join tgh in _BludContext.Tagihan on data.Idtagihan equals tgh.Idtagihan into tghMacth
                from tgh_data in tghMacth.DefaultIfEmpty()
                join byr in _BludContext.Jbayar on data.Idjbayar equals byr.Idjbayar into byrMacth
                from byr_data in byrMacth.DefaultIfEmpty()
                join jtrans in _BludContext.Jtransfer on data.Idjtransfer equals jtrans.Idjtransfer into jtransMatch
                from jtrans_data in jtransMatch.DefaultIfEmpty()
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMacth
                from bend_data in bendMacth.DefaultIfEmpty()
                join cair in _BludContext.Jcair on data.Stcair equals cair.Stcair into cairMacth
                from cair_data in cairMacth.DefaultIfEmpty()
                join kirim in _BludContext.Jkirim on data.Stcair equals kirim.Stkirim into kirimMatch
                from kirim_data in kirimMatch.DefaultIfEmpty()
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch from status_data in statusMatch.DefaultIfEmpty()
                join zkode in _BludContext.Zkode on data.Idxkode equals zkode.Idxkode into zkodeMatch from zkode_data in zkodeMatch.DefaultIfEmpty()
                where data.Idbpk == Idbpk
                select new Bpk
                {
                    Nobpk = data.Nobpk,
                    Idbpk = data.Idbpk,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updatedate = data.Updatedate,
                    Updateby = data.Updateby,
                    Noref = data.Noref,
                    Kdstatus = data.Kdstatus,
                    Idxkode = data.Idxkode,
                    Tglbpk = data.Tglbpk,
                    Uraibpk = data.Uraibpk,
                    Penerima = data.Penerima,
                    Tglvalid = data.Tglvalid,
                    Idtagihan = data.Idtagihan,
                    IdtagihanNavigation = tgh_data ?? null,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit,
                    Idphk3 = data.Idphk3,
                    Idphk3Navigation = phk3_data ?? null,
                    Idjbayar = data.Idjbayar,
                    IdjbayarNavigation = byr_data ?? null,
                    Idbend = data.Idbend,
                    IdbendNavigation = bend_data ?? null,
                    Stcair = data.Stcair,
                    StcairNavigation = cair_data ?? null,
                    Stkirim = data.Stkirim,
                    StkirimNavigation = kirim_data ?? null,
                    Kdrilis = data.Kdrilis,
                    Idjtransfer = data.Idjtransfer,
                    IdjtransferNavigation = jtrans_data ?? null,
                    Idkeg = data.Idkeg,
                    Sp2dbpk = _BludContext.Sp2dbpk.Where(w => w.Idbpk == data.Idbpk).ToList(),
                    KdstatusNavigation = status_data ?? null,
                    IdxkodeNavigation = zkode_data ?? null,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Verifikasi = data.Verifikasi
                }
                ).FirstOrDefaultAsync();
            if (Result != null)
            {
                if (Result.Sp2dbpk.Count() > 0)
                {
                    foreach (var j in Result.Sp2dbpk)
                    {
                        j.Idsp2dNavigation = await _BludContext.Sp2d.Where(w => w.Idsp2d == j.Idsp2d).FirstOrDefaultAsync();
                    }
                }
            }
            return Result;
        }

        public async Task<List<Bpk>> ViewDatas(BpkGet param)
        {
            List<Bpk> Result = new List<Bpk>();
            IQueryable<Bpk> query = (
                from data in _BludContext.Bpk
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Macth
                from phk3_data in phk3Macth.DefaultIfEmpty()
                join tgh in _BludContext.Tagihan on data.Idtagihan equals tgh.Idtagihan into tghMacth
                from tgh_data in tghMacth.DefaultIfEmpty()
                join byr in _BludContext.Jbayar on data.Idjbayar equals byr.Idjbayar into byrMacth
                from byr_data in byrMacth.DefaultIfEmpty()
                join jtrans in _BludContext.Jtransfer on data.Idjtransfer equals jtrans.Idjtransfer into jtransMatch
                from jtrans_data in jtransMatch.DefaultIfEmpty()
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMacth
                from bend_data in bendMacth.DefaultIfEmpty()
                join cair in _BludContext.Jcair on data.Stcair equals cair.Stcair into cairMacth
                from cair_data in cairMacth.DefaultIfEmpty()
                join kirim in _BludContext.Jkirim on data.Stcair equals kirim.Stkirim into kirimMatch
                from kirim_data in kirimMatch.DefaultIfEmpty()
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                join zkode in _BludContext.Zkode on data.Idxkode equals zkode.Idxkode into zkodeMatch
                from zkode_data in zkodeMatch.DefaultIfEmpty()
                select new Bpk
                {
                    Nobpk = data.Nobpk,
                    Idbpk = data.Idbpk,
                    Createby = data.Createby,
                    Createdate = data.Createdate,
                    Updatedate = data.Updatedate,
                    Updateby = data.Updateby,
                    Noref = data.Noref,
                    Kdstatus = data.Kdstatus,
                    Idxkode = data.Idxkode,
                    Tglbpk = data.Tglbpk,
                    Uraibpk = data.Uraibpk,
                    Penerima = data.Penerima,
                    Tglvalid = data.Tglvalid,
                    Idtagihan = data.Idtagihan,
                    IdtagihanNavigation = tgh_data ?? null,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit,
                    Idphk3 = data.Idphk3,
                    Idphk3Navigation = phk3_data ?? null,
                    Idjbayar = data.Idjbayar,
                    IdjbayarNavigation = byr_data ?? null,
                    Idbend = data.Idbend,
                    IdbendNavigation = bend_data ?? null,
                    Stcair = data.Stcair,
                    StcairNavigation = cair_data ?? null,
                    Stkirim = data.Stkirim,
                    StkirimNavigation = kirim_data ?? null,
                    Kdrilis = data.Kdrilis,
                    Idjtransfer = data.Idjtransfer,
                    IdjtransferNavigation = jtrans_data ?? null,
                    Idkeg = data.Idkeg,
                    Sp2dbpk = _BludContext.Sp2dbpk.Where(w => w.Idbpk == data.Idbpk).ToList(),
                    KdstatusNavigation = status_data ?? null,
                    IdxkodeNavigation = zkode_data ?? null,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Verifikasi = data.Verifikasi
                }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if (param.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Idxkode).AsQueryable();
            }
            if (param.Kdstatus != "x")
            {
                List<string> status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if (param.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Idkeg).AsQueryable();
            }
            if (param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            query = query.OrderBy(o => o.Nobpk);
            Result = await query.ToListAsync();
            if (Result.Count() > 0)
            {
                foreach (var i in Result)
                {
                    if (i.Sp2dbpk.Count() > 0)
                    {
                        foreach (var j in i.Sp2dbpk)
                        {
                            j.Idsp2dNavigation = await _BludContext.Sp2d.Where(w => w.Idsp2d == j.Idsp2d).FirstOrDefaultAsync();
                        }
                    }
                }
            }
            return Result;
        }

        public async Task<string> NewNomorUrut(BpkGetUrutPost param)
        {
            string newno = "";
            string lastno = await _BludContext.Bpk.Where(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend).OrderBy(o => o.Nobpk.Trim()).Select(s => s.Nobpk).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "00001";
            }
            else
            {
                // Ambil 5 karakter pertama dari lastno
                string firstFiveChars = lastno.Substring(0, 5);

                if (int.TryParse(firstFiveChars, out int toNumber))
                {
                    int plusNumber = toNumber + 1;
                    newno = plusNumber.ToString("D5"); // Format agar tetap 5 digit
                }
                else
                {
                    throw new Exception("Format Nomor BPK tidak valid.");
                }
            }
            return newno;
        }
    }
}
