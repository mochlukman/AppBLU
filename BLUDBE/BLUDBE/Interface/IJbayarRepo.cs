using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IJbayarRepo : IRepo<Jbayar>
    {
        Task<bool> Update(Jbayar param);
    }
}
