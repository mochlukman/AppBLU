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
    public class RkadetdRepo : Repo<Rkadetd>, IRkadetdRepo
    {
        public RkadetdRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public void GetLastChild(long Idrkadetd)
        {
            List<Rkadetd> child = _BludContext.Rkadetd.Where(w => w.Idrkadetdduk == Idrkadetd).ToList();
            if(child.Count() > 0)
            {
                for(var i = 0; i < child.Count(); i++)
                {
                    GetLastChild(child[i].Idrkadetd);
                }
            }
            else
            {
                Rkadetd data = _BludContext.Rkadetd.Where(w => w.Idrkadetd == Idrkadetd).FirstOrDefault();
                if(data != null)
                {
                    CalculateSubTotal(data.Idrkadetdduk);
                }
            }
        }
        public void CalculateSubTotal(long? Idrkadetdduk)
        {
            Rkadetd parent = _BludContext.Rkadetd.Where(w => w.Idrkadetd == Idrkadetdduk).FirstOrDefault();
            if (parent != null)
            {
                decimal? subTotalChild = _BludContext.Rkadetd.Where(w => w.Idrkadetdduk == parent.Idrkadetd).Sum(s => s.Subtotal);
                parent.Subtotal = subTotalChild;
                _BludContext.Rkadetd.Update(parent);
                if (_BludContext.SaveChanges() > 0)
                {
                    CalculateSubTotal(parent.Idrkadetdduk);
                }
            }
        }
        public async Task<PrimengTableResult<Rkadetd>> Paging(PrimengTableParam<RkadetdGet> param)
        {
            PrimengTableResult<Rkadetd> Result = new PrimengTableResult<Rkadetd>();
            IQueryable<Rkadetd> Query = (
                 from data in _BludContext.Rkadetd
                 join rka in _BludContext.Rkad on data.Idrkad equals rka.Idrkad
                 select new Rkadetd
                 {
                     Createdby = data.Createdby,
                     Createddate = data.Createddate,
                     Ekspresi = data.Ekspresi,
                     Idrkad = data.Idrkad,
                     Idrkadetd = data.Idrkadetd,
                     Idrkadetdduk = data.Idrkadetdduk,
                     IdrkadNavigation = rka ?? null,
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
            if(param.Parameters.Idrkad.ToString() != "0")
            {
                Query = Query.Where(w => w.Idrkad == param.Parameters.Idrkad).AsQueryable();
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

        public async Task<bool> Update(Rkadetd param)
        {
            Rkadetd data = await _BludContext.Rkadetd.Where(w => w.Idrkadetd == param.Idrkadetd).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Kdjabar = param.Kdjabar;
            data.Uraian = param.Uraian;
            data.Ekspresi = param.Ekspresi;
            data.Satuan = param.Satuan;
            data.Tarif = param.Tarif;
            data.Subtotal = param.Subtotal;
            data.Jumbyek = param.Jumbyek;
            _BludContext.Rkadetd.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public void UpdateToHeader(long Idrkadetd)
        {
            Rkadetd data = _BludContext.Rkadetd.Where(w => w.Idrkadetd == Idrkadetd).FirstOrDefault();
            decimal? totalChild = _BludContext.Rkadetd.Where(w => w.Idrkadetdduk == Idrkadetd).Sum(s => s.Subtotal);
            if (data != null)
            {
                data.Type = "H";
                data.Subtotal = totalChild;
                data.Jumbyek = 1;
                data.Ekspresi = "1";
                data.Satuan = null;
                data.Tarif = 0;
                _BludContext.Rkadetd.Update(data);
                _BludContext.SaveChanges();
            }
        }

        public async Task<Rkadetd> ViewData(long Idrkadetd)
        {
            Rkadetd Result = await (
                from data in _BludContext.Rkadetd
                join rka in _BludContext.Rkad on data.Idrkad equals rka.Idrkad
                where data.Idrkadetd == Idrkadetd
                select new Rkadetd
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkad = data.Idrkad,
                    Idrkadetd = data.Idrkadetd,
                    Idrkadetdduk = data.Idrkadetdduk,
                    IdrkadNavigation = rka ?? null,
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

        public async Task<List<Rkadetd>> ViewDatas(RkadetdGet param)
        {
            List<Rkadetd> Result = await(
                from data in _BludContext.Rkadetd
                join rka in _BludContext.Rkad on data.Idrkad equals rka.Idrkad
                where data.Idrkad == param.Idrkad
                select new Rkadetd
                {
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Ekspresi = data.Ekspresi,
                    Idrkad = data.Idrkad,
                    Idrkadetd = data.Idrkadetd,
                    Idrkadetdduk = data.Idrkadetdduk,
                    IdrkadNavigation = rka ?? null,
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
