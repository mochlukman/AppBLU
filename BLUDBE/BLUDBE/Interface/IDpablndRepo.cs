using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpablndRepo : IRepo<Dpablnd>
    {
        Task<decimal?> TotalNilai(long Iddpad);
        Task<bool> Update(DpablndView param);
    }
}
