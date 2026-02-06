using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISppdetbRepo : IRepo<Sppdetb>
    {
        Task<decimal?> TotalNilaiSpp(List<long> Idspp);
        Task<bool> UpdateNilai(long Idsspdetb, decimal? Nilai, DateTime? Dateupdate, string Updateby);
        Task<bool> Update(Sppdetb param);
    }
}
