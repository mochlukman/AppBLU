using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpablnbRepo : IRepo<Dpablnb>
    {
        Task<decimal?> TotalNilai(long Iddpab);
        Task<bool> Update(DpablnbView param);
    }
}
