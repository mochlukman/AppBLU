using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IBendRepo : IRepo<Bend>
    {
        Task<List<Bend>> GetByPegawai(long Idunit, string Jnsbend);
        Task<List<Bend>> Search(long Idunit, string Jndbend, string Keyword);
        Task<bool> Update(Bend param);
    }
}
