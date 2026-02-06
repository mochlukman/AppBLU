using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDaftreklakRepo : IRepo<Daftreklak>
    {
        Task<List<Daftreklak>> ViewDatas(List<int?> Idjnslak, int Mtglevel, string Type);
        Task<Daftreklak> ViewData(long Idrek);
        Task<bool> Update(Daftreklak param);
    }
}
