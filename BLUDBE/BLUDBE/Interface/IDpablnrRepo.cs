using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpablnrRepo : IRepo<Dpablnr>
    {
        Task<decimal?> TotalNilai(long Iddpar);
        Task<bool> Update(DpablnrView param);
    }
}
