using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkatapdrRepo : IRepo<Rkatapdr>
    {
        Task<string> GenerateNomor(long Idrka);
        Task<PrimengTableResult<RkatapdrView>> Paging(PrimengTableParam<RkatapdGet> param);
        Task<RkatapdrView> ViewData(long Idtapd);
        Task<bool> Update(Rkatapdr param);
    }
}
