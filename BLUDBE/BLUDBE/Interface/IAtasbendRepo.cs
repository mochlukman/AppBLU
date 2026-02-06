using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IAtasbendRepo : IRepo<Atasbend>
    {
        Task<List<Atasbend>> ViewDatas();
        Task<Atasbend> ViewData(long Idpa);
        Task<bool> Update(Atasbend post);
    }
}
