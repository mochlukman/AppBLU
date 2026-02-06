using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkadRepo : IRepo<Rkad>
    {
        Task<PrimengTableResult<RkadView>> Paging(PrimengTableParam<RkaGlobalGet> param);
        Task<List<RkadView>> ViewDatas(RkaGlobalGet param);
        Task<RkadView> ViewData(long Idrkad);
        Task<bool> Update(Rkad param);
        void CalculateNilai(long Idrkad);
        Task<decimal?> TotalNilai(long Idunit, long? Idrkadx);
    }
}
