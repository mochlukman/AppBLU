using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkadanarRepo : IRepo<Rkadanar>
    {
        Task<RkadanarView> ViewData(long Idrkadana);
        Task<List<RkadanarView>> ViewDatas(long Idrka);
        Task<bool> Update(Rkadanar param);

    }
}
