using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpabRepo : IRepo<Dpab>
    {
        Task<List<DpabView>> GetByStsdetd(long Idunit, long Idsts);
        Task<bool> UpdateNilai(Dpadetb param, decimal? newTotal);
        Task<decimal?> GetNilai(long Iddpab);
    }
}
