using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class PanjarRepo : Repo<Panjar>, IPanjarRepo
    {
        public PanjarRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> GetIds(long Idpanjar)
        {
            List<long> Ids = await _BludContext.Panjar
                .Where(w => w.Idpanjar == Idpanjar)
                .Select(s => s.Idpanjar).ToListAsync();
            return Ids;
        }
        public async Task<bool> Update(Panjar param)
        {
            Panjar data = await _BludContext.Panjar.Where(w => w.Idpanjar == param.Idpanjar).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Uraian = param.Uraian;
            data.Tglpanjar = param.Tglpanjar;
            data.Kdstatus = param.Kdstatus;
            data.Dateupdate = param.Dateupdate;
            data.Referensi = param.Referensi;
            data.Nopanjar = param.Nopanjar;
            data.Stbank = param.Stbank;
            data.Sttunai = param.Sttunai;
            _BludContext.Panjar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }
        public async Task<bool> Pengesahan(Panjar param)
        {
            Panjar data = await _BludContext.Panjar.Where(w => w.Idpanjar == param.Idpanjar).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            data.Tglvalid = param.Tglvalid;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Panjar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<List<Panjar>> ViewDatas(PanjarGet param)
        {
            List<Panjar> Result = new List<Panjar>();
            IQueryable<Panjar> query = (
                from data in _BludContext.Panjar
                join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join kode in _BludContext.Zkode on data.Idxkode equals kode.Idxkode
                join bku in _BludContext.Bkupanjar on data.Idpanjar equals bku.Idpanjar into bkuMacth from bku_data in bkuMacth.DefaultIfEmpty()
                select new Panjar
                {
                    Idbend = data.Idbend,
                    Idxkode = data.Idxkode,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpanjar = data.Idpanjar,
                    Idpeg = data.Idpeg,
                    Idunit = data.Idunit,
                    Nopanjar = data.Nopanjar,
                    Stbank = data.Stbank,
                    Kdstatus  = data.Kdstatus,
                    Sttunai = data.Sttunai,
                    Referensi = data.Referensi,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Tglpanjar = data.Tglpanjar,
                    Uraian = data.Uraian,
                    IdbendNavigation = bendahara ?? null,
                    KdstatusNavigation = status ?? null,
                    IdxkodeNavigation = kode ?? null,
                    Bkupanjar = bkuMacth.ToList() ?? null,
                }
                ).AsQueryable();
            if(param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if(param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            if(param.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Idxkode).AsQueryable();
            }
            if(param.Kdstatus != "x")
            {
                List<string> kdstatus = param.Kdstatus.Split(",").ToList();
                if(kdstatus.Count() > 0)
                {
                    query = query.Where(w => kdstatus.Contains(w.Kdstatus.Trim())).AsQueryable();
                }
            }
            Result = await query.ToListAsync();
            return Result;
        }

        public async Task<Panjar> ViewData(long Idpanjar)
        {
            Panjar Result = await (
                from data in _BludContext.Panjar
                join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join kode in _BludContext.Zkode on data.Idxkode equals kode.Idxkode
                join bku in _BludContext.Bkupanjar on data.Idpanjar equals bku.Idpanjar into bkuMacth
                from bku_data in bkuMacth.DefaultIfEmpty()
                where data.Idpanjar == Idpanjar
                select new Panjar
                {
                    Idbend = data.Idbend,
                    Idxkode = data.Idxkode,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idpanjar = data.Idpanjar,
                    Idpeg = data.Idpeg,
                    Idunit = data.Idunit,
                    Nopanjar = data.Nopanjar,
                    Stbank = data.Stbank,
                    Referensi = data.Referensi,
                    Kdstatus = data.Kdstatus,
                    Sttunai = data.Sttunai,
                    Tglvalid = data.Tglvalid,
                    Valid = data.Valid,
                    Validby = data.Validby,
                    Tglpanjar = data.Tglpanjar,
                    Uraian = data.Uraian,
                    IdbendNavigation = bendahara ?? null,
                    KdstatusNavigation = status ?? null,
                    IdxkodeNavigation = kode ?? null,
                    Bkupanjar = bkuMacth.ToList() ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }
        public async Task<string> NewNomorUrut(PanjarGetUrutPost param)
        {
            string newno = "";
            string lastno = await _BludContext.Panjar.Where(w => w.Idunit == param.Idunit && w.Idbend == param.Idbend).OrderBy(o => o.Nopanjar.Trim()).Select(s => s.Nopanjar).LastOrDefaultAsync();

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
                    throw new Exception("Format Nomor Panjar tidak valid.");
                }
            }
            return newno;
        }
    }
}
