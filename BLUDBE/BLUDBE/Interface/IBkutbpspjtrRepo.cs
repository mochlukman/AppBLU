using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkutbpspjtrRepo : IRepo<Bkutbpspjtr>
    {
        Task<List<BkutbpspjtrView>> ViewDatas(long Idspjtr);
        Task<BkutbpspjtrView> ViewData(long Idbkutbpspjtr);
    }
}
