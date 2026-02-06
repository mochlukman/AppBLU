using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkutbpRepo : IRepo<Bkutbp>
    {
        Task<List<Bkutbp>> ViewDatas(long Idunit, long Idbend);
        Task<List<Bkutbp>> ViewDatasForSpjtr(long Idspjtr, long Idunit, long Idbend);
        Task<bool> UpdateValid(Bkutbp param);
    }
}
