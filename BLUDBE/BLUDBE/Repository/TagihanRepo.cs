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
    public class TagihanRepo : Repo<Tagihan>, ITagihanRepo
    {
        public TagihanRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Tagihan param)
        {
            Tagihan data = await _BludContext.Tagihan.Where(w => w.Idtagihan == param.Idtagihan).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Notagihan = param.Notagihan;
                data.Idkeg = param.Idkeg;
                data.Tgltagihan = param.Tgltagihan;
                data.Idkontrak = param.Idkontrak;
                data.Bulan = param.Bulan;
                data.Idbulan = param.Idbulan;
                data.Nofaktur = param.Nofaktur;
                data.Nilaippn = param.Nilaippn;
                data.Uraiantagihan = param.Uraiantagihan;
                data.Kdstatus = param.Kdstatus;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Tagihan.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
        public async Task<bool> Pengesahan(Tagihan param)
        {
            Tagihan data = await _BludContext.Tagihan.Where(w => w.Idtagihan == param.Idtagihan).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Tglvalid = param.Tglvalid;
                data.Valid = param.Valid;
                data.Validby = param.Validby;
                data.Dateupdate = param.Dateupdate;
                _BludContext.Tagihan.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }

        public async Task<List<TagihanView>> ViewDatas(long Idunit, long Idkeg, string Kdstatus, bool isValid)
        {
            List<TagihanView> Result = new List<TagihanView>();
            //List<long> Idspptag = await _BludContext.Spptag.Select(s => s.Idtagihan).ToListAsync();
            var IdSpptagQuery = _BludContext.Spptag .Select(s => s.Idtagihan);
            //IQueryable <Bpk> databpk = await _BludContext.Bpk.Select(s => s.Idtagihan).ToListAsync();


            IQueryable<TagihanView> Query = (
                from data in _BludContext.Tagihan
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMatch
                from kegData in kegMatch.DefaultIfEmpty()
                join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                from kontrakData in kontrakMatch.DefaultIfEmpty()
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from statusData in statusMatch.DefaultIfEmpty()
                join bulan in _BludContext.Bulan on data.Idbulan equals bulan.Idbulan into bulanMatch
                from bulan_data in bulanMatch.DefaultIfEmpty()

                select new TagihanView
                {
                    Idunit = data.Idunit,
                    Idkontrak = data.Idkontrak,
                    Idkeg = data.Idkeg,
                    Idtagihan = data.Idtagihan,
                    Kdstatus = data.Kdstatus,
                    Tglvalid = data.Tglvalid,
                    Notagihan = data.Notagihan,
                    Bulan=data.Bulan,
                    Idbulan = data.Idbulan,
                    Nofaktur=data.Nofaktur,
                    Nilaippn=data.Nilaippn,
                    Tgltagihan = data.Tgltagihan,
                    Valid = data.Valid,
                    Uraiantagihan = data.Uraiantagihan,
                    Validby = data.Validby,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdkontrakNavigation = kontrakData ?? null,
                    KdstatusNavigation = statusData ?? null,
                    IdbulanNavigation = bulan_data ?? null,
                    Kegiatan = kegData ?? null
                }
                ).AsQueryable();
            if (!String.IsNullOrEmpty(Idunit.ToString()) || Idunit != 0)
            {
                Query = Query.Where(w => w.Idunit == Idunit).AsQueryable();
            }
            if (!String.IsNullOrEmpty(Idkeg.ToString()) || Idkeg != 0)
            {
                Query = Query.Where(w => w.Idkeg == Idkeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(Kdstatus))
            {
                List<string> statuses = Kdstatus.Split(",").ToList();
                Query = Query.Where(w => statuses.Contains(w.Kdstatus.Trim())).AsQueryable();
            }

            if (isValid == true)
            {
                Query = Query.Where(w => w.Valid != null).AsQueryable();
                //Query = Query.Where(w => (w.Valid != null) && !Idspptag.Contains(w.Idtagihan)).AsQueryable();
                if (IdSpptagQuery.Count() > 0)
                {
                    Query = Query.Where(w => !IdSpptagQuery.Contains(w.Idtagihan));
                }
            }
            //Query = Query.OrderBy(o => o.Notagihan);
            Result = await Query.ToListAsync();
            return Result;
        }
        public async Task<PrimengTableResult<Tagihan>> Paging(PrimengTableParam<TagihanGet> param)
        {
            PrimengTableResult<Tagihan> Result = new PrimengTableResult<Tagihan>();
            List<long?> idTagihans = new List<long?>();
            var sortField = param.SortField?.ToLower();

            if (param.Parameters.NoTagihanExist)
            {
                idTagihans = await _BludContext.Spp
                    .Where(w => w.Idunit == param.Parameters.Idunit && w.Idkeg == param.Parameters.Idkeg)
                    .Select(s => s.Idkontrak).ToListAsync();
            }
           var query = (
               from data in _BludContext.Tagihan
                join keg in _BludContext.Mkegiatan on data.Idkeg equals keg.Idkeg into kegMatch
                from kegData in kegMatch.DefaultIfEmpty()
                join kontrak in _BludContext.Kontrak on data.Idkontrak equals kontrak.Idkontrak into kontrakMatch
                from kontrakData in kontrakMatch.DefaultIfEmpty()
                join status in _BludContext.Stattrs on data.Kdstatus.Trim() equals status.Kdstatus.Trim() into statusMatch
                from statusData in statusMatch.DefaultIfEmpty()
                join bulan in _BludContext.Bulan on data.Idbulan equals bulan.Idbulan into bulanMatch
                from bulan_data in bulanMatch.DefaultIfEmpty()
                select new Tagihan
                {
                    Idunit = data.Idunit,
                    Idkontrak = data.Idkontrak,
                    Idkeg = data.Idkeg,
                    Idtagihan = data.Idtagihan,
                    Kdstatus = data.Kdstatus,
                    Tglvalid = data.Tglvalid,
                    Notagihan = data.Notagihan,
                    Bulan = data.Bulan,
                    Idbulan = data.Idbulan,
                    Nofaktur = data.Nofaktur,
                    Nilaippn = data.Nilaippn,
                    Tgltagihan = data.Tgltagihan,
                    Valid = data.Valid,
                    Uraiantagihan = data.Uraiantagihan,
                    Validby = data.Validby,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdkontrakNavigation = kontrakData ?? null,
                    KdstatusNavigation = statusData ?? null,
                    IdbulanNavigation = bulan_data ?? null
                }
                );
            if (param.Parameters.Idunit.ToString() != "0")
            {
                query = query.Where(w => w.Idunit == param.Parameters.Idunit).AsQueryable();
            }
            if (param.Parameters.Idkeg.ToString() != "0")
            {
                query = query.Where(w => w.Idkeg == param.Parameters.Idkeg).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.Notagihan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraiantagihan.Trim(), "%" + param.GlobalFilter + "%") 
                );
            }
            
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "notagihan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Notagihan);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Notagihan);
                    }
                }
                else if (param.SortField == "tgltagihan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tgltagihan);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tgltagihan);
                    }
                }
                else if (param.SortField == "uraiantagihan")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Uraiantagihan);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Uraiantagihan);
                    }
                }
                
                else if (sortField == "idkontrakNavigation.nokontrak")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdkontrakNavigation.Nokontrak);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdkontrakNavigation.Nokontrak);
                    }
                }
                else if (param.SortField == "kdstatusnavigation.lblstatus")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.KdstatusNavigation.Lblstatus);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.KdstatusNavigation.Lblstatus);
                    }
                }
                else if (param.SortField == "tglvalid")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Tglvalid);
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Tglvalid);
                    }
                }
            }
          
            if (idTagihans.Count() > 0)
            {
                query = query.Where(w => !idTagihans.Contains(w.Idtagihan));
            }
            //query = query.OrderBy(o => o.Nokontrak);
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            /*if (Result.Data.Count() > 0)
            {
                foreach (var f in Result.Data)
                {
                    if (f.Idphk3Navigation != null)
                    {
                        f.IdbendNavigation.IdpegNavigation = await _BludContext.Pegawai.Where(w => w.Idpeg == f.IdbendNavigation.Idpeg).FirstOrDefaultAsync();
                        if (!String.IsNullOrEmpty(f.IdbendNavigation.Jnsbend))
                        {
                            f.IdbendNavigation.JnsbendNavigation = await _BludContext.Jbend.Where(w => w.Jnsbend.Trim() == f.IdbendNavigation.Jnsbend.Trim()).FirstOrDefaultAsync();
                        }
                    }
                }
            }*/
            return Result;
        }
    }
}
