using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IStsRepo : IRepo<Sts>
    {
        Task<PrimengTableResult<Sts>> ForBkuBud(PrimengTableParam<StsGetForBkuBud> param);
        Task<List<Sts>> ViewDatas(long Idunit, long? Idbend, long Idxkode, List<string> Kdstatus);
        Task<List<Sts>> ViewDatas(long Idunit,long Idxkode);
        Task<List<Sts>> ViewDatasForBku(List<long>Idsts, long Idunit, long? Idbend, long Idxkode, List<string> Kdstatus);
        Task<Sts> ViewData(long Idsts);
        Task<bool> Update(Sts param);
        Task<bool> Pengesahan(Sts param);
        Task<PrimengTableResult<Sts>> Paging(PrimengTableParam<StsGet> param);
        Task<string> GenerateNoReg(long Idunit);
    }
}
