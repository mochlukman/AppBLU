using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkabRepo : IRepo<Rkab>
    {
        Task<PrimengTableResult<RkabView>> Paging(PrimengTableParam<RkaGlobalGet> param);
        Task<List<RkabView>> ViewDatas(RkaGlobalGet param);
        Task<RkabView> ViewData(long Idrkab);
        Task<bool> Update(Rkab param);
        void CalculateNilai(long Idrkab);
        Task<decimal?> TotalNilai(long Idunit, int? Trkr);
    }
}
