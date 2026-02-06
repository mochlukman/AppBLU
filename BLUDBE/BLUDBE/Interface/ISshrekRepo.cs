using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISshrekRepo : IRepo<Sshrek>
    {
        Task<List<Sshrek>> ViewDatas(long Idssh);
        Task<Sshrek> ViewData(long Idsshrek);
    }
}
