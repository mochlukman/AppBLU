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
    public class DpablnrRepo : Repo<Dpablnr>, IDpablnrRepo
    {
        public DpablnrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<decimal?> TotalNilai(long Iddpar)
        {
            decimal? Total = await _BludContext.Dpablnr.Where(w => w.Iddpar == Iddpar).Select(s => s.Nilai).SumAsync();
            return Total;
        }

        public async Task<bool> Update(DpablnrView param)
        {
            Dpablnr data = await _BludContext.Dpablnr.Where(w => w.Iddpablnr == param.Iddpablnr).FirstOrDefaultAsync();
            Dpablnr databTw4 = await _BludContext.Dpablnr.Where(w => w.Iddpar == param.Iddpar && w.Idbulan == 10).FirstOrDefaultAsync();

            decimal? NilaiAngkas = await _BludContext.Dpablnr.Where(w => w.Iddpablnr == param.Iddpablnr).Select(s => s.Nilai).SumAsync();
            decimal? TotalDpa = await _BludContext.Dpar.Where(w => w.Iddpar == param.Iddpar).Select(s => s.Nilai).SumAsync();
            decimal? TotalAngkas = await _BludContext.Dpablnr.Where(w => w.Iddpar == param.Iddpar).Select(s => s.Nilai).SumAsync();

            if (NilaiAngkas == 0)
            {
                if (TotalDpa > (TotalAngkas + param.Nilai))
                {
                    databTw4.Nilai = databTw4.Nilai + (TotalDpa - (TotalAngkas + param.Nilai));
                    _BludContext.Dpablnr.Update(databTw4);
                }
                else if (TotalDpa < (TotalAngkas + param.Nilai))
                {
                    databTw4.Nilai = databTw4.Nilai - ((TotalAngkas + param.Nilai) - TotalDpa);
                    _BludContext.Dpablnr.Update(databTw4);
                }
            }

            if (NilaiAngkas > 0)
            {
                if (TotalDpa > (TotalAngkas + param.Nilai))
                {
                    databTw4.Nilai = (TotalDpa + NilaiAngkas + databTw4.Nilai) - (TotalAngkas + param.Nilai);
                    _BludContext.Dpablnr.Update(databTw4);
                }
                else if (TotalDpa < (TotalAngkas + param.Nilai))
                {
                    databTw4.Nilai = (databTw4.Nilai + TotalDpa + NilaiAngkas ) - (TotalAngkas + param.Nilai);
                    _BludContext.Dpablnr.Update(databTw4);
                }
            }

            if (data != null)
            {
                data.Nilai = param.Nilai;
                data.Dateupdate = param.Dateupdate;

                _BludContext.Dpablnr.Update(data); 
            }
            
            if(await _BludContext.SaveChangesAsync() > 0)
                    return true;
            return false;
        }
    }
}
