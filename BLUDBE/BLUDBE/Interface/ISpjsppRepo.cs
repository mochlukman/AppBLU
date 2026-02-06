using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpjsppRepo : IRepo<Spjspp>
    {
        Task<List<SpjsppView>> GetBySpp(long Idspp, string Kdstatus);
    }
}
