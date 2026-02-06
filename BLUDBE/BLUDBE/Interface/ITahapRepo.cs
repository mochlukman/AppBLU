using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ITahapRepo : IRepo<Tahap>
    {
        Task<PrimengTableResult<Tahap>> Paging(PrimengTableParam<TahapGet> param);
        Task<bool> Update(Tahap param);
        Task<bool> Lock(Tahap param);
    }
}
