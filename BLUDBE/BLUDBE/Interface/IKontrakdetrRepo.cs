using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IKontrakdetrRepo : IRepo<Kontrakdetr>
    {
        Task<bool> Update(Kontrakdetr param);
        Task<decimal?> getTotalNilaiByIdKontrak(long Idkontrak);
    }
}
