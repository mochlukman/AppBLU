using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISp3bRepo : IRepo<Sp3b>
    {
        Task<List<Sp3b>> ViewDatas(Sp3bGet param);
        Task<bool> Pengesahan(Sp3b param);
    }
}
