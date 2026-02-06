using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IKegunitRepo : IRepo<Kegunit>
    {
        Task<List<LookupTree>> Tree(long Idunit, string kdtahap, string type);
        Task<List<long>> IdskegByUnit(long Idunit);
        Task<PrimengTableResult<KegunitView>> Paging(PrimengTableParam<KegunitGet> param);
        Task<List<KegunitView>> ViewDatas(KegunitGet param);
        Task<KegunitView> ViewData(long Idkegunit);
        Task<bool> Update(Kegunit param);
    }
}
