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
    public class KegunitRepo : Repo<Kegunit>, IKegunitRepo
    {
        public KegunitRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<long>> IdskegByUnit(long Idunit)
        {
            List<long> Idpgrmunit = await _BludContext.Pgrmunit.Where(w => w.Idunit == Idunit).Select(s => s.Idpgrmunit).ToListAsync();
            List<long> data = await _BludContext.Kegunit.Where(w => Idpgrmunit.Contains(w.Idpgrmunit)).Select(s => s.Idkeg).ToListAsync();
            return data;
        }

        public async Task<PrimengTableResult<KegunitView>> Paging(PrimengTableParam<KegunitGet> param)
        {
            PrimengTableResult<KegunitView> Result = new PrimengTableResult<KegunitView>();
            IQueryable<KegunitView> query = (
                from data in _BludContext.Kegunit
                join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                join sifatkeg in _BludContext.Sifatkeg on data.Idsifatkeg equals sifatkeg.Idsifatkeg
                select new KegunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idkeg = data.Idkeg,
                    Idpeg = data.Idpeg,
                    Idkegunit = data.Idkegunit,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprioda = data.Idprioda,
                    Idsas = data.Idsas,
                    Pagumin1 = data.Pagumin1,
                    Pagupls1 = data.Pagupls1,
                    Idsifatkeg = data.Idsifatkeg,
                    Ketkeg = data.Ketkeg,
                    Lokasi = data.Lokasi,
                    Nmkegunit = mkeg != null ? mkeg.Nmkegunit : "",
                    Noprior = data.Noprior,
                    Nukeg = mkeg != null ? mkeg.Nukeg : "",
                    Pagu = data.Pagu,
                    Paguplus = data.Paguplus,
                    Pagutif = data.Pagutif,
                    Sasaran = data.Sasaran,
                    Satuan = data.Satuan,
                    Target = data.Target,
                    Targetp = data.Targetp,
                    Targetif = data.Targetif,
                    Targetsen = data.Targetsen,
                    Tglakhir = data.Tglakhir,
                    Tglawal = data.Tglawal,
                    Tglvalid = data.Tglvalid,
                    Volume = data.Volume,
                    Volume1 = data.Volume1,
                    IdsifatkegNavigation = sifatkeg ?? null,
                    IdkegNavigation = mkeg ?? null,
                    Kegunitx = !String.IsNullOrEmpty(data.Idkegunitx.ToString()) ? _BludContext.Kegunit.Where(w => w.Idkegunit == data.Idkegunitx).FirstOrDefault() : null,
                    Idkegunitx = data.Idkegunitx
                }
                ).AsQueryable();
            if(param.Parameters != null)
            {
                if(param.Parameters.Idpgrmunit.ToString() != "0")
                {
                    query = query.Where(w => w.Idpgrmunit == param.Parameters.Idpgrmunit).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nukeg")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nukeg).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nukeg).AsQueryable();
                    }
                }
                else if (param.SortField == "nmkegunit")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nmkegunit).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nmkegunit).AsQueryable();
                    }
                }
                else if (param.SortField == "lokasi")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Lokasi).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Lokasi).AsQueryable();
                    }
                }
                else if (param.SortField == "sasaran")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Sasaran).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Sasaran).AsQueryable();
                    }
                }
            }
            if (param.GlobalFilter != null)
            {
                query = query.Where(w => EF.Functions.Like(w.Nukeg.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nmkegunit.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Lokasi.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Sasaran.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Satuan.Trim(), "%" + param.GlobalFilter + "%")).AsQueryable();
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).OrderBy(o => o.Nukeg).ToListAsync();
            if(Result.Data.Count() > 0)
            {
                for(var i = 0; i < Result.Data.Count(); i++)
                {
                    if(Result.Data[i].IdkegNavigation.Type.Trim() == "H")
                    {
                        List<long> IdkegChild = await _BludContext.Mkegiatan.Where(w => w.Idkeginduk == Result.Data[i].Idkeg).Select(s => s.Idkeg).ToListAsync();
                        if(IdkegChild.Count() > 0)
                        {
                            Result.Data[i].Pagu = await _BludContext.Kegunit.Where(w => IdkegChild.Contains(w.Idkeg) && w.Idpgrmunit == Result.Data[i].Idpgrmunit).SumAsync(s => s.Pagu);
                        } else
                        {
                            Result.Data[i].Pagu = 0;
                        }
                    }
                    //if (Result.Data[i].Kegunitx != null)
                    //{
                    //    List<long> IdkegChild = await _BludContext.Mkegiatan.Where(w => w.Idkeginduk == Result.Data[i].Kegunitx.Idkeg).Select(s => s.Idkeg).ToListAsync();
                    //    if (IdkegChild.Count() > 0)
                    //    {
                    //        Result.Data[i].Kegunitx.Pagu = await _BludContext.Kegunit.Where(w => IdkegChild.Contains(w.Idkeg) && w.Idpgrmunit == Result.Data[i].Kegunitx.Idpgrmunit).SumAsync(s => s.Pagu);
                    //    }
                    //    else
                    //    {
                    //        Result.Data[i].Kegunitx.Pagu = 0;
                    //    }
                    //}
                }
            }
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<List<LookupTree>> Tree(long Idunit, string kdtahap, string type)
        {
            string tahap = kdtahap.Trim() != "x" ? kdtahap : "321";
            List<LookupTree> model = new List<LookupTree> { };
            //ambil Non Urusan START
            LookupTree temp_non_urusan = new LookupTree
            {
                label = "00. - Non Urusan",
                expandedIcon = "fa fa-folder-open",
                collapsedIcon = "fa fa-folder",
                data_id = 0,
                this_header = true,
                this_level = "Non Urusan",
            };

            // versi baru
            List<long> idpgrm_non_urusan = await _BludContext.Mpgrm.Where(w => w.Idurus == null).Select(s => s.Idprgrm).ToListAsync();
            temp_non_urusan.children = await (
                from pgrmunit in _BludContext.Pgrmunit
                join mpgrm in _BludContext.Mpgrm on pgrmunit.Idprgrm equals mpgrm.Idprgrm
                where idpgrm_non_urusan.Contains(pgrmunit.Idprgrm) && pgrmunit.Kdtahap.Trim() == tahap && pgrmunit.Idunit == Idunit
                select new LookupTree
                {
                    label = "00." + mpgrm.Nuprgrm.Trim() + " - " + mpgrm.Nmprgrm.Trim(),
                    data_kode = mpgrm.Nuprgrm.Trim(),
                    data_nama = mpgrm.Nmprgrm.Trim(),
                    expandedIcon = "fa fa-folder-open",
                    collapsedIcon = "fa fa-folder",
                    data_id = pgrmunit.Idpgrmunit,
                    data_id_parent = 0,
                    this_header = true,
                    this_level = "program",
                    children = (
                        from kegunit in _BludContext.Kegunit
                        join mkegiatan in _BludContext.Mkegiatan on kegunit.Idkeg equals mkegiatan.Idkeg
                        where kegunit.Idpgrmunit == pgrmunit.Idpgrmunit && mkegiatan.Idkeginduk == 0 && mkegiatan.Type.Trim() == "H" && mkegiatan.Levelkeg == 1
                        select new LookupTree
                        {
                            label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkegiatan.Nukeg.Trim() + " - " + mkegiatan.Nmkegunit.Trim(),
                            expandedIcon = "fa fa-folder-open",
                            collapsedIcon = "fa fa-folder",
                            data_kode = mkegiatan.Nukeg.Trim(),
                            data_nama = mkegiatan.Nmkegunit.Trim(),
                            data_id = kegunit.Idkeg,
                            data_id_parent = pgrmunit.Idpgrmunit,
                            this_header = type == "kegiatan" ? false : true,
                            this_level = "kegiatan",
                            children = type == "kegiatan" ? null :
                            (
                               from subkegunit in _BludContext.Kegunit
                               join submkegiatan in _BludContext.Mkegiatan on subkegunit.Idkeg equals submkegiatan.Idkeg
                               where subkegunit.Idpgrmunit == pgrmunit.Idpgrmunit && submkegiatan.Idkeginduk == mkegiatan.Idkeg && submkegiatan.Type.Trim() == "D" && submkegiatan.Levelkeg == 2
                               select new LookupTree
                               {
                                   label = "00." + mpgrm.Nuprgrm.Trim() + "" + submkegiatan.Nukeg.Trim() + " - " + submkegiatan.Nmkegunit.Trim(),
                                   expandedIcon = "fa fa-folder-open",
                                   collapsedIcon = "fa fa-folder",
                                   data_kode = submkegiatan.Nukeg.Trim(),
                                   data_nama = submkegiatan.Nmkegunit.Trim(),
                                   data_id = subkegunit.Idkegunit,
                                   data_id_parent = pgrmunit.Idpgrmunit,
                                   this_header = false,
                                   this_level = "sub_kegiatan",
                                   idkegFK = subkegunit.Idkeg
                               }
                            ).ToList()
                        }
                    ).ToList()
                }
            ).ToListAsync();
            model.Add(temp_non_urusan);

            //ambil Non Urusan END

            //ambil urusan by kdunit START
            Daftunit daftunit = await _BludContext.Daftunit
                .Where(w => w.Idunit == Idunit).FirstOrDefaultAsync();
            if(daftunit != null)
            {
                Dafturus dafturus = await _BludContext.Dafturus.Where(w => w.Idurus == daftunit.Idurus).FirstOrDefaultAsync();
                if(dafturus != null)
                {
                    LookupTree temp_urusan = new LookupTree
                    {
                        label = dafturus.Kdurus.Trim() + " - " + dafturus.Nmurus.Trim(),
                        expandedIcon = "fa fa-folder-open",
                        collapsedIcon = "fa fa-folder",
                        data_id = dafturus.Idurus,
                        this_header = true,
                        this_level = "Urusan",
                    };

                    //versi baru
                    List<long> idpgrm_urusan = await _BludContext.Mpgrm.Where(w => w.Idurus == dafturus.Idurus).Select(s => s.Idprgrm).ToListAsync();
                    temp_urusan.children = await (
                        from pgrmunit in _BludContext.Pgrmunit
                        join mpgrm in _BludContext.Mpgrm on pgrmunit.Idprgrm equals mpgrm.Idprgrm
                        where idpgrm_urusan.Contains(pgrmunit.Idprgrm) && pgrmunit.Kdtahap.Trim() == tahap && pgrmunit.Idunit == Idunit
                        select new LookupTree
                        {
                            label = "00." + mpgrm.Nuprgrm.Trim() + " - " + mpgrm.Nmprgrm.Trim(),
                            data_kode = mpgrm.Nuprgrm.Trim(),
                            data_nama = mpgrm.Nmprgrm.Trim(),
                            expandedIcon = "fa fa-folder-open",
                            collapsedIcon = "fa fa-folder",
                            data_id = pgrmunit.Idpgrmunit,
                            data_id_parent = 0,
                            this_header = true,
                            this_level = "program",
                            children = (
                                from kegunit in _BludContext.Kegunit
                                join mkegiatan in _BludContext.Mkegiatan on kegunit.Idkeg equals mkegiatan.Idkeg
                                where kegunit.Idpgrmunit == pgrmunit.Idpgrmunit && mkegiatan.Idkeginduk == 0 && mkegiatan.Type.Trim() == "H" && mkegiatan.Levelkeg == 1
                                select new LookupTree
                                {
                                    label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkegiatan.Nukeg.Trim() + " - " + mkegiatan.Nmkegunit.Trim(),
                                    expandedIcon = "fa fa-folder-open",
                                    collapsedIcon = "fa fa-folder",
                                    data_kode = mkegiatan.Nukeg.Trim(),
                                    data_nama = mkegiatan.Nmkegunit.Trim(),
                                    data_id = kegunit.Idkeg,
                                    data_id_parent = pgrmunit.Idpgrmunit,
                                    this_header = type == "kegiatan" ? false : true,
                                    this_level = "kegiatan",
                                    children = type == "kegiatan" ? null :
                                    (
                                       from subkegunit in _BludContext.Kegunit
                                       join submkegiatan in _BludContext.Mkegiatan on subkegunit.Idkeg equals submkegiatan.Idkeg
                                       where subkegunit.Idpgrmunit == pgrmunit.Idpgrmunit && submkegiatan.Idkeginduk == mkegiatan.Idkeg && submkegiatan.Type.Trim() == "D" && submkegiatan.Levelkeg == 2
                                       select new LookupTree
                                       {
                                           label = "00." + mpgrm.Nuprgrm.Trim() + "" + submkegiatan.Nukeg.Trim() + " - " + submkegiatan.Nmkegunit.Trim(),
                                           expandedIcon = "fa fa-folder-open",
                                           collapsedIcon = "fa fa-folder",
                                           data_kode = submkegiatan.Nukeg.Trim(),
                                           data_nama = submkegiatan.Nmkegunit.Trim(),
                                           data_id = subkegunit.Idkegunit,
                                           data_id_parent = pgrmunit.Idpgrmunit,
                                           this_header = false,
                                           this_level = "sub_kegiatan",
                                           idkegFK = subkegunit.Idkeg
                                       }
                                    ).ToList()
                                }
                            ).ToList()
                        }
                    ).ToListAsync();
                    model.Add(temp_urusan);
                }
            }
            return model;
        }

        public async Task<bool> Update(Kegunit param)
        {
            Kegunit data = await _BludContext.Kegunit.Where(w => w.Idkegunit == param.Idkegunit).FirstOrDefaultAsync();
            Mkegiatan mkegiatan = await _BludContext.Mkegiatan.Where(w => w.Idkeg == param.Idkeg).FirstOrDefaultAsync();
            if (mkegiatan == null) return false;
            if(mkegiatan.Type.Trim() == "H" && mkegiatan.Levelkeg == 1) // Kegiatan
            {
                data.Idsifatkeg = param.Idsifatkeg;
                data.Sasaran = param.Sasaran;
                data.Target = param.Target;
                data.Satuan = param.Satuan;
                data.Pagu = param.Pagu;
                data.Ketkeg = param.Ketkeg;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Kegunit.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0) return true;
                return false;
            } else // sub Kegiatan
            {
                data.Idsifatkeg = param.Idsifatkeg;
                data.Sasaran = param.Sasaran;
                data.Target = param.Target;
                data.Satuan = param.Satuan;
                data.Pagu = param.Pagu;
                data.Ketkeg = param.Ketkeg;
                data.Dateupdate = param.Dateupdate;
                data.Pagupls1 = param.Pagupls1;
                data.Tglawal = param.Tglawal;
                data.Tglakhir = param.Tglakhir;
                _BludContext.Kegunit.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0) return true;
                return false;
            }
        }

        public async Task<KegunitView> ViewData(long Idkegunit)
        {
            KegunitView Result = await (
                from data in _BludContext.Kegunit
                join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                join sifatkeg in _BludContext.Sifatkeg on data.Idsifatkeg equals sifatkeg.Idsifatkeg
                where data.Idkegunit == Idkegunit
                select new KegunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idkeg = data.Idkeg,
                    Idpeg = data.Idpeg,
                    Idkegunit = data.Idkegunit,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprioda = data.Idprioda,
                    Idsas = data.Idsas,
                    Pagumin1 = data.Pagumin1,
                    Pagupls1 = data.Pagupls1,
                    Idsifatkeg = data.Idsifatkeg,
                    Ketkeg = data.Ketkeg,
                    Lokasi = data.Lokasi,
                    Nmkegunit = mkeg != null ? mkeg.Nmkegunit : "",
                    Noprior = data.Noprior,
                    Nukeg = mkeg != null ? mkeg.Nukeg : "",
                    Pagu = data.Pagu,
                    Paguplus = data.Paguplus,
                    Pagutif = data.Pagutif,
                    Sasaran = data.Sasaran,
                    Satuan = data.Satuan,
                    Target = data.Target,
                    Targetp = data.Targetp,
                    Targetif = data.Targetif,
                    Targetsen = data.Targetsen,
                    Tglakhir = data.Tglakhir,
                    Tglawal = data.Tglawal,
                    Tglvalid = data.Tglvalid,
                    Volume = data.Volume,
                    Volume1 = data.Volume1,
                    IdsifatkegNavigation = sifatkeg ?? null,
                    IdkegNavigation = mkeg ?? null,
                    Kegunitx = !String.IsNullOrEmpty(data.Idkegunitx.ToString()) ? _BludContext.Kegunit.Where(w => w.Idkegunit == data.Idkegunitx).FirstOrDefault() : null,
                    Idkegunitx = data.Idkegunitx
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<KegunitView>> ViewDatas(KegunitGet param)
        {
            List<KegunitView> Result = await(
                from data in _BludContext.Kegunit
                join mkeg in _BludContext.Mkegiatan on data.Idkeg equals mkeg.Idkeg
                join sifatkeg in _BludContext.Sifatkeg on data.Idsifatkeg equals sifatkeg.Idsifatkeg
                where data.Idpgrmunit == param.Idpgrmunit
                select new KegunitView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idkeg = data.Idkeg,
                    Idpeg = data.Idpeg,
                    Idkegunit = data.Idkegunit,
                    Idpgrmunit = data.Idpgrmunit,
                    Idprioda = data.Idprioda,
                    Idsas = data.Idsas,
                    Pagumin1 = data.Pagumin1,
                    Pagupls1 = data.Pagupls1,
                    Idsifatkeg = data.Idsifatkeg,
                    Ketkeg = data.Ketkeg,
                    Lokasi = data.Lokasi,
                    Nmkegunit = mkeg != null ? mkeg.Nmkegunit : "",
                    Noprior = data.Noprior,
                    Nukeg = mkeg != null ? mkeg.Nukeg : "",
                    Pagu = data.Pagu,
                    Paguplus = data.Paguplus,
                    Pagutif = data.Pagutif,
                    Sasaran = data.Sasaran,
                    Satuan = data.Satuan,
                    Target = data.Target,
                    Targetp = data.Targetp,
                    Targetif = data.Targetif,
                    Targetsen = data.Targetsen,
                    Tglakhir = data.Tglakhir,
                    Tglawal = data.Tglawal,
                    Tglvalid = data.Tglvalid,
                    Volume = data.Volume,
                    Volume1 = data.Volume1,
                    IdsifatkegNavigation = sifatkeg ?? null,
                    IdkegNavigation = mkeg ?? null,
                    Kegunitx = !String.IsNullOrEmpty(data.Idkegunitx.ToString()) ? _BludContext.Kegunit.Where(w => w.Idkegunit == data.Idkegunitx).FirstOrDefault() : null,
                    Idkegunitx = data.Idkegunitx
                }
                ).ToListAsync();
            return Result;
        }
    }
    
}
