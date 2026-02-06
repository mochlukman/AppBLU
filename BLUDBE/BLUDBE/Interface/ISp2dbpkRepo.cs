using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISp2dbpkRepo : IRepo<Sp2dbpk>
    {
        Task<List<long>> Sp2dIds();
    }
}
