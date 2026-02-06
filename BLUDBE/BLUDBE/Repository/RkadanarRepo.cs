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
    public class RkadanarRepo : Repo<Rkadanar>, IRkadanarRepo
    {
        public RkadanarRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Rkadanar param)
        {
            Rkadanar data = await _BludContext.Rkadanar.Where(w => w.Idrkadanar == param.Idrkadanar).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Nilai = param.Nilai;
            data.Updateby = param.Updateby;
            data.Updatetime = param.Updatetime;
            _BludContext.Rkadanar.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<RkadanarView> ViewData(long Idrkadana)
        {
           RkadanarView Result = await (
               from data in _BludContext.Rkadanar
               join rka in _BludContext.Rkar on data.Idrkar equals rka.Idrkar
               join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana
               where data.Idrkadanar == Idrkadana
               select new RkadanarView
               {
                   Createddate = data.Createddate,
                   Updatetime = data.Updatetime,
                   Createdby = data.Createdby,
                   Updateby = data.Updateby,
                   Idjdana = data.Idjdana,
                   Nilai = data.Nilai,
                   IdrkarNavigation = rka ?? null,
                   IdjdanaNavigation = jdana ?? null,
                   Rkadanarx = !String.IsNullOrEmpty(data.Idrkadanarx.ToString()) ? _BludContext.Rkadanar.Where(w => w.Idrkadanar == data.Idrkadanarx).FirstOrDefault() : null,
                   Idrkadanarx = data.Idrkadanarx,
                   Idrkadanar = data.Idrkadanar,
                   Idrkar = data.Idrkar
               }
               ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<RkadanarView>> ViewDatas(long Idrka)
        {
            List<RkadanarView> Result = await (
                from data in _BludContext.Rkadanar
                join rka in _BludContext.Rkar on data.Idrkar equals rka.Idrkar
                join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana
                where data.Idrkar == Idrka
                select new RkadanarView
                {
                    Createddate = data.Createddate,
                    Updatetime = data.Updatetime,
                    Createdby = data.Createdby,
                    Updateby = data.Updateby,
                    Idjdana = data.Idjdana,
                    Nilai = data.Nilai,
                    IdrkarNavigation = rka ?? null,
                    IdjdanaNavigation = jdana ?? null,
                    Rkadanarx = !String.IsNullOrEmpty(data.Idrkadanarx.ToString()) ? _BludContext.Rkadanar.Where(w => w.Idrkadanar == data.Idrkadanarx).FirstOrDefault() : null,
                    Idrkadanarx = data.Idrkadanarx,
                    Idrkadanar = data.Idrkadanar,
                    Idrkar = data.Idrkar
                }
                ).ToListAsync();
            return Result;
        }
    }
}
