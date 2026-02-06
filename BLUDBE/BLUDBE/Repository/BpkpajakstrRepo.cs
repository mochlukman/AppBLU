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
    public class BpkpajakstrRepo : Repo<Bpkpajakstr>, IBpkpajakstrRepo
    {
        public BpkpajakstrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<bool> Update(Bpkpajakstr param)
        {
            Bpkpajakstr data = await _BludContext.Bpkpajakstr.Where(w => w.Idbpkpajakstr == param.Idbpkpajakstr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Dateupdate = param.Dateupdate;
            data.Tanggal = param.Tanggal;
            data.Nomor = param.Nomor;
            data.Uraian = param.Uraian;
            _BludContext.Bpkpajakstr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<BpkpajakstrView> ViewData(long Idbpkpajakstr)
        {
            BpkpajakstrView Result = await (
                from data in _BludContext.Bpkpajakstr
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMatch
                from bendData in bendMatch.DefaultIfEmpty()
                where data.Idbpkpajakstr == Idbpkpajakstr
                select new BpkpajakstrView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idunit = data.Idunit,
                    Idbend = data.Idbend,
                    Uraian = data.Uraian,
                    Kdstatus = data.Kdstatus,
                    Tanggal = data.Tanggal,
                    Nomor = data.Nomor,
                    Idbpkpajakstr = data.Idbpkpajakstr,
                    IdunitNavigation = unit ?? null,
                    KdstatusNavigation = status_data ?? null,
                    Nilai = _BludContext.Bpkpajakstrdet.Where(w => w.Idbpkpajakstr == data.Idbpkpajakstr).Sum(s => s.Nilai),
                    Valid = data.Valid,
                    Tglvalid = data.Tglvalid,
                    IdbendNavigation = bendData ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<BpkpajakstrView>> ViewDatas(BpkpajakstrGet param)
        {
            List<BpkpajakstrView> Result = new List<BpkpajakstrView>();
            IQueryable<BpkpajakstrView> query = (
                from data in _BludContext.Bpkpajakstr
                join unit in _BludContext.Daftunit on data.Idunit equals unit.Idunit
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                join bend in _BludContext.Bend on data.Idbend equals bend.Idbend into bendMatch
                from bendData in bendMatch.DefaultIfEmpty()
                select new BpkpajakstrView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idunit = data.Idunit,
                    Idbend = data.Idbend,
                    Uraian = data.Uraian,
                    Kdstatus = data.Kdstatus,
                    Tanggal = data.Tanggal,
                    Nomor = data.Nomor,
                    Idbpkpajakstr = data.Idbpkpajakstr,
                    IdunitNavigation = unit ?? null,
                    KdstatusNavigation = status_data ?? null,
                    Nilai = _BludContext.Bpkpajakstrdet.Where(w => w.Idbpkpajakstr == data.Idbpkpajakstr).Sum(s => s.Nilai),
                    Valid = data.Valid,
                    Tglvalid = data.Tglvalid,
                    IdbendNavigation = bendData ?? null
                }
                ).AsQueryable();
            if (param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if (param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            if (param.Kdstatus.Trim() != "x")
            {
                List<string> status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
        public async Task<bool> Pengesahan(Bpkpajakstr param)
        {
            Bpkpajakstr data = await _BludContext.Bpkpajakstr.Where(w => w.Idbpkpajakstr == param.Idbpkpajakstr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Dateupdate = param.Dateupdate;
            data.Valid = param.Valid;
            data.Tglvalid = param.Tglvalid;
            _BludContext.Bpkpajakstr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}
