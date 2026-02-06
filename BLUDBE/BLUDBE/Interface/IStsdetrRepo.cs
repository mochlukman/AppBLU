using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IStsdetrRepo : IRepo<Stsdetr>
    {
        Task<List<Stsdetr>> ViewDatas(long Idsts);
        Task<Stsdetr> ViewData(long Idstsdetd);
        Task<bool> Update(Stsdetr param);
    }
}
