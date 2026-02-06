using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IKegsbdanaRepo : IRepo<Kegsbdana>
    {
        Task<List<KegsbdanaView>> ViewDatas(long Idkegunit);
        Task<KegsbdanaView> ViewData(long Idkegdana);
        Task<bool> Update(Kegsbdana param);
    }
}
