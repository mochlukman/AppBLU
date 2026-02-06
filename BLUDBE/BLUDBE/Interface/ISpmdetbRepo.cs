using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpmdetbRepo : IRepo<Spmdetb>
    {
        Task<List<Spmdetb>> ViewDatas(long Idspm);
        Task<Spmdetb> ViewData(long Idspmdetb);
        Task<bool> Update(Spmdetb param);
    }
}
