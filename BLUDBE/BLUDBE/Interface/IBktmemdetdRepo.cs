using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBktmemdetdRepo : IRepo<Bktmemdetd>
    {
        Task<bool> Update(long Idbmdet, long Nilai);
    }
}
