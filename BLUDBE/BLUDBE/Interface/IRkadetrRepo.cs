using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IRkadetrRepo : IRepo<Rkadetr>
    {
        Task<PrimengTableResult<Rkadetr>> Paging(PrimengTableParam<RkadetrGet> param);
        Task<List<Rkadetr>> ViewDatas(RkadetrGet param);
        Task<Rkadetr> ViewData(long Idrkadetr);
        Task<bool> Update(Rkadetr param);
        void UpdateToHeader(long Idrkadetr);
        void GetLastChild(long Idrkadetr);
    }
}
