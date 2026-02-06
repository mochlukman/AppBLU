using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISaldoawallraRepo : IRepo<Saldoawallra>
    {
        Task<List<Saldoawallra>> ViewDatas(long Idunit, long Idjnsakun);
        Task<Saldoawallra> ViewData(long Idsaldo);
        Task<bool> Update(Saldoawallra param);
    }
}
