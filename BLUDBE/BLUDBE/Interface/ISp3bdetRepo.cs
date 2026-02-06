using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISp3bdetRepo: IRepo<Sp3bdet>
    {
        Task<List<Sp3bdet>> ViewDatas(Sp3bdetGet param);
    }
}
