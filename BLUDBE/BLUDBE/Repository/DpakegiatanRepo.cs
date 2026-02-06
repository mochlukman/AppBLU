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
    public class DpakegiatanRepo : Repo<Dpakegiatan>, IDpakegiatanRepo
    {
        public DpakegiatanRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<LookupTreeDto>> Tree(long Idunit, string Kdtahap, bool Header, int? Jnskeg)
        {
            string lastKdTahap = "";
            var get_last = await _BludContext.Dpaprogram.Where(w => w.Idunit == Idunit && w.Kdtahap.Trim() == "341").Select(s => s.Kdtahap.Trim()).Distinct().FirstOrDefaultAsync();
            if (Kdtahap != "x")
            {
                if (!String.IsNullOrEmpty(get_last))
                {
                    lastKdTahap = get_last;
                } else
                {
                    lastKdTahap = Kdtahap;
                }
            } else
            {
                if (!String.IsNullOrEmpty(get_last))
                {
                    lastKdTahap = get_last;
                }
            }
            List<int?> listJkeg = new List<int?> { };
            if(Jnskeg == 0)
            {
                listJkeg.AddRange(new int?[3] { 2, 3, 4});
            } else
            {
                listJkeg.Add(Jnskeg);
            }
            List<LookupTreeDto> model = new List<LookupTreeDto> { };
            // ambil Non Urusan START
            LookupTreeDto temp_non_urusan = new LookupTreeDto
            {
                label = "00. - Non Urusan",
                expandedIcon = "fa fa-folder-open",
                collapsedIcon = "fa fa-folder",
                data_id = 0,
                this_header = true,
                this_level = "Non Urusan",
            };
            List<long> idpgrm_non_urusan = await _BludContext.Mpgrm.Where(w => w.Idurus == null).Select(s => s.Idprgrm).ToListAsync();
            List<long?> IdkegDpa = await (
                    from dpakeg in _BludContext.Dpakegiatan
                    join mkeg in _BludContext.Mkegiatan on dpakeg.Idkeg equals mkeg.Idkeg
                    join dpapgrm in _BludContext.Dpaprogram on dpakeg.Iddpapgrm equals dpapgrm.Iddpapgrm
                    where dpapgrm.Idunit == Idunit && dpapgrm.Kdtahap.Trim() == lastKdTahap.Trim()
                    select mkeg.Idkeginduk
                ).Distinct().ToListAsync();
            temp_non_urusan.children = await (
                from dpapgrm in _BludContext.Dpaprogram
                join mpgrm in _BludContext.Mpgrm on dpapgrm.Idprgrm equals mpgrm.Idprgrm
                where idpgrm_non_urusan.Contains(dpapgrm.Idprgrm) && dpapgrm.Idunit == Idunit && dpapgrm.Kdtahap.Trim() == lastKdTahap.Trim()
                select new LookupTreeDto
                {
                    label = "00." + mpgrm.Nuprgrm.Trim() + " - " + mpgrm.Nmprgrm.Trim(),
                    expandedIcon = "fa fa-folder-open",
                    collapsedIcon = "fa fa-folder",
                    data_id = mpgrm.Idprgrm,
                    data_id_parent = 0,
                    this_header = true,
                    this_level = "program",
                    children = (
                        from mkeg in _BludContext.Mkegiatan
                        where mkeg.Idprgrm == dpapgrm.Idprgrm && IdkegDpa.Contains(mkeg.Idkeg) && mkeg.Idkeginduk == 0 && mkeg.Type.Trim() == "H" && mkeg.Levelkeg == 1
                        select new LookupTreeDto
                        {
                            label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkeg.Nukeg.Trim() + " - " + mkeg.Nmkegunit.Trim(),
                            expandedIcon = "fa fa-folder-open",
                            collapsedIcon = "fa fa-folder",
                            data_id = mkeg.Idkeg,
                            data_id_parent = mpgrm.Idprgrm,
                            this_header = true,
                            this_level = "kegiatan",
                            children = Header ? null :
                            (
                                from dpakegsub in _BludContext.Dpakegiatan
                                join mkegsub in _BludContext.Mkegiatan on dpakegsub.Idkeg equals mkegsub.Idkeg
                                where dpakegsub.Iddpapgrm == dpapgrm.Iddpapgrm && mkegsub.Idkeginduk == mkeg.Idkeg && mkegsub.Type.Trim() == "D" && mkegsub.Levelkeg == 2 && listJkeg.Contains(mkegsub.Jnskeg)
                                select new LookupTreeDto
                                {
                                    label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkegsub.Nukeg.Trim() + " - " + mkegsub.Nmkegunit.Trim(),
                                    expandedIcon = "fa fa-folder-open",
                                    collapsedIcon = "fa fa-folder",
                                    data_id = mkegsub.Idkeg,
                                    data_id_parent = mkeg.Idkeg,
                                    this_header = false,
                                    this_level = "sub_kegiatan"
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
            if (daftunit != null)
            {
                Dafturus dafturus = await _BludContext.Dafturus.Where(w => w.Idurus == daftunit.Idurus).FirstOrDefaultAsync();
                if (dafturus != null)
                {
                    LookupTreeDto temp_urusan = new LookupTreeDto
                    {
                        label = dafturus.Kdurus.Trim() + " - " + dafturus.Nmurus.Trim(),
                        expandedIcon = "fa fa-folder-open",
                        collapsedIcon = "fa fa-folder",
                        data_id = dafturus.Idurus,
                        this_header = true,
                        this_level = "Urusan",
                    };
                    List<long> idpgrm_urusan = await _BludContext.Mpgrm.Where(w => w.Idurus == dafturus.Idurus).Select(s => s.Idprgrm).ToListAsync();
                    temp_urusan.children = await (
                        from dpapgrm in _BludContext.Dpaprogram
                        join mpgrm in _BludContext.Mpgrm on dpapgrm.Idprgrm equals mpgrm.Idprgrm
                        where idpgrm_urusan.Contains(dpapgrm.Idprgrm) && dpapgrm.Idunit == Idunit && dpapgrm.Kdtahap.Trim() == lastKdTahap.Trim()
                        select new LookupTreeDto
                        {
                            label = "00." + mpgrm.Nuprgrm.Trim() + " - " + mpgrm.Nmprgrm.Trim(),
                            expandedIcon = "fa fa-folder-open",
                            collapsedIcon = "fa fa-folder",
                            data_id = mpgrm.Idprgrm,
                            data_id_parent = 0,
                            this_header = true,
                            this_level = "program",
                            children = (
                                from mkeg in _BludContext.Mkegiatan
                                where mkeg.Idprgrm == dpapgrm.Idprgrm && IdkegDpa.Contains(mkeg.Idkeg) && mkeg.Idkeginduk == 0 && mkeg.Type.Trim() == "H" && mkeg.Levelkeg == 1
                                select new LookupTreeDto
                                {
                                    label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkeg.Nukeg.Trim() + " - " + mkeg.Nmkegunit.Trim(),
                                    expandedIcon = "fa fa-folder-open",
                                    collapsedIcon = "fa fa-folder",
                                    data_id = mkeg.Idkeg,
                                    data_id_parent = mpgrm.Idprgrm,
                                    this_header = true,
                                    this_level = "kegiatan",
                                    children = Header ? null :
                                    (
                                        from dpakegsub in _BludContext.Dpakegiatan
                                        join mkegsub in _BludContext.Mkegiatan on dpakegsub.Idkeg equals mkegsub.Idkeg
                                        where dpakegsub.Iddpapgrm == dpapgrm.Iddpapgrm && mkegsub.Idkeginduk == mkeg.Idkeg && mkegsub.Type.Trim() == "D" && mkegsub.Levelkeg == 2 && listJkeg.Contains(mkegsub.Jnskeg)
                                        select new LookupTreeDto
                                        {
                                            label = "00." + mpgrm.Nuprgrm.Trim() + "" + mkegsub.Nukeg.Trim() + " - " + mkegsub.Nmkegunit.Trim(),
                                            expandedIcon = "fa fa-folder-open",
                                            collapsedIcon = "fa fa-folder",
                                            data_id = mkegsub.Idkeg,
                                            data_id_parent = mkeg.Idkeg,
                                            this_header = false,
                                            this_level = "sub_kegiatan"
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
    }
}
