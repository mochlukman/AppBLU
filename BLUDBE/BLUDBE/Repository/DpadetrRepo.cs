using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class DpadetrRepo : Repo<Dpadetr>, IDpadetrRepo
    {
        public DpadetrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<string> GetKodeInduk(long iddpadet, long iddpa)
        {
            string kode = await _BludContext.Dpadetr.Where(w => w.Iddpadetr == iddpadet && w.Iddpar == iddpa)
                 .Select(s => s.Kdjabar.Trim()).FirstOrDefaultAsync();
            return kode;
        }

        public async Task<decimal?> getSubTotal(long iddpa)
        {
            decimal? total = await _BludContext.Dpadetr.Where(w =>
                             w.Iddpar == iddpa &&
                             (w.Iddpadetrduk == 0 || String.IsNullOrEmpty(w.Iddpadetrduk.ToString())))
                             .Select(s => s.Subtotal)
                             .SumAsync();
            return total;
        }

        public async Task<bool> Update(Dpadetr param)
        {
            Dpadetr data = await _BludContext.Dpadetr.Where(w => w.Iddpadetr == param.Iddpadetr).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Uraian = param.Uraian;
            data.Ekspresi = param.Ekspresi;
            data.Jumbyek = param.Jumbyek;
            data.Kdjabar = param.Kdjabar;
            data.Iddpadetrduk = param.Iddpadetrduk;
            data.Satuan = param.Satuan;
            data.Tarif = param.Tarif;
            data.Subtotal = param.Subtotal;
            data.Idsatuan = param.Idsatuan;
            data.Type = param.Type;
            _BludContext.Dpadetr.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public void UpdateNilaiInduk(long? iddpadetduk, long iddpa)
        {
            decimal? total = _BludContext.Dpadetr.Where(w => w.Iddpadetrduk == iddpadetduk && w.Iddpar == iddpa)
               .Select(s => s.Subtotal)
               .Sum();
            Dpadetr data = _BludContext.Dpadetr.Where(w => w.Iddpadetr == iddpadetduk && w.Iddpar == iddpa).FirstOrDefault();
            if (data != null)
            {
                data.Subtotal = total;
                _BludContext.Dpadetr.Update(data);
                _BludContext.SaveChanges();
                if (data.Iddpadetrduk != 0 || !String.IsNullOrEmpty(data.Iddpadetrduk.ToString()))
                    UpdateNilaiInduk(data.Iddpadetrduk, data.Iddpar);
            }
        }

        public void UpdateType(long iddpadetduk, long iddpa, string type)
        {
            Dpadetr data = _BludContext.Dpadetr.Where(w => w.Iddpadetr == iddpadetduk && w.Iddpar == iddpa).FirstOrDefault();
            if (data != null)
            {
                data.Type = type;
                _BludContext.Dpadetr.Update(data);
                _BludContext.SaveChanges();
            }
        }
    }
}
