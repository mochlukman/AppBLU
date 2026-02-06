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
    public class RkadetbRepo : Repo<Rkadetb>, IRkadetbRepo
    {
        public RkadetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public void GetLastChild(long Idrkadetb)
        {
            List<Rkadetb> child = _BludContext.Rkadetb.Where(w => w.Idrkadetbduk == Idrkadetb).ToList();
            if (child.Count() > 0)
            {
                for (var i = 0; i < child.Count(); i++)
                {
                    GetLastChild(child[i].Idrkadetb);
                }
            }
            else
            {
                Rkadetb data = _BludContext.Rkadetb.Where(w => w.Idrkadetb == Idrkadetb).FirstOrDefault();
                if (data != null)
                {
                    CalculateSubTotal(data.Idrkadetbduk);
                }
            }
        }
        public void CalculateSubTotal(long? Idrkadetbduk)
        {
            Rkadetb parent = _BludContext.Rkadetb.Where(w => w.Idrkadetb == Idrkadetbduk).FirstOrDefault();
            if (parent != null)
            {
                decimal? subTotalChild = _BludContext.Rkadetb.Where(w => w.Idrkadetbduk == parent.Idrkadetb).Sum(s => s.Subtotal);
                parent.Subtotal = subTotalChild;
                _BludContext.Rkadetb.Update(parent);
                if (_BludContext.SaveChanges() > 0)
                {
                    CalculateSubTotal(parent.Idrkadetbduk);
                }
            }
        }
        public async Task<PrimengTableResult<Rkadetb>> Paging(PrimengTableParam<RkadetbGet> param)
        {
            PrimengTableResult<Rkadetb> Result = new PrimengTableResult<Rkadetb>();
            IQueryable<Rkadetb> Query = (
                 from data in _BludContext.Rkadetb
                 join rka in _BludContext.Rkab on data.Idrkab equals rka.Idrkab
                 select new Rkadetb
                 {
                     Createdby = data.Createdby,
                     Createddate = data.Createddate,
                     Ekspresi = data.Ekspresi,
                     Idrkab = data.Idrkab,
                     Idrkadetb = data.Idrkadetb,
                     Idrkadetbduk = data.Idrkadetbduk,
                     IdrkabNavigation = rka ?? null,
                     Idsatuan = data.Idsatuan,
                     Idstdharga = data.Idstdharga,
                     Inclsubtotal = data.Inclsubtotal,
                     Jumbyek = data.Jumbyek,
                     Kdjabar = data.Kdjabar,
                     Satuan = data.Satuan,
                     Subtotal = data.Subtotal,
                     Tarif = data.Tarif,
                     Type = data.Type,
                     Updateby = data.Updateby,
                     Updatetime = data.Updatetime,
                     Uraian = data.Uraian
                 }
                ).AsQueryable();
            if (param.Parameters.Idrkab.ToString() != "0")
            {
                Query = Query.Where(w => w.Idrkab == param.Parameters.Idrkab).AsQueryable();
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
            Result.Data = await Query.Skip(param.Start).Take(param.Rows).OrderBy(o => o.Kdjabar.Trim()).ToListAsync();
            Result.Totalrecords = await Query.CountAsync();
            if (Result.Data.Count() > 0)
            {
                Result.OptionalResult = new PrimengTableResultOptional
                {
                    TotalNilai = Query.Where(w => w.Type.Trim() == "D").Sum(s => s.Subtotal)
                };
            }
            return Result;
        }

        public async Task<bool> Update(Rkadetb param)
        {
            Rkadetb data = await _BludContext.Rkadetb.Where(w => w.Idrkadetb == param.Idrkadetb).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdjabar = param.Kdjabar;
            data.Uraian = param.Uraian;
            data.Ekspresi = param.Ekspresi;
            data.Satuan = param.Satuan;
            data.Tarif = param.Tarif;
            data.Subtotal = param.Subtotal;
            data.Jumbyek = param.Jumbyek;
            _BludContext.Rkadetb.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public void UpdateToHeader(long Idrkadetb)
        {
            Rkadetb data = _BludContext.Rkadetb.Where(w => w.Idrkadetb == Idrkadetb).FirstOrDefault();
            decimal? totalChild = _BludContext.Rkadetb.Where(w => w.Idrkadetbduk == Idrkadetb).Sum(s => s.Subtotal);
            if (data != null)
            {
                data.Type = "H";
                data.Subtotal = totalChild;
                data.Jumbyek = 1;
                data.Ekspresi = "1";
                data.Satuan = null;
                data.Tarif = 0;
                _BludContext.Rkadetb.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<Rkadetb> ViewData(long Idrkadetb)
        {
            Rkadetb Result = await (
                from data in _BludContext.Rkadetb
                join rka in _BludContext.Rkab on data.Idrkab equals rka.Idrkab
                where data.Idrkadetb == Idrkadetb
                select new Rkadetb
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkab = data.Idrkab,
                    Idrkadetb = data.Idrkadetb,
                    Idrkadetbduk = data.Idrkadetbduk,
                    IdrkabNavigation = rka ?? null,
                    Idsatuan = data.Idsatuan,
                    Idstdharga = data.Idstdharga,
                    Inclsubtotal = data.Inclsubtotal,
                    Jumbyek = data.Jumbyek,
                    Kdjabar = data.Kdjabar,
                    Satuan = data.Satuan,
                    Subtotal = data.Subtotal,
                    Tarif = data.Tarif,
                    Type = data.Type,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Rkadetb>> ViewDatas(RkadetbGet param)
        {
            List<Rkadetb> Result = await (
                from data in _BludContext.Rkadetb
                join rka in _BludContext.Rkab on data.Idrkab equals rka.Idrkab
                where data.Idrkab == param.Idrkab
                select new Rkadetb
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkab = data.Idrkab,
                    Idrkadetb = data.Idrkadetb,
                    Idrkadetbduk = data.Idrkadetbduk,
                    IdrkabNavigation = rka ?? null,
                    Idsatuan = data.Idsatuan,
                    Idstdharga = data.Idstdharga,
                    Inclsubtotal = data.Inclsubtotal,
                    Jumbyek = data.Jumbyek,
                    Kdjabar = data.Kdjabar,
                    Satuan = data.Satuan,
                    Subtotal = data.Subtotal,
                    Tarif = data.Tarif,
                    Type = data.Type,
                    Updateby = data.Updateby,
                    Updatetime = data.Updatetime,
                    Uraian = data.Uraian
                }
                ).ToListAsync();
            return Result;
        }
    }
}
