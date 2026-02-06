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
    public class MKegiatanRepo : Repo<Mkegiatan>, IMkegiatanRepo
    {
        public MKegiatanRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Mkegiatan>> Paging(PrimengTableParam<MkegiatanGet> param)
        {
            PrimengTableResult<Mkegiatan> Result = new PrimengTableResult<Mkegiatan>();
            IQueryable<Mkegiatan> Query = (
                from data in _BludContext.Mkegiatan
                join program in _BludContext.Mpgrm on data.Idprgrm equals program.Idprgrm
                join jkeg in _BludContext.Jkeg on data.Jnskeg equals jkeg.Jnskeg into jkegMatch from jkeg_data in jkegMatch.DefaultIfEmpty()
                where data.Staktif == true
                select new Mkegiatan
                {
                    Idkeg = data.Idkeg,
                    Jnskeg = data.Jnskeg,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idprgrm = data.Idprgrm,
                    Idkeginduk = data.Idkeginduk,
                    Levelkeg = data.Levelkeg,
                    Type = data.Type,
                    IdprgrmNavigation = program ?? null,
                    JnskegNavigation = jkeg_data ?? null,
                    Nukeg = data.Nukeg,
                    Nmkegunit = data.Nmkegunit,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid
                }
                ).AsQueryable();
            if(param.Parameters.Idprgrm.ToString() != "0")
            {
                Query = Query.Where(w => w.Idprgrm == param.Parameters.Idprgrm).AsQueryable();
            }
            if(param.Parameters.Idkeginduk.ToString() != "0")
            {
                Query = Query.Where(w => w.Idkeginduk == param.Parameters.Idkeginduk).AsQueryable();
            }
            if(param.Parameters.Jnskeg.ToString() != "0")
            {
                Query = Query.Where(w => w.Jnskeg == param.Parameters.Jnskeg).AsQueryable();
            }
            if(param.Parameters.Kdperspektif.ToString() != "0")
            {
                Query = Query.Where(w => w.Kdperspektif == param.Parameters.Kdperspektif).AsQueryable();
            }
            if(param.Parameters.Type.Trim() != "x")
            {
                Query = Query.Where(w => w.Type.Trim() == param.Parameters.Type.Trim()).AsQueryable();
            }
            if(param.Parameters.Idpgrmunit.ToString() != "0") // ini diisi kalau lookup yang diingikan != kegiatan yang ada di kegunit / untuk input ke kegunit
            {
                List<long> idkegunits = await _BludContext.Kegunit.Where(w => w.Idpgrmunit == param.Parameters.Idpgrmunit).Select(s => s.Idkeg).ToListAsync();
                if(idkegunits.Count() > 0)
                {
                    Query = Query.Where(w => !idkegunits.Contains(w.Idkeg)).AsQueryable();
                }
            }
            if(param.GlobalFilter != null)
            {
                Query = Query.Where(w => EF.Functions.Like(w.Nukeg.Trim(), "%" + param.GlobalFilter + "%") || EF.Functions.Like(w.Nmkegunit.Trim(), "%" + param.GlobalFilter + "%")).AsQueryable();
            }
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).OrderBy(o => o.Nukeg).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            return Result;
        }

        public async Task<List<Mkegiatan>> Search(string Keyword)
        {
            List<Mkegiatan> data = await (
                from kegiatan in _BludContext.Mkegiatan
                where (EF.Functions.Like(kegiatan.Nukeg.Trim(), "%" + Keyword + "%") || EF.Functions.Like(kegiatan.Nmkegunit.Trim(), "%" + Keyword + "%"))
                && kegiatan.Type.Trim() == "D"
                select new Mkegiatan
                {
                    Idkeg = kegiatan.Idkeg,
                    Idprgrm = kegiatan.Idprgrm,
                    Kdperspektif = kegiatan.Kdperspektif,
                    Nukeg = kegiatan.Nukeg,
                    Nmkegunit = kegiatan.Nmkegunit,
                    Levelkeg = kegiatan.Levelkeg,
                    Type = kegiatan.Type,
                    Idkeginduk = kegiatan.Idkeginduk,
                    Staktif = kegiatan.Staktif,
                    Stvalid = kegiatan.Stvalid,
                    Jnskeg = kegiatan.Jnskeg,
                    Datecreate = kegiatan.Datecreate,
                    Dateupdate = kegiatan.Dateupdate
                }
                ).ToListAsync();
            return data;
        }

        public async Task<List<LookupTreeDto>> TreeByDpa(long Idunit, string kdtahap)
        {
            List<LookupTreeDto> model = new List<LookupTreeDto> { };
            Daftunit daftunit = await _BludContext.Daftunit.Where(w => w.Idunit == Idunit).FirstOrDefaultAsync();
            if(daftunit != null)
            {
                Dafturus dafturus = await _BludContext.Dafturus.Where(w => w.Idurus == daftunit.Idurus).FirstOrDefaultAsync();
                if (dafturus != null)
                {
                    model.Add(new LookupTreeDto
                    {
                        label = dafturus.Kdurus.Trim() + " - " + dafturus.Nmurus.Trim(),
                        expandedIcon = "fa fa-folder-open",
                        collapsedIcon = "fa fa-folder",
                        data_id = dafturus.Idurus,
                        this_header = true,
                        this_level = "Urusan",
                        children = await populate_child(Idunit, kdtahap, dafturus.Kdurus.Trim())

                    });
                }
            }
            
            return model;
        }

        public async Task<Mkegiatan> ViewData(long Idkeg)
        {
            Mkegiatan Result = await (
                 from data in _BludContext.Mkegiatan
                 join program in _BludContext.Mpgrm on data.Idprgrm equals program.Idprgrm
                 join jkeg in _BludContext.Jkeg on data.Jnskeg equals jkeg.Jnskeg into jkegMatch
                 from jkeg_data in jkegMatch.DefaultIfEmpty()
                 where data.Idkeg == Idkeg
                 select new Mkegiatan
                 {
                     Idkeg = data.Idkeg,
                     Jnskeg = data.Jnskeg,
                     Datecreate = data.Datecreate,
                     Dateupdate = data.Dateupdate,
                     Idprgrm = data.Idprgrm,
                     Idkeginduk = data.Idkeginduk,
                     Levelkeg = data.Levelkeg,
                     Type = data.Type,
                     IdprgrmNavigation = program ?? null,
                     JnskegNavigation = jkeg_data ?? null,
                     Nukeg = data.Nukeg,
                     Nmkegunit = data.Nmkegunit,
                     Staktif = data.Staktif,
                     Stvalid = data.Stvalid
                 }
                 ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Mkegiatan>> ViewDatas(MkegiatanGet param)
        {
            List<Mkegiatan> Result = new List<Mkegiatan>();
            IQueryable<Mkegiatan> Query = (
                from data in _BludContext.Mkegiatan
                join program in _BludContext.Mpgrm on data.Idprgrm equals program.Idprgrm
                join jkeg in _BludContext.Jkeg on data.Jnskeg equals jkeg.Jnskeg into jkegMatch
                from jkeg_data in jkegMatch.DefaultIfEmpty()
                where data.Staktif == true
                select new Mkegiatan
                {
                    Idkeg = data.Idkeg,
                    Jnskeg = data.Jnskeg,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idprgrm = data.Idprgrm,
                    Idkeginduk = data.Idkeginduk,
                    Levelkeg = data.Levelkeg,
                    Type = data.Type,
                    IdprgrmNavigation = program ?? null,
                    JnskegNavigation = jkeg_data ?? null,
                    Nukeg = data.Nukeg,
                    Nmkegunit = data.Nmkegunit,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid
                }
                ).AsQueryable();
            if (param.Idprgrm.ToString() != "0")
            {
                Query = Query.Where(w => w.Idprgrm == param.Idprgrm).AsQueryable();
            }
            if (param.Idkeginduk.ToString() != "0")
            {
                Query = Query.Where(w => w.Idkeginduk == param.Idkeginduk).AsQueryable();
            }
            if (param.Jnskeg.ToString() != "0")
            {
                Query = Query.Where(w => w.Jnskeg == param.Jnskeg).AsQueryable();
            }
            if (param.Kdperspektif.ToString() != "0")
            {
                Query = Query.Where(w => w.Kdperspektif == param.Kdperspektif).AsQueryable();
            }
            if (param.Type.Trim() != "x")
            {
                Query = Query.Where(w => w.Type.Trim() == param.Type.Trim()).AsQueryable();
            }
            Result = await Query.ToListAsync();
            return Result;
        }

        private async Task<List<LookupTreeDto>> populate_child(long Idunit, string kdtahap, string Kdurus)
        { 
            List<LookupTreeDto> child = new List<LookupTreeDto> { };
            List<long> iddpas = await _BludContext.Dpa.Where(w => w.Idunit == Idunit && w.Kdtahap.Trim() == kdtahap.Trim()).Select(s => s.Iddpa).ToListAsync();
            if(iddpas.Count() > 0)
            {
                List<long> idkeg_dpars = await _BludContext.Dpar.Where(w => iddpas.Contains(w.Iddpa) && w.Kdtahap.Trim() == kdtahap.Trim()).Select(s => s.Idkeg).ToListAsync();
                if(idkeg_dpars.Count() > 0)
                {
                    List<long> idpgrm_used = await _BludContext.Mkegiatan.Where(w => idkeg_dpars.Contains(w.Idkeg)).Select(s => s.Idprgrm).ToListAsync();
                    if(idpgrm_used.Count() > 0)
                    {
                        List<string> nukegsinduk = await _BludContext.Mkegiatan
                                .Where(w => idpgrm_used.Contains(w.Idprgrm) && idkeg_dpars.Contains(w.Idkeg))
                                .Select(s => s.Nukeg.Trim().Substring(0, s.Nukeg.Trim().Length - 3))
                                .ToListAsync();
                        if (nukegsinduk.Count() > 0)
                        {
                            List<long> idkeginduk = await _BludContext.Mkegiatan
                                    .Where(w => nukegsinduk.Contains(w.Nukeg.Trim()) && w.Type.Trim() == "H")
                                    .Select(s => s.Idkeg)
                                    .ToListAsync();
                            List<LookupTreeDto> temp = await _BludContext.Mpgrm.Where(w => idpgrm_used.Contains(w.Idprgrm))
                            .Select(s => new LookupTreeDto
                            {
                                label = Kdurus + s.Nuprgrm.Trim() + " - " + s.Nmprgrm.Trim(),
                                expandedIcon = "fa fa-folder-open",
                                collapsedIcon = "fa fa-folder",
                                data_id = s.Idprgrm,
                                data_id_parent = Idunit,
                                this_header = true,
                                this_level = "program",
                                children = _BludContext.Mkegiatan.Where(w => w.Idprgrm == s.Idprgrm && w.Type.Trim() == "H" && idkeginduk.Contains(w.Idkeg))
                                        .Select(k => new LookupTreeDto
                                        {
                                            label = Kdurus + s.Nuprgrm.Trim() + "" + k.Nukeg.Trim() + " - " + k.Nmkegunit,
                                            expandedIcon = "fa fa-folder-open",
                                            collapsedIcon = "fa fa-folder",
                                            data_id = k.Idkeg,
                                            data_id_parent = s.Idprgrm,
                                            this_header = true,
                                            this_level = "kegiatan",
                                            children = _BludContext.Mkegiatan
                                                .Where(w => idkeg_dpars.Contains(w.Idkeg) && w.Idprgrm == s.Idprgrm && w.Type.Trim() == "D" && w.Nukeg.Trim().StartsWith(k.Nukeg.Trim()))
                                                .Select(sub => new LookupTreeDto
                                                {
                                                    label = Kdurus + s.Nuprgrm.Trim() + "" + sub.Nukeg.Trim() + " - " + sub.Nmkegunit,
                                                    expandedIcon = "fa fa-folder-open",
                                                    collapsedIcon = "fa fa-folder",
                                                    data_id = sub.Idkeg,
                                                    data_id_parent = k.Idkeg,
                                                    this_header = false,
                                                    this_level = "sub_kegiatan",
                                                }).ToList()
                                        }).ToList()
                            }).ToListAsync();
                            child.AddRange(temp);
                        }
                    }
                }
            }
            //child.AddRange(temp);
            return child;
        }
        public async Task<List<LookupTree>> TreeByKegunit(long Idunit, string kdtahap, string type)
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
            List<Pgrmunit> pgrmunit_non_urusan = await _BludContext.Pgrmunit
                .Where(w => w.Idunit == Idunit && idpgrm_non_urusan.Contains(w.Idprgrm) && w.Kdtahap.Trim() == tahap).ToListAsync();
            if (pgrmunit_non_urusan.Count() > 0)
            {
                List<Kegunit> kegunit_non_urusan = await _BludContext.Kegunit.Where(w => pgrmunit_non_urusan.Select(s => s.Idpgrmunit).Contains(w.Idpgrmunit)).ToListAsync();
                temp_non_urusan.children = await _BludContext.Mpgrm
                            .Where(w => pgrmunit_non_urusan.Select(s => s.Idprgrm).Contains(w.Idprgrm))
                            .Select(s => new LookupTree
                            {
                                label = "00." + s.Nuprgrm.Trim() + " - " + s.Nmprgrm.Trim(),
                                data_kode = s.Nuprgrm.Trim(),
                                data_nama = s.Nmprgrm.Trim(),
                                expandedIcon = "fa fa-folder-open",
                                collapsedIcon = "fa fa-folder",
                                data_id = s.Idprgrm,
                                data_id_parent = 0,
                                this_header = true,
                                this_level = "program",
                                children = kegunit_non_urusan.Count() > 0 ?
                                    _BludContext.Mkegiatan.Where(w => kegunit_non_urusan.Select(sk => sk.Idkeg).Contains(w.Idkeg) && w.Idkeginduk == 0 && w.Type.Trim() == "H" && w.Levelkeg == 1)
                                    .Select(k => new LookupTree
                                    {
                                        label = "00." + s.Nuprgrm.Trim() + "" + k.Nukeg.Trim() + " - " + k.Nmkegunit.Trim(),
                                        expandedIcon = "fa fa-folder-open",
                                        collapsedIcon = "fa fa-folder",
                                        data_kode = k.Nukeg.Trim(),
                                        data_nama = k.Nmkegunit.Trim(),
                                        data_id = k.Idkeg,
                                        data_id_parent = s.Idprgrm,
                                        this_header = type == "kegiatan" ? false : true,
                                        this_level = "kegiatan",
                                        children = type == "kegiatan" ? null :
                                            _BludContext.Mkegiatan.Where(w => kegunit_non_urusan.Select(ssk => ssk.Idkeg).Contains(w.Idkeg) && w.Idkeginduk == k.Idkeg && w.Type.Trim() == "D" && w.Levelkeg == 2)
                                            .Select(sub => new LookupTree
                                            {
                                                label = "00." + s.Nuprgrm.Trim() + "" + sub.Nukeg.Trim() + " - " + sub.Nmkegunit.Trim(),
                                                expandedIcon = "fa fa-folder-open",
                                                collapsedIcon = "fa fa-folder",
                                                data_kode = sub.Nukeg.Trim(),
                                                data_nama = sub.Nmkegunit.Trim(),
                                                data_id = sub.Idkeg,
                                                data_id_parent = k.Idkeg,
                                                this_header = false,
                                                this_level = "sub_kegiatan"
                                            }).ToList()
                                    }).ToList()
                                    : null
                            }).ToListAsync();
                model.Add(temp_non_urusan);
            }

            //ambil Non Urusan END

            //ambil urusan by kdunit START
            Daftunit daftunit = await _BludContext.Daftunit
                .Where(w => w.Idunit == Idunit).FirstOrDefaultAsync();
            if (daftunit != null)
            {
                Dafturus dafturus = await _BludContext.Dafturus.Where(w => w.Idurus == daftunit.Idurus).FirstOrDefaultAsync();
                if (dafturus != null)
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
                    List<Pgrmunit> pgrmunit_urusan = await _BludContext.Pgrmunit
                        .Where(w => w.Idunit == Idunit && idpgrm_urusan.Contains(w.Idprgrm) && w.Kdtahap.Trim() == tahap).ToListAsync();
                    if (pgrmunit_urusan.Count() > 0)
                    {
                        List<Kegunit> kegunit_urusan = await _BludContext.Kegunit.Where(w => pgrmunit_urusan.Select(s => s.Idpgrmunit).Contains(w.Idpgrmunit)).ToListAsync();
                        temp_urusan.children = await _BludContext.Mpgrm
                                    .Where(w => pgrmunit_urusan.Select(s => s.Idprgrm).Contains(w.Idprgrm))
                                    .Select(s => new LookupTree
                                    {
                                        label = dafturus.Kdurus.Trim() + s.Nuprgrm.Trim() + " - " + s.Nmprgrm.Trim(),
                                        data_kode = s.Nuprgrm.Trim(),
                                        data_nama = s.Nmprgrm.Trim(),
                                        expandedIcon = "fa fa-folder-open",
                                        collapsedIcon = "fa fa-folder",
                                        data_id = s.Idprgrm,
                                        data_id_parent = 0,
                                        this_header = true,
                                        this_level = "program",
                                        children = kegunit_urusan.Count() > 0 ?
                                            _BludContext.Mkegiatan.Where(w => w.Idprgrm == s.Idprgrm && kegunit_urusan.Select(sk => sk.Idkeg).Contains(w.Idkeg) && w.Idkeginduk == 0 && w.Type.Trim() == "H" && w.Levelkeg == 1)
                                            .Select(k => new LookupTree
                                            {
                                                label = dafturus.Kdurus.Trim() + s.Nuprgrm.Trim() + "" + k.Nukeg.Trim() + " - " + k.Nmkegunit.Trim(),
                                                expandedIcon = "fa fa-folder-open",
                                                collapsedIcon = "fa fa-folder",
                                                data_kode = k.Nukeg.Trim(),
                                                data_nama = k.Nmkegunit.Trim(),
                                                data_id = k.Idkeg,
                                                data_id_parent = s.Idprgrm,
                                                this_header = type == "kegiatan" ? false : true,
                                                this_level = "kegiatan",
                                                children = type == "kegiatan" ? null :
                                                    _BludContext.Mkegiatan.Where(w => kegunit_urusan.Select(ssk => ssk.Idkeg).Contains(w.Idkeg) && w.Idkeginduk == k.Idkeg && w.Type.Trim() == "D" && w.Levelkeg == 2)
                                                    .Select(sub => new LookupTree
                                                    {
                                                        label = dafturus.Kdurus.Trim() + s.Nuprgrm.Trim() + "" + sub.Nukeg.Trim() + " - " + sub.Nmkegunit.Trim(),
                                                        expandedIcon = "fa fa-folder-open",
                                                        collapsedIcon = "fa fa-folder",
                                                        data_kode = sub.Nukeg.Trim(),
                                                        data_nama = sub.Nmkegunit.Trim(),
                                                        data_id = sub.Idkeg,
                                                        data_id_parent = k.Idkeg,
                                                        this_header = false,
                                                        this_level = "sub_kegiatan"
                                                    }).ToList()
                                            }).ToList()
                                            : null
                                    }).ToListAsync();
                        model.Add(temp_urusan);
                    }
                }
            }
            return model;
        }

        public async Task<bool> Update(Mkegiatan param)
        {
            Mkegiatan data = await _BludContext.Mkegiatan.Where(w => w.Idkeg == param.Idkeg).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nukeg = param.Nukeg;
            data.Nmkegunit = param.Nmkegunit;
            data.Jnskeg = param.Jnskeg;
            _BludContext.Mkegiatan.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }
    }
}
