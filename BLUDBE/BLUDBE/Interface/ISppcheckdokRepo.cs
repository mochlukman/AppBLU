using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISppcheckdokRepo : IRepo<Sppcheckdok>
    {
        Task<List<Sppcheckdok>> ViewDatas(SppcheckdokGet param);
        Task<Sppcheckdok> ViewData(long Idspp, long Idcheck);
    }
}
