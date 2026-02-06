using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ILpjRepo : IRepo<Lpj>
    {
        Task<Lpj> ViewData(long Idlpj);
        Task<PrimengTableResult<Lpj>> Paging(PrimengTableParam<LpjGetsParam> param);
        Task<bool> Update(Lpj param);
        Task<bool> Pengesahan(Lpj param);
    }
}
