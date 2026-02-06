using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapdbRepo : IRepo<Rkatapdb>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapdbView>> Paging(PrimengTableParam<RkatapdGet> param);
        Task<RkatapdbView> ViewData(long Idtapd);
        Task<bool> Update(Rkatapdb param);
    }
}
