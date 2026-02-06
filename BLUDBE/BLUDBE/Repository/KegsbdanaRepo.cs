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
    public class KegsbdanaRepo : Repo<Kegsbdana>, IKegsbdanaRepo
    {
        public KegsbdanaRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Kegsbdana param)
        {
            Kegsbdana data = await _BludContext.Kegsbdana.Where(w => w.Idkegdana == param.Idkegdana).FirstOrDefaultAsync();
            if (data == null) return false;
            data.Nilai = param.Nilai;
            data.Dateupdate = param.Dateupdate;
            _BludContext.Kegsbdana.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0) return true;
            return false;
        }

        public async Task<KegsbdanaView> ViewData(long Idkegdana)
        {
            KegsbdanaView Result = await (
                from data in _BludContext.Kegsbdana
                join kegunit in _BludContext.Kegunit on data.Idkegunit equals kegunit.Idkegunit
                join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana
                where data.Idkegdana == Idkegdana
                select new KegsbdanaView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idjdana = data.Idjdana,
                    Idkegdana = data.Idkegdana,
                    Idkegunit = data.Idkegunit,
                    Nilai = data.Nilai,
                    IdkegunitNavigation = kegunit ?? null,
                    IdjdanaNavigation = jdana ?? null,
                    Kegsbdana = !String.IsNullOrEmpty(data.Idkegdanax.ToString()) ? _BludContext.Kegsbdana.Where(w => w.Idkegdana == data.Idkegdanax).FirstOrDefault() : null,
                    Idkegdanax = data.Idkegdanax
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<KegsbdanaView>> ViewDatas(long Idkegunit)
        {
            List<KegsbdanaView> Result = await (
                from data in _BludContext.Kegsbdana
                join kegunit in _BludContext.Kegunit on data.Idkegunit equals kegunit.Idkegunit
                join jdana in _BludContext.Jdana on data.Idjdana equals jdana.Idjdana
                where data.Idkegunit == Idkegunit
                select new KegsbdanaView
                {
                    Datecreate = data.Datecreate,
                    Dateupdate = data.Dateupdate,
                    Idjdana = data.Idjdana,
                    Idkegdana = data.Idkegdana,
                    Idkegunit = data.Idkegunit,
                    Nilai = data.Nilai,
                    IdkegunitNavigation = kegunit ?? null,
                    IdjdanaNavigation = jdana ?? null,
                    Kegsbdana = !String.IsNullOrEmpty(data.Idkegdanax.ToString()) ? _BludContext.Kegsbdana.Where(w => w.Idkegdana == data.Idkegdanax).FirstOrDefault() : null,
                    Idkegdanax = data.Idkegdanax
                }
                ).ToListAsync();
            return Result;
        }
    }
}
