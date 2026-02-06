using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ITbpdettkegRepo : IRepo<Tbpdettkeg>
    {
        Task<List<Tbpdettkeg>> ViewDatas(long Idtbpdett);
        Task<Tbpdettkeg> ViewData(long Idtbpdettkeg);
        Task<bool> Update(Tbpdettkeg param);
    }
}
