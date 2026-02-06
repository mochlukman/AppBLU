using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkuRepo : IRepo<Bkusp2d>
    {
        Task<string> GenerateNoBKU(long Idunit, long Idbend);
        Task<string> GererateNoBKUPenerimaan(long Idunit, long Idbend);
        Task<string> GenerateNoBKUBUD(long Idbend);
    }
}
