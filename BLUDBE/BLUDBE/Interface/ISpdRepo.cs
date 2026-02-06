using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpdRepo : IRepo<Spd>
    {
        Task<bool> Update(Spd param);
        Task<List<long>> getIds(long Idunit);
        Task<bool> Pengesahan(Spd param);
    }
}
