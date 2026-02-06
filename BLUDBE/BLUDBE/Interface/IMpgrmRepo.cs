using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IMpgrmRepo : IRepo<Mpgrm>
    {
        Task<List<LookupTree>> Tree(long Idurus);
        Task<PrimengTableResult<Mpgrm>> Paging(PrimengTableParam<MpgrmGet> param);
        Task<List<Mpgrm>> ViewDatas(MpgrmGet param);
        Task<Mpgrm> ViewData(long Idprgrm);
        Task<bool> Update(Mpgrm param);
    }
}
