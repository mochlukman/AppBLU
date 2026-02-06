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
    public class RkadetrRepo : Repo<Rkadetr>, IRkadetrRepo
    {
        public RkadetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public void GetLastChild(long Idrkadetr)
        {
            List<Rkadetr> child = _BludContext.Rkadetr.Where(w => w.Idrkadetrduk == Idrkadetr).ToList();
            if (child.Count() > 0)
            {
                for (var i = 0; i < child.Count(); i++)
                {
                    GetLastChild(child[i].Idrkadetr);
                }
            }
            else
            {
                Rkadetr data = _BludContext.Rkadetr.Where(w => w.Idrkadetr == Idrkadetr).FirstOrDefault();
                if (data != null)
                {
                    CalculateSubTotal(data.Idrkadetrduk);
                }
            }
        }
        public void CalculateSubTotal(long? Idrkadetrduk)
        {
            Rkadetr parent = _BludContext.Rkadetr.Where(w => w.Idrkadetr == Idrkadetrduk).FirstOrDefault();
            if (parent != null)
            {
                decimal? subTotalChild = _BludContext.Rkadetr.Where(w => w.Idrkadetrduk == parent.Idrkadetr).Sum(s => s.Subtotal);
                parent.Subtotal = subTotalChild;
                _BludContext.Rkadetr.Update(parent);
                if (_BludContext.SaveChanges() > 0)
                {
                    CalculateSubTotal(parent.Idrkadetrduk);
                }
            }
        }
        public async Task<PrimengTableResult<Rkadetr>> Paging(PrimengTableParam<RkadetrGet> param)
        {
            PrimengTableResult<Rkadetr> Result = new PrimengTableResult<Rkadetr>();
            IQueryable<Rkadetr> Query = (
                 from data in _BludContext.Rkadetr
                 join rka in _BludContext.Rkar on data.Idrkar equals rka.Idrkar
                 join ssh in _BludContext.Ssh on data.Idssh equals ssh.Idssh into sshMatch from sshData in sshMatch.DefaultIfEmpty()
                 join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana into jdanaMatch from jdanaData in jdanaMatch.DefaultIfEmpty()
                 select new Rkadetr
                 {
                     Createdby = data.Createdby,
                     Createddate = data.Createddate,
                     Ekspresi = data.Ekspresi,
                     Idrkar = data.Idrkar,
                     Idrkadetr = data.Idrkadetr,
                     Idrkadetrduk = data.Idrkadetrduk,
                     IdrkarNavigation = rka ?? null,
                     Idsatuan = data.Idsatuan,
                     Idssh = data.Idssh,
                     IdsshNavigation = sshData ?? null,
                     Inclsubtotal = data.Inclsubtotal,
                     Jumbyek = data.Jumbyek,
                     Kdjabar = data.Kdjabar,
                     Satuan = data.Satuan,
                     Subtotal = data.Subtotal,
                     Tarif = data.Tarif,
                     Type = data.Type,
                     Updateby = data.Updateby,
                     Updatetime = data.Updatetime,
                     Uraian = data.Uraian,
                     Idjdana = data.Idjdana,
                     IdjdanaNavigation = jdanaData ?? null
                 }
                ).AsQueryable();
            if (param.Parameters.Idrkar.ToString() != "0")
            {
                Query = Query.Where(w => w.Idrkar == param.Parameters.Idrkar).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.GlobalFilter))
            {
                Query = Query.Where(w => EF.Functions.Like(w.Kdjabar.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Uraian.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Ekspresi.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Jumbyek.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Satuan.Trim(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Tarif.ToString(), "%" + param.GlobalFilter + "%") ||
                    EF.Functions.Like(w.Type.Trim(), "%" + param.GlobalFilter + "%")
                ).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.SortField))
            {
                if (param.SortField == "kdjabar")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Kdjabar).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Kdjabar).AsQueryable();
                    }
                }
                else if (param.SortField == "idjdanaNavigation.nmdana")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.IdjdanaNavigation.Nmdana).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.IdjdanaNavigation.Nmdana).AsQueryable();
                    }
                }
                else if (param.SortField == "ekspresi")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Ekspresi).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Ekspresi).AsQueryable();
                    }
                }
                else if (param.SortField == "satuan")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Satuan).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Satuan).AsQueryable();
                    }
                }
                else if (param.SortField == "tarif")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Tarif).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Tarif).AsQueryable();
                    }
                }
                else if (param.SortField == "subtotal")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Subtotal).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Subtotal).AsQueryable();
                    }
                }
                else if (param.SortField == "type")
                {
                    if (param.SortOrder > 0)
                    {
                        Query = Query.OrderBy(o => o.Type).AsQueryable();
                    }
                    else
                    {
                        Query = Query.OrderByDescending(o => o.Type).AsQueryable();
                    }
                }
            }
            Result.Totalrecords = await Query.CountAsync();
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).ToListAsync();
            if (Result.Data.Count() > 0)
            {
                Result.OptionalResult = new PrimengTableResultOptional
                {
                    TotalNilai = Query.Where(w => w.Type.Trim() == "D").Sum(s => s.Subtotal)
                };
            }
            return Result;
        }

        public async Task<bool> Update(Rkadetr param)
        {
            Rkadetr data = await _BludContext.Rkadetr.Where(w => w.Idrkadetr == param.Idrkadetr).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdjabar = param.Kdjabar;
            data.Uraian = param.Uraian;
            data.Ekspresi = param.Ekspresi;
            data.Satuan = param.Satuan;
            data.Tarif = param.Tarif;
            data.Subtotal = param.Subtotal;
            data.Jumbyek = param.Jumbyek;
            data.Idssh = param.Idssh;
            data.Idjdana = param.Idjdana;
            _BludContext.Rkadetr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public void UpdateToHeader(long Idrkadetr)
        {
            Rkadetr data = _BludContext.Rkadetr.Where(w => w.Idrkadetr == Idrkadetr).FirstOrDefault();
            decimal? totalChild = _BludContext.Rkadetr.Where(w => w.Idrkadetrduk == Idrkadetr).Sum(s => s.Subtotal);
            if (data != null)
            {
                data.Type = "H";
                data.Subtotal = totalChild;
                data.Jumbyek = 1;
                data.Ekspresi = "1";
                data.Satuan = null;
                data.Tarif = 0;
                _BludContext.Rkadetr.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<Rkadetr> ViewData(long Idrkadetr)
        {
            Rkadetr Result = await (
                from data in _BludContext.Rkadetr
                join rka in _BludContext.Rkar on data.Idrkar equals rka.Idrkar
                join ssh in _BludContext.Ssh on data.Idssh equals ssh.Idssh into sshMatch
                from sshData in sshMatch.DefaultIfEmpty()
                join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana into jdanaMatch
                from jdanaData in jdanaMatch.DefaultIfEmpty()
                where data.Idrkadetr == Idrkadetr
                select new Rkadetr
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkar = data.Idrkar,
                    Idrkadetr = data.Idrkadetr,
                    Idrkadetrduk = data.Idrkadetrduk,
                    IdrkarNavigation = rka ?? null,
                    Idsatuan = data.Idsatuan,
                    Idssh = data.Idssh,
                    IdsshNavigation = sshData ?? null,
                    Inclsubtotal = data.Inclsubtotal,
                    Jumbyek = data.Jumbyek,
                    Kdjabar = data.Kdjabar,
                    Satuan = data.Satuan,
                    Subtotal = data.Subtotal,
                    Tarif = data.Tarif,
                    Type = data.Type,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian,
                    Idjdana = data.Idjdana,
                    IdjdanaNavigation = jdanaData ?? null
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Rkadetr>> ViewDatas(RkadetrGet param)
        {
            List<Rkadetr> Result = await (
               from data in _BludContext.Rkadetr
               join rka in _BludContext.Rkar on data.Idrkar equals rka.Idrkar
               join ssh in _BludContext.Ssh on data.Idssh equals ssh.Idssh into sshMatch
               from sshData in sshMatch.DefaultIfEmpty()
               join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana into jdanaMatch
               from jdanaData in jdanaMatch.DefaultIfEmpty()
               where data.Idrkar == param.Idrkar
                select new Rkadetr
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkar = data.Idrkar,
                    Idrkadetr = data.Idrkadetr,
                    Idrkadetrduk = data.Idrkadetrduk,
                    IdrkarNavigation = rka ?? null,
                    Idsatuan = data.Idsatuan,
                    Idssh = data.Idssh,
                    IdsshNavigation = sshData ?? null,
                    Inclsubtotal = data.Inclsubtotal,
                    Jumbyek = data.Jumbyek,
                    Kdjabar = data.Kdjabar,
                    Satuan = data.Satuan,
                    Subtotal = data.Subtotal,
                    Tarif = data.Tarif,
                    Type = data.Type,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian,
                    Idjdana = data.Idjdana,
                    IdjdanaNavigation = jdanaData ?? null
                }
                ).ToListAsync();
            return Result;
        }
    }
}
