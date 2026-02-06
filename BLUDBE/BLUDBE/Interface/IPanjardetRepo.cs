using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IPanjardetRepo : IRepo<Panjardet>
    {
        Task<List<PanjardetView>> ViewDatas(long Idpanjar);
        Task<PanjardetView> ViewData(long Idpanjardet);
        Task<decimal?> TotalNilai(long Idpanjar);
        Task<decimal?> TotalNilaiPanjar(List<long> Idpanjar);
        Task<bool> Update(Panjardet param);
    }
}
