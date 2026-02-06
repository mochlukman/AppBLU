using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ITbpdetdRepo : IRepo<Tbpdetd>
    {
        Task<List<Tbpdetd>> ViewDatas(long Idtbp);
        Task<Tbpdetd> ViewData(long Idtbpdetd);
        Task<bool> Update(Tbpdetd param);
    }
}
