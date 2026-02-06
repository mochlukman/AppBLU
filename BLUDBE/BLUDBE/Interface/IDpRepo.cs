using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDpRepo : IRepo<Dp>
    {
        Task<string> GenerateNo();
        Task<PrimengTableResult<Dp>> Paging(PrimengTableParam<DpGet> param);
        Task<bool> Update(Dp param);
    }
}
