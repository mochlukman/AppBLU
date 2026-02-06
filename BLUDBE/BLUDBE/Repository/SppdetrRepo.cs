using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SppdetrRepo : Repo<Sppdetr>, ISppdetrRepo
    {
        public SppdetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<decimal?> TotalNilaiSpp(List<long> Idspp)
        {
            decimal? total = await _BludContext.Sppdetr.Where(w => Idspp.Contains(w.Idspp)).SumAsync(s => s.Nilai);
            return total;
        }

        public async Task<List<SppdetrViewTreeRoot>> TreetableFromSubkegiatan(long Idspp, decimal? TotalSpp, decimal? TotalSpd)
        {
            List<SppdetrViewTreeRoot> data = new List<SppdetrViewTreeRoot> { };
            List<long> Idkegs = await _BludContext.Sppdetr.Where(w => w.Idspp == Idspp).Select(s => s.Idkeg).Distinct().ToListAsync();
            if(Idkegs.Count() > 0)
            {
                for(var i = 0; i < Idkegs.Count(); i++)
                {
                    string kode_full = "";
                    
                    Mpgrm mpgrm = await _BludContext.Mpgrm
                            .Join(_BludContext.Mkegiatan.Where(w => w.Idkeg == Idkegs[i]),
                            program => program.Idprgrm,
                            kegiatan => kegiatan.Idprgrm,
                            (pro, keg) => new Mpgrm
                            {
                                Idprgrm = pro.Idprgrm,
                                Nuprgrm = pro.Nuprgrm,
                                Idurus = pro.Idurus
                            }).FirstOrDefaultAsync();
                    if(mpgrm != null)
                    {
                        Mkegiatan subkeg = await _BludContext.Mkegiatan.Where(w => w.Idkeg == Idkegs[i]).Select(s => new Mkegiatan
                        {
                            Idkeg = s.Idkeg,
                            Nukeg = s.Nukeg
                        }).FirstOrDefaultAsync();
                        string nukeg_induk = await _BludContext.Mkegiatan
                            .Where(w => w.Idprgrm == mpgrm.Idprgrm && w.Nukeg.Trim() == (subkeg.Nukeg.Substring(0, subkeg.Nukeg.Trim().Length - 3)) && w.Type.Trim() == "H")
                            .Select(s => s.Nukeg.Trim())
                            .FirstOrDefaultAsync();
                        if (String.IsNullOrEmpty(mpgrm.Idurus.ToString()))
                        {
                            kode_full = "0.00." + mpgrm.Nuprgrm.Trim() + "" + nukeg_induk;
                        } else
                        {
                            Dafturus dafturus = await _BludContext.Dafturus.Where(w => w.Idurus == mpgrm.Idurus).FirstOrDefaultAsync();
                            if (dafturus != null) kode_full = dafturus.Kdurus.Trim() + "" + mpgrm.Nuprgrm.Trim() + "" + nukeg_induk;
                        }

                    }
                    data.Add(await _BludContext.Mkegiatan.Where(w => w.Idkeg == Idkegs[i])
                    .Join(_BludContext.Sppdetr.Where(w => w.Idspp == Idspp && w.Idkeg == Idkegs[i]).Distinct(),
                    kegiatan => kegiatan.Idkeg,
                    sppdetr => sppdetr.Idkeg,
                    (kegiatan, sppdetr) => new SppdetrViewTreeRoot
                    {
                        Data = new SppdetrViewTreeData
                        {
                            Rowid = kegiatan.Idkeg.ToString(),
                            Idkeg = kegiatan.Idkeg,
                            kode = kode_full + "" + kegiatan.Nukeg.Trim(),
                            uraian = kegiatan.Nmkegunit.Trim(),
                            Level = "sub_kegiatan"
                        },
                        Children = _BludContext.Daftrekening
                            .Join(_BludContext.Sppdetr.Where(w => w.Idspp == Idspp && w.Idkeg == kegiatan.Idkeg),
                            rekening => rekening.Idrek,
                            sppdetr2 => sppdetr2.Idrek,
                            (rekening, sppdetr2) => new SppdetrViewTreeRoot
                            {
                                Data = new SppdetrViewTreeData
                                {
                                    Rowid = kegiatan.Idkeg + "_" + sppdetr2.Idsppdetr,
                                    Idnojetra = sppdetr2.Idnojetra,
                                    Idrek = rekening.Idrek,
                                    kode = rekening.Kdper.Trim(),
                                    uraian = rekening.Nmper.Trim(),
                                    Level = "rekening",
                                    Nilai = sppdetr2.Nilai,
                                    Idspp = sppdetr2.Idspp,
                                    Idsppdetr = sppdetr2.Idsppdetr
                                }
                            }).ToList()
                    }).FirstOrDefaultAsync());
                }
            }
            
            return data;
        }

        public async Task<bool> Update(Sppdetr param)
        {
            Sppdetr data = await _BludContext.Sppdetr.Where(w => w.Idsppdetr == param.Idsppdetr).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nilai = param.Nilai;
                data.Idjdana = param.Idjdana;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Sppdetr.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return true;
        }

        public async Task<bool> UpdateNilai(Sppdetr param)
        {
            Sppdetr data = await _BludContext.Sppdetr.Where(w => w.Idsppdetr == param.Idsppdetr).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nilai = param.Nilai;
                data.Idjdana = param.Idjdana;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                _BludContext.Sppdetr.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
