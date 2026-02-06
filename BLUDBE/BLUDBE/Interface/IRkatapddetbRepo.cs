using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapddetbRepo : IRepo<Rkatapddetb>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapddetbView>> Paging(PrimengTableParam<RkatapddetGet> param);
        Task<RkatapddetbView> ViewData(long Idtapddet);
        Task<bool> Update(Rkatapddetb param);
    }
}
