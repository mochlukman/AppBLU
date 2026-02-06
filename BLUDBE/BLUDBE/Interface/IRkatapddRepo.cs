using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapddRepo : IRepo<Rkatapdd>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapddView>> Paging(PrimengTableParam<RkatapdGet> param);
        Task<RkatapddView> ViewData(long Idtapd);
        Task<bool> Update(Rkatapdd param);
    }
}
