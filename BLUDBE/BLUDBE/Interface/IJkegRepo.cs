using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IJkegRepo : IRepo<Jkeg>
    {
        Task<bool> Update(Jkeg param);
    }
}
