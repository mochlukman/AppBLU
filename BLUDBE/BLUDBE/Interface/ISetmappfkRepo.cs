using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISetmappfkRepo : IRepo<Setmappfk>
    {
        Task<List<Setmappfk>> ViewDatas(long Idreknrc);
    }
}
