using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDaftunitRepo : IRepo<Daftunit>
    {
        Task<PrimengTableResult<DaftunitView>> Paging(PrimengTableParam<DaftunitGet> param);
        Task<List<DaftunitView>> ViewDatas(DaftunitGet param);
        Task<DaftunitView> ViewData(long Idunit);
        Task<bool> Update(Daftunit param);
    }
}
