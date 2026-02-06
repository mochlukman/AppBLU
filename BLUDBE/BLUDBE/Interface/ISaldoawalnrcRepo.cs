using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISaldoawalnrcRepo : IRepo<Saldoawalnrc>
    {
        Task<List<Saldoawalnrc>> ViewDatas(long Idunit);
        Task<Saldoawalnrc> ViewData(long Idsaldo);
        Task<bool> Update(Saldoawalnrc param);
    }
}
