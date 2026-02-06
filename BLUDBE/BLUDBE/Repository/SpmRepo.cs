using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class SpmRepo : Repo<Spm>, ISpmRepo
    {
        public SpmRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<string> GenerateNoReg(long Idunit)
        {
            string newno = "";
            string lastno = await _BludContext.Spm.Where(w => w.Idunit == Idunit).OrderBy(o => o.Noreg.Trim()).Select(s => s.Noreg).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "00001";
            }
            else
            {
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

        public async Task<string> GenerateNoReg(long Idunit, long Idbend, int Idxkode, string Kdstatus)
        {
            string newno = "";
            /*string lastno = await _BludContext.Spm.Where(w => w.Idunit == Idunit && w.Idbend == Idbend && w.Idxkode == Idxkode && w.Kdstatus.Trim() == Kdstatus.Trim()).OrderBy(o => o.Noreg.Trim()).Select(s => s.Noreg).LastOrDefaultAsync();*/
            string lastno = await _BludContext.Spm.Where(w => w.Idunit == Idunit && w.Idxkode == Idxkode && w.Kdstatus.Trim() == Kdstatus.Trim()).OrderBy(o => o.Noreg.Trim()).Select(s => s.Noreg).LastOrDefaultAsync();
            if (string.IsNullOrEmpty(lastno))
            {
                newno = "00001";
            }
            else
            {
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

        public async Task<List<long>> GetIds(long Idunit, int Idxkode, string Kdstatus, long Idspp)
        {
            List<long> Ids = await _BludContext.Spm
                .Where(w => w.Idunit == Idunit && w.Idxkode == Idxkode && w.Kdstatus.Trim() == Kdstatus.Trim() && w.Idspp == Idspp)
                .Select(s => s.Idspp).ToListAsync();
            return Ids;
        }

        public async Task<bool> Update(Spm param)
        {
            Spm data = await _BludContext.Spm.Where(w => w.Idspm == param.Idspm).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Tglspm = param.Tglspm;
                data.Nospm = param.Nospm;
                data.Idbend = param.Idbend;
                data.Idspp = param.Idspp;
                data.Ketotor = param.Ketotor;
                data.Keperluan = param.Keperluan;
                data.Updatedate = param.Updatedate;
                data.Updateby = param.Updateby;
                //data.Updateby = User.Claims.FirstOrDefault().Value;
                data.Idphk3 = param.Idphk3;
                data.Idkontrak = param.Idkontrak;
                //data.Idskp = param.Idskp;
                _BludContext.Spm.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<bool> Pengesahan(Spm param)
        {
            Spm data = await _BludContext.Spm.Where(w => w.Idspm == param.Idspm).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglvalid = param.Tglvalid;
                data.Valid = param.Valid;
                data.Updateby = param.Updateby;
                data.Updatedate = param.Updatedate;
                data.Validby = param.Validby;
                data.Validasi = param.Validasi;
                _BludContext.Spm.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<Spm> ViewData(long Idspm)
        {
            Spm Result = await (
                from data in _BludContext.Spm
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp into sppMatch
                from spp_data in sppMatch.DefaultIfEmpty()
                join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                from kontrak_data in kontrakMatch.DefaultIfEmpty()
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match
                from phk3_data in phk3Match.DefaultIfEmpty()
                join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend into bendaharaMatch
                from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                //join skp in _BludContext.Skp on data.Idskp equals skp.Idskp into skpMatch
                //from skp_data in skpMatch.DefaultIfEmpty()
                where data.Idspm == Idspm
                select new Spm
                {
                    Createdate = data.Createdate,
                    Createby = data.Createby,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    Idunit = data.Idunit,
                    Idbend = data.Idbend,
                    Idkontrak = data.Idkontrak,
                    Idphk3 = data.Idphk3,
                    Idspm = data.Idspm,
                    Idspp = data.Idspp,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Keperluan = data.Keperluan,
                    Ketotor = data.Ketotor,
                    Noreg = data.Noreg,
                    Nilaiup = data.Nilaiup,
                    Nospm = data.Nospm,
                    Penolakan = data.Penolakan,
                    Tglvalid = data.Tglvalid,
                    Tglspp = data.Tglspp,
                    Tglspm = data.Tglspm,
                    Tglaprove = data.Tglaprove,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Approveby = data.Approveby,
                    Status = data.Status,
                    Verifikasi = data.Verifikasi,
                    IdsppNavigation = spp_data ?? null,
                    IdkontrakNavigation = kontrak_data ?? null,
                    Idphk3Navigation = phk3_data ?? null,
                    IdbendNavigation = bendahara_data ?? null,
                    Idkeg = data.Idkeg,
                    Validasi = data.Validasi,
                    //Idskp = data.Idskp,
                    //IdskpNavigation = skp_data ?? null
                }
                ).FirstOrDefaultAsync();
            if(Result != null)
            {
                if (Result.IdsppNavigation != null)
                {
                    if (!String.IsNullOrEmpty(Result.IdsppNavigation.Idkontrak.ToString()) || Result.IdsppNavigation.Idkontrak != 0)
                    {
                        Result.IdsppNavigation.IdkontrakNavigation = await _BludContext.Kontrak.Where(w => w.Idkontrak == Result.IdsppNavigation.Idkontrak).FirstOrDefaultAsync();
                    }
                    if (!String.IsNullOrEmpty(Result.IdsppNavigation.Idphk3.ToString()) || Result.IdsppNavigation.Idphk3 != 0)
                    {
                        Result.IdsppNavigation.Idphk3Navigation = await _BludContext.Daftphk3.Where(w => w.Idphk3 == Result.IdsppNavigation.Idphk3).FirstOrDefaultAsync();
                    }
                }
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

        public async Task<List<Spm>> ViewDatas(SpmGet param)
        {
            List<Spm> Result = new List<Spm>();
            IQueryable<Spm> query = (
                from data in _BludContext.Spm
                join spp in _BludContext.Spp on data.Idspp equals spp.Idspp into sppMatch from spp_data in sppMatch.DefaultIfEmpty()
                join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                from kontrak_data in kontrakMatch.DefaultIfEmpty()
                join phk3 in _BludContext.Daftphk3 on data.Idphk3 equals phk3.Idphk3 into phk3Match
                from phk3_data in phk3Match.DefaultIfEmpty()
                join bendahara in _BludContext.Bend on data.Idbend equals bendahara.Idbend into bendaharaMatch
                from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                //join skp in _BludContext.Skp on data.Idskp equals skp.Idskp into skpMatch from skp_data in skpMatch.DefaultIfEmpty()
                select new Spm {
                    Createdate = data.Createdate,
                    Createby = data.Createby,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    Idunit = data.Idunit,
                    Idbend = data.Idbend,
                    Idkontrak = data.Idkontrak,
                    Idphk3 = data.Idphk3,
                    Idspm = data.Idspm,
                    Idspp = data.Idspp,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Keperluan = data.Keperluan,
                    Ketotor = data.Ketotor,
                    Noreg = data.Noreg,
                    Nilaiup = data.Nilaiup,
                    Nospm = data.Nospm,
                    Penolakan = data.Penolakan,
                    Tglvalid = data.Tglvalid,
                    Tglspp = data.Tglspp,
                    Tglspm = data.Tglspm,
                    Tglaprove = data.Tglaprove,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Approveby = data.Approveby,
                    Status = data.Status,
                    Verifikasi = data.Verifikasi,
                    IdsppNavigation = spp_data ?? null,
                    IdkontrakNavigation = kontrak_data ?? null,
                    Idphk3Navigation = phk3_data ?? null,
                    IdbendNavigation = bendahara_data ?? null,
                    Idkeg = data.Idkeg,
                    Validasi = data.Validasi,
                    //Idskp = data.Idskp,
                    //IdskpNavigation = skp_data ?? null
                }
                ).AsQueryable();
            if(param.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Idunit).AsQueryable();
            }
            if(param.Kdstatus.Trim() != "x")
            {
                query = query.Where(w => w.Kdstatus.Trim() == param.Kdstatus.Trim()).AsQueryable();
            }
            if (param.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Idxkode).AsQueryable();
            }
            if (param.Idbend.ToString() != "0")
            {
                query = query.Where(w => w.Idbend == param.Idbend).AsQueryable();
            }
            if(param.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Idkeg).AsQueryable();
            }
            query = query.OrderBy(o => o.Nospm);
            Result = await query.ToListAsync();
            if (Result.Count() > 0)
            {
                foreach (var f in Result)
                {
                    if (f.IdsppNavigation != null)
                    {
                        if (!String.IsNullOrEmpty(f.IdsppNavigation.Idkontrak.ToString()) || f.IdsppNavigation.Idkontrak != 0)
                        {
                            f.IdsppNavigation.IdkontrakNavigation = await _BludContext.Kontrak.Where(w => w.Idkontrak == f.IdsppNavigation.Idkontrak).FirstOrDefaultAsync();
                        }
                        if (!String.IsNullOrEmpty(f.IdsppNavigation.Idphk3.ToString()) || f.IdsppNavigation.Idphk3 != 0)
                        {
                            f.IdsppNavigation.Idphk3Navigation = await _BludContext.Daftphk3.Where(w => w.Idphk3 == f.IdsppNavigation.Idphk3).FirstOrDefaultAsync();
                        }
                    }
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

        public async Task<bool> Penolakan(Spm param)
        {
            Spm data = await _BludContext.Spm.Where(w => w.Idspm == param.Idspm).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglaprove = param.Tglaprove;
                data.Status = param.Status;
                data.Updateby = param.Updateby;
                data.Updatedate = param.Updatedate;
                data.Verifikasi = param.Verifikasi;
                _BludContext.Spm.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<List<DataTracking>> TrackingData(long Idspm)
        {
            List<DataTracking> Result = new List<DataTracking>();
            Result.Add(new DataTracking
            {
                Title = "SPP",
                Active = 0,
                Canenter = false,
                Desc = "SPP Sudah Disahkan Dan Belum Diverifikasi",
                Done = 3
            });
            Spm spm = null;
            Sp2d sp2d = null;
            Bkuk bkuk = null;
            spm = await _BludContext.Spm.Where(w => w.Idspm == Idspm).FirstOrDefaultAsync();
            if (spm != null)
            {
                sp2d = await _BludContext.Sp2d.Where(w => w.Idspm == spm.Idspm).FirstOrDefaultAsync();
            }
            if (sp2d != null)
            {
                bkuk = await _BludContext.Bkuk.Where(w => w.Idsp2d == sp2d.Idsp2d).FirstOrDefaultAsync();
            }
            if (spm != null)
            {
                DataTracking temp = new DataTracking
                {
                    Title = "SOPD",
                    Active = sp2d != null ? 0 : 1,
                    Canenter = sp2d != null ? false : true,
                    Desc = "SOPD Dalam Tahap Pengajuan",
                    Done = 2
                };
                if (!String.IsNullOrEmpty(spm.Status.ToString()))
                {
                    if (spm.Status == true)
                    {
                        temp.Desc = "SOPD Sudah Disahkan Dan Diverifikasi";
                    }
                    else
                    {
                        temp.Desc = "SOPD Sudah Disahkan Dan Belum Diverifikasi";
                    }
                    temp.Done = 3;
                }
                else
                {
                    if (!String.IsNullOrEmpty(spm.Valid.ToString()))
                    {
                        if (spm.Valid == true)
                        {
                            temp.Desc = "SOPD Sudah Disahkan";
                        }
                        else
                        {
                            temp.Desc = "SOPD Belum Disahkan";
                        }
                    }
                    temp.Done = 2;
                }
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
                    Done = 2,
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

        public async Task<PrimengTableResult<Spm>> Paging(PrimengTableParam<SpmGet> param)
        {
            PrimengTableResult<Spm> Result = new PrimengTableResult<Spm>();
            List<long?> idSpms = new List<long?>();
            if (param.Parameters.NoSpmExist)
            {
                idSpms = await _BludContext.Sp2d
                    .Where(w => w.Idunit == param.Parameters.Idunit && w.Kdstatus.Trim() == param.Parameters.Kdstatus.Trim() && w.Idxkode == param.Parameters.Idxkode)
                    .Select(s => s.Idspm).ToListAsync();
            }
            var query = (
                from data in _BludContext.Spm.AsNoTracking()
                join spp in _BludContext.Spp.AsNoTracking() on data.Idspp equals spp.Idspp into sppMatch
                from spp_data in sppMatch.DefaultIfEmpty()
                join kontrak in _BludContext.Kontrak.AsNoTracking() on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                from kontrak_data in kontrakMatch.DefaultIfEmpty()
                join phk3 in _BludContext.Daftphk3.AsNoTracking() on data.Idphk3 equals phk3.Idphk3 into phk3Match
                from phk3_data in phk3Match.DefaultIfEmpty()
                join bendahara in _BludContext.Bend.AsNoTracking() on data.Idbend equals bendahara.Idbend into bendaharaMatch
                from bendahara_data in bendaharaMatch.DefaultIfEmpty()
                select new Spm
                {
                    Createdate = data.Createdate,
                    Createby = data.Createby,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate,
                    Idunit = data.Idunit,
                    Idbend = data.Idbend,
                    Idkontrak = data.Idkontrak,
                    Idphk3 = data.Idphk3,
                    Idspm = data.Idspm,
                    Idspp = data.Idspp,
                    Idxkode = data.Idxkode,
                    Kdstatus = data.Kdstatus,
                    Keperluan = data.Keperluan,
                    Ketotor = data.Ketotor,
                    Noreg = data.Noreg,
                    Nilaiup = data.Nilaiup,
                    Nospm = data.Nospm,
                    Penolakan = data.Penolakan,
                    Tglvalid = data.Tglvalid,
                    Tglspp = data.Tglspp,
                    Tglspm = data.Tglspm,
                    Tglaprove = data.Tglaprove,
                    Validby = data.Validby,
                    Valid = data.Valid,
                    Approveby = data.Approveby,
                    Status = data.Status,
                    Verifikasi = data.Verifikasi,
                    IdsppNavigation = spp_data ?? null,
                    IdkontrakNavigation = kontrak_data ?? null,
                    Idphk3Navigation = phk3_data ?? null,
                    IdbendNavigation = bendahara_data ?? null,
                    Idkeg = data.Idkeg,
                    Validasi = data.Validasi
                });
            query = query.OrderBy(o => o.Nospm);
            if (param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit);
            }
            if (param.Parameters.Kdstatus.Trim() != "x")
            {
                query = query.Where(w => w.Kdstatus.Trim() == param.Parameters.Kdstatus.Trim());
            }
            /*if (param.Parameters.Idxkode.ToString() != "0")
            {
                query = query.Where(w => w.Idxkode == param.Parameters.Idxkode);
            }*/
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
                    EF.Functions.Like(w.Nospm.Trim(), "%" + param.GlobalFilter + "%") ||
                     EF.Functions.Like(w.Keperluan.Trim(), "%" + param.GlobalFilter + "%")
                );
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nospm")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nospm);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nospm);
                    }
                }
                else if (param.SortField == "tglspm")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglspm);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglspm);
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
            if (idSpms.Count() > 0)
            {
                query = query.Where(w => !idSpms.Contains(w.Idspm));
            }
            Result.Totalrecords = await query.CountAsync();
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            if (Result.Data.Count() > 0)
            {
                foreach (var f in Result.Data)
                {
                    if (f.IdsppNavigation != null)
                    {
                        if (!String.IsNullOrEmpty(f.IdsppNavigation.Idkontrak.ToString()) || f.IdsppNavigation.Idkontrak != 0)
                        {
                            f.IdsppNavigation.IdkontrakNavigation = await _BludContext.Kontrak.Where(w => w.Idkontrak == f.IdsppNavigation.Idkontrak).FirstOrDefaultAsync();
                        }
                        if (!String.IsNullOrEmpty(f.IdsppNavigation.Idphk3.ToString()) || f.IdsppNavigation.Idphk3 != 0)
                        {
                            f.IdsppNavigation.Idphk3Navigation = await _BludContext.Daftphk3.Where(w => w.Idphk3 == f.IdsppNavigation.Idphk3).FirstOrDefaultAsync();
                        }
                    }
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
    }
}
