using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPanjarRepo : IRepo<Panjar>
    {
        Task<List<Panjar>> ViewDatas(PanjarGet param);
        Task<Panjar> ViewData(long Idpanjar);
        Task<List<long>> GetIds(long Idpanjar);
        Task<bool> Update(Panjar param);
        Task<bool> Pengesahan(Panjar param);
        Task<string> NewNomorUrut(PanjarGetUrutPost param);
    }
}
