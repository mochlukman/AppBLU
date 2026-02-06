using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class TbpRepo : Repo<Tbp>, ITbpRepo
    {
        public TbpRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> GetIds(long Idtbp)
        {
            List<long> Ids = await _BludContext.Tbp
                .Where(w => w.Idtbp == Idtbp)
                .Select(s => s.Idtbp).ToListAsync();
            return Ids;
        }

        public async Task<bool> Update(Tbp param)
        {
            Tbp data = await _BludContext.Tbp.Where(w => w.Idtbp == param.Idtbp).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Notbp = param.Notbp;
            data.Tgltbp = param.Tgltbp;
            data.Penyetor = param.Penyetor;
            data.Alamat = param.Alamat;
            data.Uraitbp = param.Uraitbp;
            data.Idbend1 = param.Idbend1;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Tbp.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<Tbp> ViewData(long Idtbp)
        {
            Tbp data = await (
                 from tbp in _BludContext.Tbp
                 join status in _BludContext.Stattrs on tbp.Kdstatus.Trim() equals status.Kdstatus.Trim()
                 join bend in _BludContext.Bend on tbp.Idbend1 equals bend.Idbend into bendMacth
                 from bendData in bendMacth.DefaultIfEmpty()
                 join skptbp in _BludContext.Skptbp on tbp.Idtbp equals skptbp.Idtbp into skptbpMatch
                 from skptbpData in skptbpMatch.DefaultIfEmpty()
                 where tbp.Idtbp == Idtbp
                 select new Tbp
                 {
                     Idtbp = tbp.Idtbp,
                     Idunit = tbp.Idunit,
                     Notbp = tbp.Notbp,
                     Idbend1 = tbp.Idbend1,
                     Kdstatus = tbp.Kdstatus,
                     Idbend2 = tbp.Idbend2,
                     Idxkode = tbp.Idxkode,
                     Tgltbp = tbp.Tgltbp,
                     Penyetor = tbp.Penyetor,
                     Alamat = tbp.Alamat,
                     Uraitbp = tbp.Uraitbp,
                     Tglvalid = tbp.Tglvalid,
                     Datecreate = tbp.Datecreate,
                     Dateupdate = tbp.Dateupdate,
                     KdstatusNavigation = status ?? null,
                     Valid = tbp.Valid,
                     Ketvalid = tbp.Ketvalid,
                     Validby = tbp.Validby,
                     Idbend1Navigation = bendData ?? null,
                     Skptbp = skptbpData ?? null
                 }
                ).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Tbp>> ViewDatas(long Idunit, List<string> Kdstatus, int Idxkode, long? Idbend, bool Isvalid, bool ExceptTbpsts)
        {
            var tbpstsQuery = _BludContext.Tbpsts.Select(s => s.Idtbp);

            IQueryable<Tbp> datas = (
                from tbp in _BludContext.Tbp.AsNoTracking()
                join status in _BludContext.Stattrs.AsNoTracking() on tbp.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join bend in _BludContext.Bend.AsNoTracking() on tbp.Idbend1 equals bend.Idbend into bendMacth
                from bendData in bendMacth.DefaultIfEmpty()
                join skptbp in _BludContext.Skptbp.AsNoTracking() on tbp.Idtbp equals skptbp.Idtbp into skptbpMatch
                from skptbpData in skptbpMatch.DefaultIfEmpty()
                where tbp.Idunit == Idunit && Kdstatus.Contains(tbp.Kdstatus.Trim()) && tbp.Idxkode == Idxkode
                select new Tbp
                {
                    Idtbp = tbp.Idtbp,
                    Idunit = tbp.Idunit,
                    Notbp = tbp.Notbp,
                    Idbend1 = tbp.Idbend1,
                    Idbend1Navigation = bendData ?? null,
                    Kdstatus = tbp.Kdstatus,
                    Idbend2 = tbp.Idbend2,
                    Idxkode = tbp.Idxkode,
                    Tgltbp = tbp.Tgltbp,
                    Penyetor = tbp.Penyetor,
                    Alamat = tbp.Alamat,
                    Uraitbp = tbp.Uraitbp,
                    Tglvalid = tbp.Tglvalid,
                    Datecreate = tbp.Datecreate,
                    Dateupdate = tbp.Dateupdate,
                    KdstatusNavigation = status ?? null,
                    Valid = tbp.Valid,
                    Ketvalid = tbp.Ketvalid,
                    Validby = tbp.Validby,
                    Skptbp = skptbpData ?? null
                }
            );

            if (Isvalid)
            {
                datas = datas.Where(tbp => !string.IsNullOrEmpty(tbp.Tglvalid.ToString()));
            }

            if (ExceptTbpsts)
            {
                datas = datas.Where(w => !tbpstsQuery.Contains(w.Idtbp));
            }
            datas = datas.OrderBy(o => o.Notbp);

            return await datas.ToListAsync();
        }


        public async Task<List<Tbp>> ViewDatas(long Idunit, int Idxkode)
        {
            List<Tbp> datas = await (
                from tbp in _BludContext.Tbp
                join status in _BludContext.Stattrs on tbp.Kdstatus.Trim() equals status.Kdstatus.Trim()
                join bend in _BludContext.Bend on tbp.Idbend1 equals bend.Idbend into bendMacth
                from bendData in bendMacth.DefaultIfEmpty()
                join skptbp in _BludContext.Skptbp on tbp.Idtbp equals skptbp.Idtbp into skptbpMatch
                from skptbpData in skptbpMatch.DefaultIfEmpty()
                where tbp.Idunit == Idunit && tbp.Idxkode == Idxkode
                select new Tbp
                {
                    Idtbp = tbp.Idtbp,
                    Idunit = tbp.Idunit,
                    Notbp = tbp.Notbp,
                    Idbend1 = tbp.Idbend1,
                    Idbend1Navigation = bendData ?? null,
                    Kdstatus = tbp.Kdstatus,
                    Idbend2 = tbp.Idbend2,
                    Idxkode = tbp.Idxkode,
                    Tgltbp = tbp.Tgltbp,
                    Penyetor = tbp.Penyetor,
                    Alamat = tbp.Alamat,
                    Uraitbp = tbp.Uraitbp,
                    Tglvalid = tbp.Tglvalid,
                    Valid = tbp.Valid,
                    Ketvalid = tbp.Ketvalid,
                    Validby = tbp.Validby,
                    Datecreate = tbp.Datecreate,
                    Dateupdate = tbp.Dateupdate,
                    KdstatusNavigation = status ?? null,
                    Skptbp = skptbpData ?? null
                }
                ).ToListAsync();
            return datas;
        }
        public async Task<bool> Pengesahan(Tbp param)
        {
            Tbp data = await _BludContext.Tbp.Where(w => w.Idtbp == param.Idtbp).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Tglvalid = param.Tglvalid;
            data.Valid = param.Valid;
            data.Validby = param.Validby;
            data.Ketvalid = param.Ketvalid;
            _BludContext.Tbp.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<string> GenerateNoReg(long Idunit, List<string> Kdstatus)
        {
            string newno = "";
            string lastno = await _BludContext.Tbp.Where(w => w.Idunit == Idunit &&  Kdstatus.Contains(w.Kdstatus.Trim())).OrderBy(o => o.Idtbp).Select(s => s.Notbp).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "00001";
            }
            else
            {
                // Ambil 5 karakter pertama dari lastno
                string firstFiveChars = lastno.Substring(0, 5);
                string firstFourChars = lastno.Substring(0, 4);

                if (int.TryParse(firstFiveChars, out int toNumber))
                {
                    int plusNumber = toNumber + 1;
                    newno = plusNumber.ToString("D5"); // Format agar tetap 5 digit
                }
                else if (int.TryParse(firstFourChars, out int toNumberfour))
                {
                    int plusNumber4 = toNumberfour + 1;
                    newno = plusNumber4.ToString("D4"); 
                }
                else
                {
                    throw new Exception("Format Nomor TBP tidak valid.");
                }
            }
            return newno;
        }
    }
}