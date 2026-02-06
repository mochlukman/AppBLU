using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISetupdloRepo : IRepo<Setupdlo>
    {
        Task<List<Setupdlo>> ViewDatas(long Idreklo);
    }
}
