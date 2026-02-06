using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkadetdRepo : IRepo<Rkadetd>
    {
        Task<PrimengTableResult<Rkadetd>> Paging(PrimengTableParam<RkadetdGet> param);
        Task<List<Rkadetd>> ViewDatas(RkadetdGet param);
        Task<Rkadetd> ViewData(long Idrkadetd);
        Task<bool> Update(Rkadetd param);
        void UpdateToHeader(long Idrkadetd);
        void GetLastChild(long Idrkadetd);
    }
}
