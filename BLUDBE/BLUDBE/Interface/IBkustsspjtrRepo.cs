using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkustsspjtrRepo : IRepo<Bkustsspjtr>
    {
        Task<List<BkustsspjtrView>> ViewDatas(long Idspjtr);
        Task<BkustsspjtrView> ViewData(long Idbkustsspjtr);
    }
}
