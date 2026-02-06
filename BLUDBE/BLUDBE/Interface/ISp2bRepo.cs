using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISp2bRepo : IRepo<Sp2b>
    {
        Task<List<Sp2b>> ViewDatas(Sp2bGet param);
        Task<bool> Pengesahan(Sp2b param);
    }
}
