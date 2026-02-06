using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISshRepo : IRepo<Ssh>
    {
        Task<PrimengTableResult<Ssh>> Paging(PrimengTableParam<SshGet> param);
        Task<List<Ssh>> ViewDatas(string Kelompok, long Idrek);
        Task<Ssh> ViewData(long Idssh);
        Task<bool> Update(Ssh param);
    }
}
