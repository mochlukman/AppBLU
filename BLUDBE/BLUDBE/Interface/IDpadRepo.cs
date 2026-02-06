using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDpadRepo : IRepo<Dpad>
    {
        Task<List<DpadView>> ViewDatas(DpaRekGet param);
        Task<DpadView> ViewData(long Iddpad);
        Task<bool> Update(Dpad param);
        Task<bool> UpdateNilai(Dpadetd param, decimal? newTotal);
        Task<decimal?> GetNilai(long Iddpad);
    }
}
