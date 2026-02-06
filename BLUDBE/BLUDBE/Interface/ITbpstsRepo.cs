using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ITbpstsRepo : IRepo<Tbpsts>
    {
        Task<List<Tbpsts>> GetByTbp(long Idtbp);
        Task<List<Tbpsts>> GetBySts(long Idsts);
        Task<Tbpsts> ViewData(long Idtbp, long Idsts);
    }
}
