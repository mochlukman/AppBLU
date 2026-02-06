using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkpajakdetstrRepo : IRepo<Bkpajakdetstr>
    {
        Task<List<Bkpajakdetstr>> ViewDatas(long Idbkpajak);
        Task<Bkpajakdetstr> ViewData(long Idbkpajakdetstr);
        Task<bool> Update(Bkpajakdetstr param);
    }
}
