using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISpjapbddetRepo : IRepo<Spjapbddet>
    {
        Task<Spjapbddet> ViewData(long Idspjapbddet);
        Task<List<Spjapbddet>> ViewDatas(SpjapbddetGet param);
        Task<PrimengTableResult<Spjapbddet>> Paging(PrimengTableParam<SpjapbddetGet> param);
        Task<bool> Update(Spjapbddet param);
    }
}
