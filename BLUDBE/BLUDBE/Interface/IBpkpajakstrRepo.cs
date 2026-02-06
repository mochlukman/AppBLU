using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IBpkpajakstrRepo : IRepo<Bpkpajakstr>
    {
        Task<List<BpkpajakstrView>> ViewDatas(BpkpajakstrGet param);
        Task<BpkpajakstrView> ViewData(long Idbpkpajakstr);
        Task<bool> Update(Bpkpajakstr param);
        Task<bool> Pengesahan(Bpkpajakstr param);
    }
}
