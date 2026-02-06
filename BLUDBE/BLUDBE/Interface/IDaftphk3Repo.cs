using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDaftphk3Repo : IRepo<Daftphk3>
    {
        Task<List<Daftphk3>> viewDatas(long Idunit);
        Task<bool> Update(Daftphk3 param);
    }
}
