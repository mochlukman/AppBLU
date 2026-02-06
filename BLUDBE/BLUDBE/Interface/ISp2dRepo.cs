using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISp2dRepo : IRepo<Sp2d>
    {
        Task<PrimengTableResult<Sp2d>> ForBkuBud(PrimengTableParam<Sp2dGetForBkuBud> param);
        Task<string> GenerateNoReg(long Idunit);
        Task<bool> Update(Sp2d param);
        Task<bool> Pengesahan(Sp2d param);
        Task<List<Sp2d>> ForDp(long Iddp, int? Idxkode);
        Task<PrimengTableResult<Sp2d>> Paging(PrimengTableParam<Sp2dGet> param);
        Task<PrimengTableResult<Sp2d>> ByDp(PrimengTableParam<Sp2dGet> param);
        Task<List<Sp2d>> ViewDatas(Sp2dGet param, List<long> Sp2dIds);
        Task<Sp2d> ViewData(long Idsp2d);
    }
}
