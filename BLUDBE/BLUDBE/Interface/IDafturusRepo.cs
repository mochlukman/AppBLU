using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDafturusRepo : IRepo<Dafturus>
    {
        Task<List<Dafturus>> ViewDatas(DafturusGet param);
        Task<Dafturus> ViewData(long Idurus);
        Task<PrimengTableResult<Dafturus>> Paging(PrimengTableParam<DafturusGet> param);
        Task<bool> Update(Dafturus param);
    }
}
