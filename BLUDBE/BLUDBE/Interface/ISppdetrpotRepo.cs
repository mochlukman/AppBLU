using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISppdetrpotRepo : IRepo<Sppdetrpot>
    {
        Task<List<Sppdetrpot>> ViewDatas(long Idsppdetr);
        Task<Sppdetrpot> ViewData(long Idsppdetrpot);
        Task<bool> Update(Sppdetrpot param);
    }
}
