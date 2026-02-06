using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISetdlraloRepo : IRepo<Setdlralo>
    {
        Task<List<Setdlralo>> ViewDatas(long Idreklo);
    }
}
