using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISpjtrRepo : IRepo<Spjtr>
    {
        Task<Spjtr> ViewData(long Idspjtr);
        Task<List<Spjtr>> ViewDatas(SpjGetsParam param);
        Task<PrimengTableResult<Spjtr>> Paging(PrimengTableParam<SpjGetsParam> param);
        Task<bool> Update(Spjtr param);
        Task<bool> Pengesahan(Spjtr param);
    }
}
