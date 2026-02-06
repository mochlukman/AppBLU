using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpddetrRepo : IRepo<Spddetr>
    {
        Task<decimal?> TotalNilaiSpd(long Idspd);
        Task<List<long>> GetIdReks(long Idspd, long Idkeg);
        Task<List<SpddetrViewTreeRoot>> TreetableFromSubkegiatan(long Idspd);
        Task<bool> UpdateNilai(long Idssddetr, decimal? Nilai, DateTime? Dateupdate);
    }
}
