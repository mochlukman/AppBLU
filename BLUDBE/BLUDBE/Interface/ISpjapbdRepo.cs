using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISpjapbdRepo : IRepo<Spjapbd>
    {
        Task<Spjapbd> ViewData(long Idspjapbd);
        Task<List<Spjapbd>> ViewDatas(SpjapbdGet param);
        Task<PrimengTableResult<Spjapbd>> Paging(PrimengTableParam<SpjapbdGet> param);
        Task<bool> Update(Spjapbd param);
        Task<bool> Pengesahan(Spjapbd param);
    }
}
