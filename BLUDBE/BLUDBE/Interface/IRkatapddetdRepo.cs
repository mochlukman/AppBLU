using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapddetdRepo : IRepo<Rkatapddetd>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapddetdView>> Paging(PrimengTableParam<RkatapddetGet> param);
        Task<RkatapddetdView> ViewData(long Idtapddet);
        Task<bool> Update(Rkatapddetd param);
    }
}
