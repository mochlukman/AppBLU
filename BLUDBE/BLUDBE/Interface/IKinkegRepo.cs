using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IKinkegRepo : IRepo<Kinkeg>
    {
        Task<List<KinkegView>> ViewDatas(long Idkegunit, string Kdjkk);
        Task<KinkegView> ViewData(long Idkinkeg);
        Task<PrimengTableResult<KinkegView>> Paging(PrimengTableParam<KinkegGet> param);
        Task<bool> Update(Kinkeg param);
    }
}
