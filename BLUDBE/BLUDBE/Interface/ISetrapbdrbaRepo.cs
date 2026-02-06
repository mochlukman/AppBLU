using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISetrapbdrbaRepo : IRepo<Setrapbdrba>
    {
        Task<List<Setrapbdrba>> ViewDatas(long Idrekapbd);
    }
}
