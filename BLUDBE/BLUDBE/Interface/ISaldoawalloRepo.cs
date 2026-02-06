using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISaldoawalloRepo : IRepo<Saldoawallo>
    {
        Task<List<Saldoawallo>> ViewDatas(long Idunit, long Idjnsakun);
        Task<Saldoawallo> ViewData(long Idsaldo);
        Task<bool> Update(Saldoawallo param);
    }
}
