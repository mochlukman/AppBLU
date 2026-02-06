using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpmdetdRepo : IRepo<Spmdetd>
    {
        Task<List<Spmdetd>> ViewDatas(long Idspm);
        Task<Spmdetd> ViewData(long Idspmdetd);
        Task<bool> Update(Spmdetd param);
    }
}
