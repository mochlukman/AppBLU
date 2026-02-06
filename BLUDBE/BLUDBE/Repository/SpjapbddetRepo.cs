using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Repository
{
    public class SpjapbddetRepo : Repo<Spjapbddet>, ISpjapbddetRepo
    {
        public SpjapbddetRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<PrimengTableResult<Spjapbddet>> Paging(PrimengTableParam<SpjapbddetGet> param)
        {
            PrimengTableResult<Spjapbddet> Result = new PrimengTableResult<Spjapbddet>();
            IQueryable<Spjapbddet> query = (
                from data in _BludContext.Spjapbddet
                join spj in _BludContext.Spjapbd on data.Idspjapbd equals spj.Idspjapbd into spjMacth
                from spjData in spjMacth.DefaultIfEmpty()
                join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMacth
                from danaData in danaMacth.DefaultIfEmpty()
                join kas in _BludContext.Jtrnlkas on data.Idnojetra equals kas.Idnojetra into kasMacth
                from kasData in kasMacth.DefaultIfEmpty()
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek into rekMacth
                from rekData in rekMacth.DefaultIfEmpty()
                select new Spjapbddet
                {
                    Idspjapbddet = data.Idspjapbddet,
                    Idrek = data.Idrek,
                    Idnojetra = data.Idnojetra,
                    Idjdana = data.Idjdana,
                    Nilai = data.Nilai,
                    Idspjapbd = data.Idspjapbd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdjdanaNavigation = danaData ?? null,
                    IdnojetraNavigation = kasData ?? null,
                    IdrekNavigation = rekData ?? null,
                    IdspjapbdNavigation = spjData ?? null
                }
                ).AsQueryable();
            if (param.Parameters != null)
            {
                if (param.Parameters.Idspjapbd.ToString() != "0")
                {
                    query = query.Where(w => w.Idspjapbd == param.Parameters.Idspjapbd).AsQueryable();
                }
                if (param.Parameters.Idnojetra.ToString() != "0")
                {
                    query = query.Where(w => w.Idnojetra == param.Parameters.Idnojetra).AsQueryable();
                }
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                query = query.Where(w =>
                    EF.Functions.Like(w.IdrekNavigation.Kdper.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdrekNavigation.Nmper.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.IdjdanaNavigation.Nmdana.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "idrekNavigation.kdper")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdrekNavigation.Kdper).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdrekNavigation.Kdper).AsQueryable();
                    }
                }
                else if (param.SortField == "idrekNavigation.nmper")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdrekNavigation.Nmper).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdrekNavigation.Nmper).AsQueryable();
                    }
                }
                else if (param.SortField == "idjdanaNavigation.nmdana")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.IdjdanaNavigation.Nmdana).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.IdjdanaNavigation.Nmdana).AsQueryable();
                    }
                }
                else if (param.SortField == "nilai")
                {
                    if (param.SortOrder > 0)
                    {
                        query = query.OrderBy(o => o.Nilai).AsQueryable();
                    }
                    else
                    {
                        query = query.OrderByDescending(o => o.Nilai).AsQueryable();
                    }
                }
            }
            Result.Data = await query.Skip(param.Start).Take(param.Rows).ToListAsync();
            Result.Totalrecords = await query.CountAsync();
            return Result;
        }

        public async Task<bool> Update(Spjapbddet param)
        {
            Spjapbddet data = await _BludContext.Spjapbddet.Where(w => w.Idspjapbddet == param.Idspjapbddet).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Idrek = param.Idrek;
            data.Idjdana = param.Idjdana;
            data.Idnojetra = param.Idnojetra;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Spjapbddet.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Spjapbddet> ViewData(long Idspjapbddet)
        {
            Spjapbddet result = await (
                from data in _BludContext.Spjapbddet
                join spj in _BludContext.Spjapbd on data.Idspjapbd equals spj.Idspjapbd into spjMacth
                from spjData in spjMacth.DefaultIfEmpty()
                join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMacth
                from danaData in danaMacth.DefaultIfEmpty()
                join kas in _BludContext.Jtrnlkas on data.Idnojetra equals kas.Idnojetra into kasMacth
                from kasData in kasMacth.DefaultIfEmpty()
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek into rekMacth
                from rekData in rekMacth.DefaultIfEmpty()
                where data.Idspjapbddet == Idspjapbddet
                select new Spjapbddet
                {
                    Idspjapbddet = data.Idspjapbddet,
                    Idrek = data.Idrek,
                    Idnojetra = data.Idnojetra,
                    Idjdana = data.Idjdana,
                    Nilai = data.Nilai,
                    Idspjapbd = data.Idspjapbd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdjdanaNavigation = danaData ?? null,
                    IdnojetraNavigation = kasData ?? null,
                    IdrekNavigation = rekData ?? null,
                    IdspjapbdNavigation = spjData ?? null
                }
                ).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<Spjapbddet>> ViewDatas(SpjapbddetGet param)
        {
            IQueryable<Spjapbddet> query = (
                from data in _BludContext.Spjapbddet
                join spj in _BludContext.Spjapbd on data.Idspjapbd equals spj.Idspjapbd into spjMacth
                from spjData in spjMacth.DefaultIfEmpty()
                join dana in _BludContext.Jdana on data.Idjdana equals dana.Idjdana into danaMacth
                from danaData in danaMacth.DefaultIfEmpty()
                join kas in _BludContext.Jtrnlkas on data.Idnojetra equals kas.Idnojetra into kasMacth
                from kasData in kasMacth.DefaultIfEmpty()
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek into rekMacth
                from rekData in rekMacth.DefaultIfEmpty()
                select new Spjapbddet
                {
                    Idspjapbddet = data.Idspjapbddet,
                    Idrek = data.Idrek,
                    Idnojetra = data.Idnojetra,
                    Idjdana = data.Idjdana,
                    Nilai = data.Nilai,
                    Idspjapbd = data.Idspjapbd,
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    IdjdanaNavigation = danaData ?? null,
                    IdnojetraNavigation = kasData ?? null,
                    IdrekNavigation = rekData ?? null,
                    IdspjapbdNavigation = spjData ?? null
                }
                ).AsQueryable();
            if (param.Idspjapbd.ToString() != "0")
            {
                query = query.Where(w => w.Idspjapbd == param.Idspjapbd).AsQueryable();
            }
            if (param.Idnojetra.ToString() != "0")
            {
                query = query.Where(w => w.Idnojetra == param.Idnojetra).AsQueryable();
            }
            List<Spjapbddet> datas = await query.ToListAsync();
            return datas;
        }
    }
}
