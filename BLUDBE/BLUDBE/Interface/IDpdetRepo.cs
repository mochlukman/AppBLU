using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpdetRepo : IRepo<Dpdet>
    {
        Task<Dpdet> ViewData(long Iddpdet);
        Task<List<Dpdet>> ViewDatas(long Iddp);
    }
}
