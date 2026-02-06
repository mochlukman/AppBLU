using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IDpaRepo : IRepo<Dpa>
    {
        Task<PrimengTableResult<Dpa>> Paging(PrimengTableParam<DpaGet> param);
        Task<List<Dpa>> ViewDatas(DpaGet param);
        Task<Dpa> ViewData(long Iddpa);
        Task<bool> Update(Dpa param);
        Task<bool> UpdateNilai(Dpa param);
        Task<List<long>> GetIdunits();
        Task<List<long>> GetIds(long Idunit, string kdtahap = null);
        Task<bool> Pengesahan(Dpa param);
        Task<bool> Penolakan(Dpa param);
    }
}
