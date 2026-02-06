using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface ISetdapbdrbaRepo : IRepo<Setdapbdrba>
    {
        Task<List<Setdapbdrba>> ViewDatas(long Idrekapbd);
    }
}
