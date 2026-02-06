using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DpadetbRepo : Repo<Dpadetb>, IDpadetbRepo
    {
        public DpadetbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<string> GetKodeInduk(long iddpadet, long iddpa)
        {
            string kode = await _BludContext.Dpadetb.Where(w => w.Iddpadetb == iddpadet && w.Iddpab == iddpa)
                 .Select(s => s.Kdjabar.Trim()).FirstOrDefaultAsync();
            return kode;
        }

        public async Task<decimal?> getSubTotal(long iddpa)
        {
            decimal? total = await _BludContext.Dpadetb.Where(w =>
                             w.Iddpab == iddpa &&
                             (w.Iddpadetbduk == 0 || String.IsNullOrEmpty(w.Iddpadetbduk.ToString())))
                             .Select(s => s.Subtotal)
                             .SumAsync();
            return total;
        }

        public async Task<bool> Update(Dpadetb param)
        {
            Dpadetb data = await _BludContext.Dpadetb.Where(w => w.Iddpadetb == param.Iddpadetb).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Uraian = param.Uraian;
            data.Ekspresi = param.Ekspresi;
            data.Jumbyek = param.Jumbyek;
            data.Kdjabar = param.Kdjabar;
            data.Iddpadetbduk = param.Iddpadetbduk;
            data.Satuan = param.Satuan;
            data.Tarif = param.Tarif;
            data.Subtotal = param.Subtotal;
            data.Idsatuan = param.Idsatuan;
            data.Type = param.Type;
            _BludContext.Dpadetb.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public void UpdateNilaiInduk(long? iddpadetduk, long iddpa)
        {
            decimal? total = _BludContext.Dpadetb.Where(w => w.Iddpadetbduk == iddpadetduk && w.Iddpab == iddpa)
               .Select(s => s.Subtotal)
               .Sum();
            Dpadetb data = _BludContext.Dpadetb.Where(w => w.Iddpadetb == iddpadetduk && w.Iddpab == iddpa).FirstOrDefault();
            if (data != null)
            {
                data.Subtotal = total;
                _BludContext.Dpadetb.Update(data);
                _BludContext.SaveChanges();
                if (data.Iddpadetbduk != 0 || !String.IsNullOrEmpty(data.Iddpadetbduk.ToString()))
                    UpdateNilaiInduk(data.Iddpadetbduk, data.Iddpab);
            }
        }

        public void UpdateType(long iddpadetduk, long iddpa, string type)
        {
            Dpadetb data = _BludContext.Dpadetb.Where(w => w.Iddpadetb == iddpadetduk && w.Iddpab == iddpa).FirstOrDefault();
            if (data != null)
            {
                data.Type = type;
                _BludContext.Dpadetb.Update(data);
                _BludContext.SaveChanges();
            }
        }
    }
}
