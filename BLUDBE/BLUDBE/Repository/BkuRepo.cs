using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BkuRepo : Repo<Bkusp2d>, IBkuRepo
    {
        public BkuRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<string> GenerateNoBKU(long Idunit, long Idbend)
        {
            string new_kode = "";
            List<string> data = new List<string> { };
            string sp2d = await _BludContext.Bkusp2d
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (sp2d != null) data.Add(sp2d);    
            string pajak = await _BludContext.Bkupajak
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if(pajak != null) data.Add(pajak);
            string bpk = await _BludContext.Bkubpk
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if(bpk != null) data.Add(bpk);
            string tbp = await _BludContext.Bkutbp
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (tbp != null) data.Add(tbp);
            string panjar = await _BludContext.Bkupanjar
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (panjar != null) data.Add(panjar);
            data.Sort((a, b) => b.CompareTo(a));
            if(data.Count() > 0)
            {
                long temp = Int64.Parse(data[0]) + 1;
                if(temp.ToString().Length == 1)
                {
                    new_kode = "0000" + temp.ToString();
                }
                else if(temp.ToString().Length == 2)
                {
                    new_kode = "000" + temp.ToString();

                }
                else if (temp.ToString().Length == 3)
                {
                    new_kode = "00" + temp.ToString();

                }
                else if (temp.ToString().Length == 4)
                {
                    new_kode = "0" + temp.ToString();

                } else
                {
                    new_kode = temp.ToString();

                }
            } else
            {
                new_kode = "00001";
            }
            Bend bend = await _BludContext.Bend.Where(w => w.Idbend == Idbend).FirstOrDefaultAsync();
            if (bend != null) new_kode = new_kode + "-" + bend.Jabbend.Trim();
            return new_kode;
        }

        public async Task<string> GenerateNoBKUBUD(long Idbend)
        {
            string new_kode = "";
            List<string> data = new List<string> { };
            string bkud = await _BludContext.Bkud
                .OrderByDescending(o => o.Nobukti.Substring(0, 5))
                .Select(s => s.Nobukti.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (bkud != null) data.Add(bkud);
            string bkuk = await _BludContext.Bkuk
                .OrderByDescending(o => o.Nobukti.Substring(0, 5))
                .Select(s => s.Nobukti.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (bkuk != null) data.Add(bkuk);
            data.Sort((a, b) => b.CompareTo(a));
            if (data.Count() > 0)
            {
                long temp = Int64.Parse(data[0]) + 1;
                if (temp.ToString().Length == 1)
                {
                    new_kode = "0000" + temp.ToString();
                }
                else if (temp.ToString().Length == 2)
                {
                    new_kode = "000" + temp.ToString();

                }
                else if (temp.ToString().Length == 3)
                {
                    new_kode = "00" + temp.ToString();

                }
                else if (temp.ToString().Length == 4)
                {
                    new_kode = "0" + temp.ToString();

                }
                else
                {
                    new_kode = temp.ToString();

                }
            }
            else
            {
                new_kode = "00001";
            }
            Bend bend = await _BludContext.Bend.Where(w => w.Idbend == Idbend).FirstOrDefaultAsync();
            if (bend != null) new_kode = new_kode + "-" + bend.Jabbend.Trim();
            return new_kode;
        }

        public async Task<string> GererateNoBKUPenerimaan(long Idunit, long Idbend)
        {
            string new_kode = "";
            List<string> data = new List<string> { };
            string sp2d = await _BludContext.Bkusp2d
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (sp2d != null) data.Add(sp2d);
            string tbp = await _BludContext.Bkutbp
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (tbp != null) data.Add(tbp);
            string sts = await _BludContext.Bkusts
                .Where(w => w.Idunit == Idunit && w.Idbend == Idbend)
                .OrderByDescending(o => o.Nobkuskpd.Substring(0, 5))
                .Select(s => s.Nobkuskpd.Substring(0, 5))
                .FirstOrDefaultAsync();
            if (sts != null) data.Add(sts);
            data.Sort((a, b) => b.CompareTo(a));
            if (data.Count() > 0)
            {
                long temp = Int64.Parse(data[0]) + 1;
                if (temp.ToString().Length == 1)
                {
                    new_kode = "0000" + temp.ToString();
                }
                else if (temp.ToString().Length == 2)
                {
                    new_kode = "000" + temp.ToString();

                }
                else if (temp.ToString().Length == 3)
                {
                    new_kode = "00" + temp.ToString();

                }
                else if (temp.ToString().Length == 4)
                {
                    new_kode = "0" + temp.ToString();

                }
                else
                {
                    new_kode = temp.ToString();

                }
            }
            else
            {
                new_kode = "00001";
            }
            Bend bend = await _BludContext.Bend.Where(w => w.Idbend == Idbend).FirstOrDefaultAsync();
            if (bend != null) new_kode = new_kode + "-" + bend.Jabbend.Trim();
            return new_kode;
        }
    }
}
