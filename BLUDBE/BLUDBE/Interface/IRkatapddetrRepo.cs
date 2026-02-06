using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapddetrRepo : IRepo<Rkatapddetr>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapddetrView>> Paging(PrimengTableParam<RkatapddetGet> param);
        Task<RkatapddetrView> ViewData(long Idtapddet);
        Task<bool> Update(Rkatapddetr param);
    }
}
