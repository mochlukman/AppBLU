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
    public class SppRepo : Repo<Spp>, ISppRepo
    {
        public SppRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<string> GenerateNoReg(long Idunit)
        {
            string newno = "";
            string lastno = await _BludContext.Spp.Where(w => w.Idunit == Idunit).OrderBy(o => o.Noreg.Trim()).Select(s => s.Noreg).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "00001";
            } else {
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

        public async Task<List<long>> GetIds(long Idunit, int Idxkode, string Kdstatus)
        {
            List<long> Ids = await _BludContext.Spp
                .Where(w => w.Idunit == Idunit && w.Idxkode == Idxkode && w.Kdstatus.Trim() == Kdstatus.Trim())
                .Select(s => s.Idspp).ToListAsync();
            return Ids;
        }

        public async Task<bool> Update(Spp param)
        {
            Spp data = await _BludContext.Spp.Where(w => w.Idspp == param.Idspp).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Nospp = param.Nospp;
                data.Tglspp = param.Tglspp;
                data.Idbulan = param.Idbulan;
                data.Ketotor = param.Ketotor;
                data.Keperluan = param.Keperluan;
                data.Noreg = param.Noreg;
                data.Idkontrak = param.Idkontrak;
                data.Idphk3 = param.Idphk3;
                data.Nilaiup = param.Nilaiup;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                data.Idbend = param.Idbend;
                _BludContext.Spp.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<bool> Pengesahan(Spp param)
        {
            Spp data = await _BludContext.Spp.Where(w => w.Idspp == param.Idspp).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglvalid = param.Tglvalid;
                data.Valid = param.Valid;
                data.Validby = param.Validby;
                data.Updateby = param.Updateby;
                data.Updatedate = param.Updatedate;
                data.Validasi = param.Validasi;
                _BludContext.Spp.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
        public async Task<bool> Penolakan(Spp param)
        {
            Spp data = await _BludContext.Spp.Where(w => w.Idspp == param.Idspp).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglaprove = param.Tglaprove;
                data.Status = param.Status;
                data.Approveby = param.Approveby;
                data.Verifikasi = param.Verifikasi;
                data.Updateby = param.Updateby;
                data.Updatedate = param.Updatedate;
                _BludContext.Spp.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<Spp> ViewData(long Idspp)
        {
            Spp Result = await (
                    from data in _BludContext.Spp
                    join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                    from kontrak_data in kontrakMatch.DefaultIfEmpty()
                    join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match
                    from phk3_data in phk3Match.DefaultIfEmpty()
                    join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend into bendaharaMatch
                    from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                    join bulan in _BludContext.Bulan on data.Idbulan equals bulan.Idbulan into bulanMatch from bulan_data in bulanMatch.DefaultIfEmpty()
                    where data.Idspp == Idspp
                    select new Spp
                    {
                        Idbend = data.Idbend,
                        Idbulan = data.Idbulan,
                        Idkontrak = data.Idkontrak,
                        Idphk3 = data.Idphk3,
                        Idspp = data.Idspp,
                        Idunit = data.Idunit,
                        Idxkode = data.Idxkode,
                        Kdstatus = data.Kdstatus,
                        Keperluan = data.Keperluan,
                        Ketotor = data.Ketotor,
                        Nilaiup = data.Nilaiup,
                        Noreg = data.Noreg,
                        Nospp = data.Nospp,
                        Penolakan = data.Penolakan,
                        Status = data.Status,
                        Tglspp = data.Tglspp,
                        Valid = data.Valid,
                        Verifikasi = data.Verifikasi,
                        Tglvalid = data.Tglvalid,
                        IdkontrakNavigation = kontrak_data ?? null,
                        Idphk3Navigation = phk3_data ?? null,
                        IdbendNavigation = bendahara_data ?? null,
                        IdbulanNavigation = bulan_data ?? null,
                        Createby = data.Createby,
                        Createdate = data.Createdate,
                        Updateby = data.Updateby,
                        Updatedate = data.Updatedate,
                        Validby = data.Validby,
                        Approveby = data.Approveby,
                        Tglaprove = data.Tglaprove,
                        Idkeg = data.Idkeg,
                        Validasi = data.Validasi
                    }
                ).FirstOrDefaultAsync();
            if (Result != null)
            {
                if (Result.IdbendNavigation != null)
                {
                    Result.IdbendNavigation.IdpegNavigation = await _BludContext.Pegawai.Where(w => w.Idpeg == Result.IdbendNavigation.Idpeg).FirstOrDefaultAsync();
                    if (!String.IsNullOrEmpty(Result.IdbendNavigation.Jnsbend))
                    {
                        Result.IdbendNavigation.JnsbendNavigation = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == Result.IdbendNavigation.Jnsbend.Trim()).FirstOrDefaultAsync();
                    }
                }
            }
            return Result;
        }

        public async Task<List<Spp>> ViewDatas(SppGet param)
        {
            List<Spp> Result = new List<Spp>();
            IQueryable<Spp> query = (
                    from data in _BludContext.Spp
                    join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch from kontrak_data in kontrakMatch.DefaultIfEmpty()
                    join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match from phk3_data in phk3Match.DefaultIfEmpty()
                    join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend into bendaharaMatch from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                    join bulan in _BludContext.Bulan on data.Idbulan equals bulan.Idbulan into bulanMatch
                    from bulan_data in bulanMatch.DefaultIfEmpty()
                    select new Spp
                    {
                        Idbend = data.Idbend,
                        Idbulan = data.Idbulan,
                        Idkontrak = data.Idkontrak,
                        Idphk3 = data.Idphk3,
                        Idspp = data.Idspp,
                        Idunit = data.Idunit,
                        Idxkode = data.Idxkode,
                        Kdstatus = data.Kdstatus,
                        Keperluan = data.Keperluan,
                        Ketotor = data.Ketotor,
                        Nilaiup = data.Nilaiup,
                        Noreg = data.Noreg,
                        Nospp = data.Nospp,
                        Penolakan = data.Penolakan,
                        Status = data.Status,
                        Tglspp = data.Tglspp,
                        Valid = data.Valid,
                        Verifikasi = data.Verifikasi,
                        Tglvalid = data.Tglvalid,
                        IdkontrakNavigation = kontrak_data ?? null,
                        Idphk3Navigation = phk3_data ?? null,
                        IdbendNavigation = bendahara_data ?? null,
                        IdbulanNavigation = bulan_data ?? null,
                        Createby = data.Createby,
                        Createdate = data.Createdate,
                        Updateby = data.Updateby,
                        Updatedate = data.Updatedate,
                        Validby = data.Validby,
                        Approveby = data.Approveby,
                        Tglaprove = data.Tglaprove,
                        Idkeg = data.Idkeg,
                        Validasi = data.Validasi
                    }
                ).AsQueryable();
            if(param.Kdstatus != "x")
            {
                query = query.Where(w => w.Kdstatus.Trim() == param.Kdstatus.Trim()).AsQueryable();
            }
            if(param.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Idxkode).AsQueryable();
            }
            if(param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if(param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            if (param.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Idkeg).AsQueryable();
            }
            Result.AddRange(await query.ToListAsync());
            if(Result.Count() > 0)
            {
                foreach(var f in Result)
                {
                    if(f.IdbendNavigation !=  null)
                    {
                        f.IdbendNavigation.IdpegNavigation = await _BludContext.Pegawai.Where(w => w.Idpeg == f.IdbendNavigation.Idpeg).FirstOrDefaultAsync();
                        if (!String.IsNullOrEmpty(f.IdbendNavigation.Jnsbend))
                        {
                            f.IdbendNavigation.JnsbendNavigation = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == f.IdbendNavigation.Jnsbend.Trim()).FirstOrDefaultAsync();
                        }
                    }
                }
            }
            return Result;
        }
        public async Task<PrimengTableResult<Spp>> Paging(PrimengTableParam<SppGet> param)
        {
            PrimengTableResult<Spp> Result = new PrimengTableResult<Spp>();
            List<long> idSpps = new List<long>();
            if (param.Parameters.NoSppExist)
            {
                idSpps = await _BludContext.Spm
                    .Where(w => w.Idunit == param.Parameters.Idunit && w.Kdstatus.Trim() == param.Parameters.Kdstatus.Trim() && w.Idxkode == param.Parameters.Idxkode)
                    .Select(s => s.Idspp).ToListAsync();
            }
            var query = (
                    from data in _BludContext.Spp.AsNoTracking()
                    join kontrak in _BludContext.Kontrak.AsNoTracking() on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                    from kontrak_data in kontrakMatch.DefaultIfEmpty()
                    join phk3 in _BludContext.Daftphk3.AsNoTracking() on data.Idphk3 equals phk3.Idphk3 into phk3Match
                    from phk3_data in phk3Match.DefaultIfEmpty()
                    join bendahara in _BludContext.Bend.AsNoTracking() on data.Idbend equals bendahara.Idbend into bendaharaMatch
                    from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                    join bulan in _BludContext.Bulan.AsNoTracking() on data.Idbulan equals bulan.Idbulan into bulanMatch
                    from bulan_data in bulanMatch.DefaultIfEmpty()
                    select new Spp
                    {
                        Idbend = data.Idbend,
                        Idbulan = data.Idbulan,
                        Idkontrak = data.Idkontrak,
                        Idphk3 = data.Idphk3,
                        Idspp = data.Idspp,
                        Idunit = data.Idunit,
                        Idxkode = data.Idxkode,
                        Kdstatus = data.Kdstatus,
                        Keperluan = data.Keperluan,
                        Ketotor = data.Ketotor,
                        Nilaiup = data.Nilaiup,
                        Noreg = data.Noreg,
                        Nospp = data.Nospp,
                        Penolakan = data.Penolakan,
                        Status = data.Status,
                        Tglspp = data.Tglspp,
                        Valid = data.Valid,
                        Verifikasi = data.Verifikasi,
                        Tglvalid = data.Tglvalid,
                        IdkontrakNavigation = kontrak_data ?? null,
                        Idphk3Navigation = phk3_data ?? null,
                        IdbendNavigation = bendahara_data ?? null,
                        IdbulanNavigation = bulan_data ?? null,
                        Createby = data.Createby,
                        Createdate = data.Createdate,
                        Updateby = data.Updateby,
                        Updatedate = data.Updatedate,
                        Validby = data.Validby,
                        Approveby = data.Approveby,
                        Tglaprove = data.Tglaprove,
                        Idkeg = data.Idkeg,
                        Validasi = data.Validasi
                    }
                );
            if (param.Parameters.Kdstatus != "x")
            {
                query = query.Where(w => w.Kdstatus.Trim() == param.Parameters.Kdstatus.Trim());
            }
            /*if (param.Parameters.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Parameters.Idxkode);
            }*/
            if (param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit);
            }
            if (param.Parameters.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Parameters.Idbend);
            }
            if (param.Parameters.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Parameters.Idkeg);
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nospp.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Noreg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Keperluan.Trim(), "%" + param.GlobalFilter + "%")
                );
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nospp")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nospp);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nospp);
                    }
                }
                else if (param.SortField == "tglspp")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglspp);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglspp);
                    }
                }
                else if (param.SortField == "noreg")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Noreg);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Noreg);
                    }
                }
                else if (param.SortField == "keperluan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Keperluan);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Keperluan);
                    }
                }
                else if (param.SortField == "valid")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Valid);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Valid);
                    }
                }
                else if (param.SortField == "status")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Status);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Status);
                    }
                }
            }
            if (idSpps.Count() > 0)
            {
                query = query.Where(w => !idSpps.Contains(w.Idspp));
            }
            query = query.OrderBy(o => o.Nospp);
            Result.Totalrecords = await query.CountAsync();
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            if (Result.Data.Count() > 0)
            {
                foreach (var f in Result.Data)
                {
                    if (f.IdbendNavigation != null)
                    {
                        f.IdbendNavigation.IdpegNavigation = await _BludContext.Pegawai.Where(w => w.Idpeg == f.IdbendNavigation.Idpeg).FirstOrDefaultAsync();
                        if (!String.IsNullOrEmpty(f.IdbendNavigation.Jnsbend))
                        {
                            f.IdbendNavigation.JnsbendNavigation = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == f.IdbendNavigation.Jnsbend.Trim()).FirstOrDefaultAsync();
                        }
                    }
                }
            }
            return Result;
        }
        public async Task<List<DataTracking>> TrackingData(long Idspp)
        {
            List<DataTracking> Result = new List<DataTracking>();
            Spp spp = new Spp();
            Spm spm = null;
            Sp2d sp2d = null;
            Bkuk bkuk = null;
            spp = await _BludContext.Spp.Where(w => w.Idspp == Idspp).FirstOrDefaultAsync();
            if(spp != null)
            {
                spm = await _BludContext.Spm.Where(w => w.Idspp == spp.Idspp).FirstOrDefaultAsync();
            }
            if(spm != null)
            {
                sp2d = await _BludContext.Sp2d.Where(w => w.Idspm == spm.Idspm).FirstOrDefaultAsync();
            }
            if(sp2d != null)
            {
                bkuk = await _BludContext.Bkuk.Where(w => w.Idsp2d == sp2d.Idsp2d).FirstOrDefaultAsync();
            }
            if(spp != null)
            {
                DataTracking temp = new DataTracking
                {
                    Title = "S-PPD",
                    Active = spm != null ? 0 : 1,
                    Canenter = spm != null ? false : true,
                    Desc = "S-PPD Dalam Tahap Pengajuan",
                    Done = 2
                };
                if (!String.IsNullOrEmpty(spp.Status.ToString()))
                {
                    if (spp.Status == true)
                    {
                        temp.Desc = "S-PPD Sudah Disahkan Dan Diverifikasi";
                    } else
                    {
                        temp.Desc = "S-PPD Sudah Disahkan Dan Belum Diverifikasi";
                    }
                    temp.Done = 3;
                } else
                {
                    if (!String.IsNullOrEmpty(spp.Valid.ToString()))
                    {
                        if (spp.Valid == true)
                        {
                            temp.Desc = "S-PPD Sudah Disahkan";
                        }
                        else
                        {
                            temp.Desc = "S-PPD Belum Disahkan";
                        }
                        temp.Done = 2;
                    }
                }
                Result.Add(temp);
            }
            if(spm != null)
            {
                DataTracking temp = new DataTracking
                {
                    Title = "S-OPD",
                    Active = sp2d != null ? 0 : 1,
                    Canenter = sp2d != null ? false : true,
                    Desc = "S-OPD Dalam Tahap Pengajuan",
                    Done = 2
                };
                if (!String.IsNullOrEmpty(spm.Status.ToString()))
                {
                    if (spm.Status == true)
                    {
                        temp.Desc = "S-OPD Sudah Disahkan Dan Diverifikasi";
                    } else
                    {
                        temp.Desc = "S-OPD Sudah Disahkan Dan Belum Diverifikasi";
                    }
                    temp.Done = 3;
                } else
                {
                    if (!String.IsNullOrEmpty(spm.Valid.ToString()))
                    {
                        if (spm.Valid == true)
                        {
                            temp.Desc = "S-OPD Sudah Disahkan";
                        } else
                        {
                            temp.Desc = "S-OPD Belum Disahkan";
                        }
                    }
                    temp.Done = 2;
                }
                Result.Add(temp);
            } else
            {
                DataTracking temp = new DataTracking
                {
                    Title = "S-OPD",
                    Active = 0,
                    Canenter = false,
                    Desc = "S-OPD Belum Diajukan",
                    Done = 1
                };
                Result.Add(temp);
            }
            if (sp2d != null)
            {
                DataTracking temp = new DataTracking
                {
                    Title = "SPD",
                    Active = bkuk != null ? 0 : 1,
                    Canenter = bkuk != null ? false : true,
                    Desc = "SPD Dalam Tahap Pengajuan",
                    Done = 2
                };
                if (!String.IsNullOrEmpty(sp2d.Tglvalid.ToString()))
                {
                    temp.Desc = "SPD Sudah Disahkan Dan Diverifikasi";
                    temp.Done = 3;
                }
                Result.Add(temp);
            }
            else
            {
                DataTracking temp = new DataTracking
                {
                    Title = "SPD",
                    Active = 0,
                    Canenter = false,
                    Desc = "SPD Belum Diajukan",
                    Done = 1
                };
                Result.Add(temp);
            }
            if (bkuk != null)
            {
                DataTracking temp = new DataTracking
                {
                    Title = "CAIR",
                    Active = !String.IsNullOrEmpty(bkuk.Tglvalid.ToString()) ? 1 : 0,
                    Canenter = !String.IsNullOrEmpty(bkuk.Tglvalid.ToString()) ? true : false,
                    Desc = "SPD Belum Cair",
                    Done = 2
                };
                if (!String.IsNullOrEmpty(bkuk.Tglvalid.ToString()))
                {
                    temp.Desc = "SPD Sudah Cair";
                    temp.Done = 3;
                }
                Result.Add(temp);
            }
            else
            {
                DataTracking temp = new DataTracking
                {
                    Title = "CAIR",
                    Active = 0,
                    Canenter = false,
                    Desc = "Pencairan Belum Diajukan",
                    Done = 1
                };
                Result.Add(temp);
            }

            return Result;
        }
    }
}
