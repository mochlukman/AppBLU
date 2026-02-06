using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISetpendbljRepo : IRepo<Setpendblj>
    {
        Task<List<Setpendblj>> ViewDatas(long Idrekd);
    }
}
