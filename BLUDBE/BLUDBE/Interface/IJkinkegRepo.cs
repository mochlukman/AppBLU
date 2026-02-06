using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IJkinkegRepo : IRepo<Jkinkeg>
    {
        Task<bool> Update(Jkinkeg param);
        Task<PrimengTableResult<Jkinkeg>> Paging(PrimengTableParam<Jkinkeg> param);
    }
}
