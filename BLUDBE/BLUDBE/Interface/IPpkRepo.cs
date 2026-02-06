using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface IPpkRepo : IRepo<Ppk>
    {
        Task<List<Ppk>> ViewDatas(PpkGet param);
        Task<Ppk> ViewData(long Idppk);
        Task<PrimengTableResult<Ppk>> Paging(PrimengTableParam<PpkGet> param);
        Task<bool> Update(Ppk param);
    }
}
