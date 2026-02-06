using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IJbendRepo : IRepo<Jbend>
    {
        Task<bool> Update(Jbend param);
    }
}
