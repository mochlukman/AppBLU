using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IBpkpajakRepo : IRepo<Bpkpajak>
    {
        Task<List<BpkpajakView>> ViewDatas(BpkpajakGet param);
        Task<BpkpajakView> ViewData(long Idbpkpajak);
        Task<bool> Update(Bpkpajak param);
    }
}
