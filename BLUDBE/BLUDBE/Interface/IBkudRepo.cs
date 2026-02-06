using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBkudRepo : IRepo<Bkud>
    {
        Task<bool> UpdateValid(Bkud param);
    }
}
