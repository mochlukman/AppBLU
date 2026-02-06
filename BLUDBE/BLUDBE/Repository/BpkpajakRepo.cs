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
    public class BpkpajakRepo : Repo<Bpkpajak>, IBpkpajakRepo
    {
        public BpkpajakRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Bpkpajak param)
        {
            Bpkpajak data = await _BludContext.Bpkpajak.Where(w => w.Idbpkpajak == param.Idbpkpajak).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Dateupdate = param.Dateupdate;
            data.Tanggal = param.Tanggal;
            data.Nomor = param.Nomor;
            data.Uraian = param.Uraian;
            _BludContext.Bpkpajak.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<BpkpajakView> ViewData(long Idbpkpajak)
        {
            BpkpajakView Result = await (
                from data in _BludContext.Bpkpajak
                join bpk in _BludContext.Bpk on data.Idbpk equals bpk.Idbpk
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                where data.Idbpkpajak == Idbpkpajak
                select new BpkpajakView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idbpk = data.Idbpk,
                    Uraian = data.Uraian,
                    Kdstatus = data.Kdstatus,
                    Tanggal = data.Tanggal,
                    Nomor = data.Nomor,
                    Idbpkpajak = data.Idbpkpajak,
                    IdbpkNavigation = bpk ?? null,
                    KdstatusNavigation = status_data ?? null,
                    Nilai = _BludContext.Bpkpajakdet.Where(w => w.Idbpkpajak == data.Idbpkpajak).Sum(s => s.Nilai)
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<BpkpajakView>> ViewDatas(BpkpajakGet param)
        {
            List<BpkpajakView> Result = new List<BpkpajakView>();
            IQueryable<BpkpajakView> query = (
                from data in _BludContext.Bpkpajak
                join bpk in _BludContext.Bpk on data.Idbpk equals bpk.Idbpk
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from status_data in statusMatch.DefaultIfEmpty()
                select new BpkpajakView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idbpk = data.Idbpk,
                    Uraian = data.Uraian,
                    Kdstatus = data.Kdstatus,
                    Tanggal = data.Tanggal,
                    Nomor = data.Nomor,
                    Idbpkpajak = data.Idbpkpajak,
                    IdbpkNavigation = bpk ?? null,
                    KdstatusNavigation = status_data ?? null,
                    Nilai = _BludContext.Bpkpajakdet.Where(w => w.Idbpkpajak == data.Idbpkpajak).Sum(s => s.Nilai)
                }
                ).AsQueryable();
            if(param.Idbpk.ToString() != "0")
            {
                query = query.Where(w => w.Idbpk == param.Idbpk).AsQueryable();
            }
            if(param.Kdstatus.Trim() != "x")
            {
                List<string> status = param.Kdstatus.Split(",").ToList();
                query = query.Where(w => status.Contains(w.Kdstatus.Trim())).AsQueryable();
            }
            if(param.Idbpkpajakstr.ToString() != "0") // digunakan untuk get data != BPKPAJAKSTRDET / untuk input kee BPKPAJAKSTRDET
            {
                List<long?> bpkpajak = await _BludContext.Bpkpajakstrdet.Where(w => w.Idbpkpajakstr == param.Idbpkpajakstr).Select(s => s.Idbpkpajak).ToListAsync();
                if(bpkpajak.Count() > 0)
                {
                    query = query.Where(w => !bpkpajak.Contains(w.Idbpkpajak)).AsQueryable();
                }
            }
            if(param.Idunit.ToString() != "0")
            {
                List<long> Idbpk = new List<long> { };
                if (param.Idbend.ToString() != "0")
                {
                    Idbpk = await _BludContext.Bpk.Where(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend).Select(s => s.Idbpk).ToListAsync();
                } else
                {
                    Idbpk = await _BludContext.Bpk.Where(w => w.Idunit == param.Idunit).Select(s => s.Idbpk).ToListAsync();
                }
               
                if(Idbpk.Count() > 0)
                {
                    query = query.Where(w => Idbpk.Contains(w.Idbpk)).AsQueryable();
                }
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
