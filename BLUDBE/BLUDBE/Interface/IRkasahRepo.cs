using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkasahRepo : IRepo<Rkasah>
    {
        Task<PrimengTableResult<RkasahView>> Paging(PrimengTableParam<RkaGlobalGet> param);
        Task<RkasahView> ViewData(long Idrkasah);
        Task<bool> Update(Rkasah param);
    }
}
