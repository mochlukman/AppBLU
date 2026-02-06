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
    public class MpgrmRepo : Repo<Mpgrm>, IMpgrmRepo
    {
        public MpgrmRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<PrimengTableResult<Mpgrm>> Paging(PrimengTableParam<MpgrmGet> param)
        {
            PrimengTableResult<Mpgrm> Result = new PrimengTableResult<Mpgrm>();
            IQueryable<Mpgrm> query = (
                from data in _BludContext.Mpgrm
                join urus in _BludContext.Dafturus on data.Idurus equals urus.Idurus into urusMatch
                from urus_data in urusMatch.DefaultIfEmpty()
                select new Mpgrm
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idprgrm = data.Idprgrm,
                    Idprioda = data.Idprioda,
                    Idprionas = data.Idprionas,
                    Idprioprov = data.Idprioprov,
                    Idurus = data.Idurus,
                    Idxkode = data.Idxkode,
                    Nmprgrm = data.Nmprgrm,
                    Nuprgrm = data.Nuprgrm,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdurusNavigation = urus_data
                }
                ).AsQueryable();
            if (param.Parameters.Idurus.ToString() != "0")
            {
                query = query.Where(w => w.Idurus == param.Parameters.Idurus).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Nmprgrm.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Nuprgrm.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "nuprgrm")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nuprgrm).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nuprgrm).AsQueryable();
                    }
                }
                else if (param.SortField == "nmprgrm")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nmprgrm).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nmprgrm).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<List<LookupTree>> Tree(long Idurus)
        {
            List<LookupTree> Result = new List<LookupTree>();
            //Non Urusan Start
            LookupTree temp_non_urusan = new LookupTree
            {
                label = "00. - Non Urusan",
                expandedIcon = "fa fa-folder-open",
                collapsedIcon = "fa fa-folder",
                data_id = 0,
                this_header = true,
                this_level = "Non Urusan",
                children = await _BludContext.Mpgrm.Where(w => String.IsNullOrEmpty(w.Idurus.ToString()))
                    .Select(s => new LookupTree
                    {
                        label = "00." + s.Nuprgrm.Trim() + " - " + s.Nmprgrm.Trim(),
                        data_kode = s.Nuprgrm.Trim(),
                        data_nama = s.Nmprgrm.Trim(),
                        expandedIcon = "fa fa-folder-open",
                        collapsedIcon = "fa fa-folder",
                        data_id = s.Idprgrm,
                        data_id_parent = 0,
                        this_header = false,
                        this_level = "program",
                    }).ToListAsync()
            };
            Result.Add(temp_non_urusan);
            //Non Urusan End

            //Urusan Start
            IQueryable<Dafturus> QueryDafturusan = _BludContext.Dafturus.Where(w => w.Kdlevel == 2).AsQueryable();
            if(Idurus.ToString() != "0")
            {
                QueryDafturusan = QueryDafturusan.Where(w => w.Idurus == Idurus).AsQueryable();
            }
            List<Dafturus> dafturus = await QueryDafturusan.ToListAsync();
            if(dafturus.Count() > 0)
            {
                foreach(var f in dafturus)
                {
                    Result.Add(new LookupTree
                    {
                        label = f.Kdurus.Trim() + " - " + f.Nmurus.Trim(),
                        expandedIcon = "fa fa-folder-open",
                        collapsedIcon = "fa fa-folder",
                        data_id = f.Idurus,
                        this_header = true,
                        this_level = "Urusan",
                        children = await _BludContext.Mpgrm.Where(w => w.Idurus == f.Idurus)
                            .Select(s => new LookupTree
                            {
                                label = f.Kdurus.Trim() + s.Nuprgrm.Trim() + " - " + s.Nmprgrm.Trim(),
                                data_kode = s.Nuprgrm.Trim(),
                                data_nama = s.Nmprgrm.Trim(),
                                expandedIcon = "fa fa-folder-open",
                                collapsedIcon = "fa fa-folder",
                                data_id = s.Idprgrm,
                                data_id_parent = 0,
                                this_header = false,
                                this_level = "program",
                            }).ToListAsync()
                    });
                }
            }
            //Urusan End
            return Result;
        }

        public async Task<bool> Update(Mpgrm param)
        {
            Mpgrm data = await _BludContext.Mpgrm.Where(w => w.Idprgrm == param.Idprgrm).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nuprgrm = param.Nuprgrm;
            data.Nmprgrm = param.Nmprgrm;
            data.Dateupdate = param.Dateupdate;
            data.Staktif = param.Staktif;
            data.Stvalid = param.Stvalid;
            _BludContext.Mpgrm.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Mpgrm> ViewData(long Idprgrm)
        {
            Mpgrm Result = await (
                from data in _BludContext.Mpgrm
                join urus in _BludContext.Dafturus on data.Idurus equals urus.Idurus into urusMatch
                from urus_data in urusMatch.DefaultIfEmpty()
                where data.Idprgrm == Idprgrm
                select new Mpgrm
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idprgrm = data.Idprgrm,
                    Idprioda = data.Idprioda,
                    Idprionas = data.Idprionas,
                    Idprioprov = data.Idprioprov,
                    Idurus = data.Idurus,
                    Idxkode = data.Idxkode,
                    Nmprgrm = data.Nmprgrm,
                    Nuprgrm = data.Nuprgrm,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdurusNavigation = urus_data
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Mpgrm>> ViewDatas(MpgrmGet param)
        {
            List<Mpgrm> Result = new List<Mpgrm>();
            IQueryable<Mpgrm> query = (
                from data in _BludContext.Mpgrm
                join urus in _BludContext.Dafturus on data.Idurus equals urus.Idurus into urusMatch
                from urus_data in urusMatch.DefaultIfEmpty()
                select new Mpgrm
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idprgrm = data.Idprgrm,
                    Idprioda = data.Idprioda,
                    Idprionas = data.Idprionas,
                    Idprioprov = data.Idprioprov,
                    Idurus = data.Idurus,
                    Idxkode = data.Idxkode,
                    Nmprgrm = data.Nmprgrm,
                    Nuprgrm = data.Nuprgrm,
                    Staktif = data.Staktif,
                    Stvalid = data.Stvalid,
                    IdurusNavigation = urus_data
                }
                ).AsQueryable();
            if (param.Idurus.ToString() != "0")
            {
                query = query.Where(w => w.Idurus == param.Idurus).AsQueryable();
            }
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
