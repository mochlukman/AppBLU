using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IBpkdetrRepo : IRepo<Bpkdetr>
    {
        Task<PrimengTableResult<Bpkdetr>> Paging(PrimengTableParam<BpkdetrGet> param);
        Task<List<Bpkdetr>> ViewDatas(BpkdetrGet param);
        Task<Bpkdetr> ViewData(long Idbpkdetr);
        Task<bool> Update(Bpkdetr param);
    }
}
