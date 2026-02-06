using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDaftbarangRepo : IRepo<Daftbarang>
    {
        Task<PrimengTableResult<Daftbarang>> Paging(PrimengTableParam<DaftbarangGet> param);
        Task<List<Daftbarang>> ViewDatas(DaftbarangGet param);
        Task<Daftbarang> ViewData(long Idbrg);
        Task<bool> Update(Daftbarang param);
    }
}
