using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IAdendumRepo : IRepo<Adendum>
    {
        Task<bool> Update(Adendum param);
    }
}
