using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkpajakRepo : IRepo<Bkpajak>
    {
        Task<List<Bkpajak>> ViewDatas(long Idunit, long Idbend, string Kdstatus);
        Task<Bkpajak> ViewData(long Idbkpajak);
        Task<bool> Update(Bkpajak param);
    }
}
