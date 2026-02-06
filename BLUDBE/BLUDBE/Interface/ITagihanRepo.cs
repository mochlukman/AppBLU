using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ITagihanRepo : IRepo<Tagihan>
    {
        Task<List<TagihanView>> ViewDatas(long Idunit, long Idkeg, string Kdstatus, bool isValid);
        Task<bool> Update(Tagihan param);
        Task<bool> Pengesahan(Tagihan param);
        Task<PrimengTableResult<Tagihan>> Paging(PrimengTableParam<TagihanGet> param);
    }
}
