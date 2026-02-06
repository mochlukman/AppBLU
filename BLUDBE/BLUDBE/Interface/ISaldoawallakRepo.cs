using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISaldoawallakRepo: IRepo<Saldoawallak>
    {
        Task<List<Saldoawallak>> ViewDatas(long Idunit);
        Task<bool> Update(Saldoawallak param);
    }
}
