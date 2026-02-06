using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPotonganRepo : IRepo<Potongan>
    {
        Task<List<Potongan>> ViewDatas(PotonganGet param);
        Task<Potongan> ViewData(long Idpot);
        Task<bool> Update(Potongan post);
    }
}
