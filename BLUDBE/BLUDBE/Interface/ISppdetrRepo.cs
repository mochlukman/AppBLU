using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISppdetrRepo : IRepo<Sppdetr>
    {
        Task<decimal?> TotalNilaiSpp(List<long> Idspp);
        Task<bool> Update(Sppdetr param);
        Task<bool> UpdateNilai(Sppdetr param);
        Task<List<SppdetrViewTreeRoot>> TreetableFromSubkegiatan(long Idspp, decimal? TotalSpp, decimal? TotalSpd);
    }
}
