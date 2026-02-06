using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISp2bdetRepo: IRepo<Sp2bdet>
    {
        Task<List<Sp2bdet>> ViewDatas(Sp2bdetGet param);
        Task<List<dynamic>> RincianSP2B(Sp2bdetGet param);
        Task<List<dynamic>> RincianSP3B(Sp2bdetGet param);
    }
}
