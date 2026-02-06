using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBpkspjRepo : IRepo<Bpkspj>
    {
        Task<BpkspjView> ViewData(long Idbpkspj);
        Task<List<BpkspjView>> BySpj(long Idspj);
        Task<List<BpkspjView>> ByBpk(long Idbpk);
    }
}
