using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkarRepo : IRepo<Rkar>
    {
        Task<PrimengTableResult<RkarView>> Paging(PrimengTableParam<RkaGlobalGet> param);
        Task<List<RkarView>> ViewDatas(RkaGlobalGet param);
        Task<RkarView> ViewData(long Idrkar);
        Task<bool> Update(Rkar param);
        void CalculateNilai(long Idrkar);
        Task<decimal?> TotalNilai(long Idunit, long Idkeg, string Kdtahap);
        Task<decimal?> TotalNilaiKeg(long Idunit, long Idkeg, string Kdtahap);
    }
}
