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
    public class StsRepo : Repo<Sts>, IStsRepo
    {
        public StsRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Sts param)
        {
            Sts data = await _BludContext.Sts.Where(w => w.Idsts == param.Idsts).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nosts = param.Nosts;
            data.Nobbantu = param.Nobbantu;
            data.Dateupdate = param.Dateupdate;
            data.Uraian = param.Uraian;
            data.Tglvalid = param.Tglvalid;
            data.Tglsts = param.Tglsts;
            data.Nilaiup = param.Nilaiup;
            data.Idbend = param.Idbend;
            _BludContext.Sts.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Sts> ViewData(long Idsts)
        {
            Sts data = await (
               from sts in _BludContext.Sts
               join unit in _BludContext.Daftunit on sts.Idunit equals unit.Idunit
               join bend in _BludContext.Bend on sts.Idbend equals bend.Idbend into bendMatch
               from bendData in bendMatch.DefaultIfEmpty()
               join kode in _BludContext.Zkode on sts.Idxkode equals kode.Idxkode
               join status in _BludContext.Stattrs on sts.Kdstatus.Trim() equals status.Kdstatus.Trim()
               join nobantu in _BludContext.Bkbkas on sts.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
               where sts.Idsts == Idsts
               select new Sts
               {
                   Idbend = sts.Idbend,
                   IdbendNavigation = bendData ?? null,
                   Idunit = sts.Idunit,
                   IdunitNavigation = unit ?? null,
                   Idxkode = sts.Idxkode,
                   Kdstatus = sts.Kdstatus,
                   Tglvalid = sts.Tglvalid,
                   Valid = sts.Valid,
                   Validby = sts.Validby,
                   Ketvalid = sts.Ketvalid,
                   Datecreate = sts.Datecreate,
                   Dateupdate = sts.Dateupdate,
                   Kdrilis = sts.Kdrilis,
                   Idsts = sts.Idsts,
                   Nobbantu = sts.Nobbantu,
                   NobbantuNavigation = nobantu ?? null,
                   IdxkodeNavigation = kode ?? null,
                   Nosts = sts.Nosts,
                   Stcair = sts.Stcair,
                   Stkirim = sts.Stkirim,
                   KdstatusNavigation = status ?? status,
                   Tglsts = sts.Tglsts,
                   Uraian = sts.Uraian,
                   Nilaiup = sts.Nilaiup
               }
               ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Sts>> ViewDatas(long Idunit, long? Idbend, long Idxkode, List<string> Kdstatus)
        {
            List<Sts> data = await (
               from sts in _BludContext.Sts
               join unit in _BludContext.Daftunit on sts.Idunit equals unit.Idunit
               join bend in _BludContext.Bend on sts.Idbend equals bend.Idbend into bendMatch
               from bendData in bendMatch.DefaultIfEmpty()
               join kode in _BludContext.Zkode on sts.Idxkode equals kode.Idxkode
               join status in _BludContext.Stattrs on sts.Kdstatus.Trim() equals status.Kdstatus.Trim()
               join nobantu in _BludContext.Bkbkas on sts.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
               where sts.Idunit == Idunit && sts.Idxkode == Idxkode && Kdstatus.Contains(sts.Kdstatus.Trim())
               select new Sts
               {
                   Idbend = sts.Idbend,
                   IdbendNavigation = bendData ?? null,
                   Idunit = sts.Idunit,
                   IdunitNavigation = unit ?? null,
                   Idxkode = sts.Idxkode,
                   Kdstatus = sts.Kdstatus,
                   Tglvalid = sts.Tglvalid,
                   Valid = sts.Valid,
                   Validby = sts.Validby,
                   Ketvalid = sts.Ketvalid,
                   Datecreate = sts.Datecreate,
                   Dateupdate = sts.Dateupdate,
                   Kdrilis = sts.Kdrilis,
                   Idsts = sts.Idsts,
                   Nobbantu = sts.Nobbantu,
                   NobbantuNavigation = nobantu ?? null,
                   IdxkodeNavigation = kode ?? null,
                   Nosts = sts.Nosts,
                   Stcair = sts.Stcair,
                   Stkirim = sts.Stkirim,
                   KdstatusNavigation = status ?? status,
                   Tglsts = sts.Tglsts,
                   Uraian = sts.Uraian,
                   Nilaiup = sts.Nilaiup
               }
               ).ToListAsync();
            return data;
        }

        public async Task<List<Sts>> ViewDatas(long Idunit, long Idxkode)
        {
            List<Sts> data = await (
               from sts in _BludContext.Sts
               join unit in _BludContext.Daftunit on sts.Idunit equals unit.Idunit
               join bend in _BludContext.Bend on sts.Idbend equals bend.Idbend into bendMatch
               from bendData in bendMatch.DefaultIfEmpty()
               join kode in _BludContext.Zkode on sts.Idxkode equals kode.Idxkode
               join status in _BludContext.Stattrs on sts.Kdstatus.Trim() equals status.Kdstatus.Trim()
               join nobantu in _BludContext.Bkbkas on sts.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
               where sts.Idunit == Idunit && sts.Idxkode == Idxkode
               select new Sts
               {
                   Idbend = sts.Idbend,
                   IdbendNavigation = bendData ?? null,
                   Idunit = sts.Idunit,
                   IdunitNavigation = unit ?? null,
                   Idxkode = sts.Idxkode,
                   Kdstatus = sts.Kdstatus,
                   Tglvalid = sts.Tglvalid,
                   Valid = sts.Valid,
                   Validby = sts.Validby,
                   Ketvalid = sts.Ketvalid,
                   Datecreate = sts.Datecreate,
                   Dateupdate = sts.Dateupdate,
                   Kdrilis = sts.Kdrilis,
                   Idsts = sts.Idsts,
                   Nobbantu = sts.Nobbantu,
                   NobbantuNavigation = nobantu ?? null,
                   IdxkodeNavigation = kode ?? null,
                   Nosts = sts.Nosts,
                   Stcair = sts.Stcair,
                   Stkirim = sts.Stkirim,
                   KdstatusNavigation = status ?? status,
                   Tglsts = sts.Tglsts,
                   Uraian = sts.Uraian,
                   Nilaiup = sts.Nilaiup
               }
               ).ToListAsync();
            return data;
        }

        public async Task<PrimengTableResult<Sts>> ForBkuBud(PrimengTableParam<StsGetForBkuBud> param)
        {
            PrimengTableResult<Sts> Result = new PrimengTableResult<Sts>();
            IQueryable<Sts> query = (
                from sts in _BludContext.Sts
                join unit in _BludContext.Daftunit on sts.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on sts.Idbend equals bend.Idbend into bendMatch
                from bendData in bendMatch.DefaultIfEmpty()
                join kode in _BludContext.Zkode on sts.Idxkode equals kode.Idxkode
                join status in _BludContext.Stattrs on sts.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join nobantu in _BludContext.Bkbkas on sts.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
                where !String.IsNullOrEmpty(sts.Tglvalid.ToString())
                select new Sts
                {
                    Idbend = sts.Idbend,
                    IdbendNavigation = bendData ?? null,
                    Idunit = sts.Idunit,
                    IdunitNavigation = unit ?? null,
                    Idxkode = sts.Idxkode,
                    Kdstatus = sts.Kdstatus,
                    Tglvalid = sts.Tglvalid,
                    Valid = sts.Valid,
                    Validby = sts.Validby,
                    Ketvalid = sts.Ketvalid,
                    Datecreate = sts.Datecreate,
                    Dateupdate = sts.Dateupdate,
                    Kdrilis = sts.Kdrilis,
                    Idsts = sts.Idsts,
                    Nobbantu = sts.Nobbantu,
                    NobbantuNavigation = nobantu ?? null,
                    IdxkodeNavigation = kode ?? null,
                    Nosts = sts.Nosts,
                    Stcair = sts.Stcair,
                    Stkirim = sts.Stkirim,
                    KdstatusNavigation = status ?? status,
                    Tglsts = sts.Tglsts,
                    Uraian = sts.Uraian,
                    Nilaiup = sts.Nilaiup
                }
               ).AsQueryable();
            List<long?> stsbkud = await (from bkud in _BludContext.Bkud select bkud.Idsts).ToListAsync();
            if (stsbkud.Count() > 0)
            {
                query = query.Where(w => !stsbkud.Contains(w.Idsts)).AsQueryable();
            }
            if(param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if(param.Parameters.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Parameters.Idbend).AsQueryable();
            }
            if(param.Parameters.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Parameters.Idxkode).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.Parameters.Kdstatus))
            {
                query = query.Where(w => w.Kdstatus.Trim() == param.Parameters.Kdstatus).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nosts.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nosts")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nosts).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nosts).AsQueryable();
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

        public async Task<List<Sts>> ViewDatasForBku(List<long> Idsts, long Idunit, long? Idbend, long Idxkode, List<string> Kdstatus)
        {
            List<Sts> data = await (
               from sts in _BludContext.Sts
               join unit in _BludContext.Daftunit on sts.Idunit equals unit.Idunit
               join bend in _BludContext.Bend on sts.Idbend equals bend.Idbend into bendMatch
               from bendData in bendMatch.DefaultIfEmpty()
               join kode in _BludContext.Zkode on sts.Idxkode equals kode.Idxkode
               join status in _BludContext.Stattrs on sts.Kdstatus.Trim() equals status.Kdstatus.Trim()
               join nobantu in _BludContext.Bkbkas on sts.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
               where sts.Idunit == Idunit && sts.Idxkode == Idxkode && Kdstatus.Contains(sts.Kdstatus.Trim()) && !Idsts.Contains(sts.Idsts)
               select new Sts
               {
                   Idbend = sts.Idbend,
                   IdbendNavigation = bendData ?? null,
                   Idunit = sts.Idunit,
                   IdunitNavigation = unit ?? null,
                   Idxkode = sts.Idxkode,
                   Kdstatus = sts.Kdstatus,
                   Tglvalid = sts.Tglvalid,
                   Valid = sts.Valid,
                   Validby = sts.Validby,
                   Ketvalid = sts.Ketvalid,
                   Datecreate = sts.Datecreate,
                   Dateupdate = sts.Dateupdate,
                   Kdrilis = sts.Kdrilis,
                   Idsts = sts.Idsts,
                   Nobbantu = sts.Nobbantu,
                   NobbantuNavigation = nobantu ?? null,
                   IdxkodeNavigation = kode ?? null,
                   Nosts = sts.Nosts,
                   Stcair = sts.Stcair,
                   Stkirim = sts.Stkirim,
                   KdstatusNavigation = status ?? status,
                   Tglsts = sts.Tglsts,
                   Uraian = sts.Uraian,
                   Nilaiup = sts.Nilaiup
               }
               ).ToListAsync();
            return data;
        }

        public async Task<PrimengTableResult<Sts>> Paging(PrimengTableParam<StsGet> param)
        {
            PrimengTableResult<Sts> Result = new PrimengTableResult<Sts>();
            IQueryable<Sts> query = (
                from data in _BludContext.Sts
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMatch from bendData in bendMatch.DefaultIfEmpty()
                join kode in _BludContext.Zkode on data.Idxkode equals kode.Idxkode
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join nobantu in _BludContext.Bkbkas on data.Nobbantu.Trim() equals nobantu.Nobbantu.Trim()
                select new Sts
                {
                    Idbend = data.Idbend,
                    IdbendNavigation = bendData ?? null,
                    Idunit = data.Idunit,
                    IdunitNavigation = unit ?? null,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Ketvalid = data.Ketvalid,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Kdrilis = data.Kdrilis,
                    Idsts = data.Idsts,
                    Nobbantu = data.Nobbantu,
                    NobbantuNavigation = nobantu ?? null,
                    IdxkodeNavigation = kode ?? null,
                    Nosts = data.Nosts,
                    Stcair = data.Stcair,
                    Stkirim = data.Stkirim,
                    KdstatusNavigation = status ?? status,
                    Tglsts = data.Tglsts,
                    Uraian = data.Uraian,
                    Nilaiup = data.Nilaiup
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
                query = query.Where(w => w.Kdstatus.Trim() == param.Parameters.Kdstatus.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nosts.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglsts.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tglvalid.ToString(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nosts")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nosts).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nosts).AsQueryable();
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
                else if (param.SortField == "tglsts")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglsts).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglsts).AsQueryable();
                    }
                }
                else if (param.SortField == "tglvalid")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglvalid).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglvalid).AsQueryable();
                    }
                }
            }
            query = query.OrderBy(o => o.Nosts);
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Pengesahan(Sts param)
        {
            Sts data = await _BludContext.Sts.Where(w => w.Idsts == param.Idsts).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglvalid = param.Tglvalid;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            data.Ketvalid = param.Ketvalid;
            _BludContext.Sts.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<string> GenerateNoReg(long Idunit)
        {
            string newno = "";
            string noSts = await _BludContext.Sts.Where(w => w.Idunit == Idunit && w.Kdstatus != "14").OrderBy(o => o.Nosts.Trim()).Select(s => s.Nosts).LastOrDefaultAsync();
            string lastno = "";
            if (string.IsNullOrEmpty(noSts))
            {
                newno = "00001";
            }
            else
            {
                lastno = noSts.Split("/")[0];
                var toNumber = Int32.Parse(lastno);
                var PlusNumber = toNumber + 1;
                if (PlusNumber.ToString().Length == 1) newno = "0000" + PlusNumber.ToString();
                if (PlusNumber.ToString().Length == 2) newno = "000" + PlusNumber.ToString();
                if (PlusNumber.ToString().Length == 3) newno = "00" + PlusNumber.ToString();
                if (PlusNumber.ToString().Length == 4) newno = "0" + PlusNumber.ToString();
                if (PlusNumber.ToString().Length == 5) newno = PlusNumber.ToString();
            }
            return newno;
        }
    }
}
