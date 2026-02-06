using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPgrmunitRepo : IRepo<Pgrmunit>
    {
        Task<List<PgrmunitView>> ViewDatas(PgrmunitGet param);
        Task<PgrmunitView> ViewData(long Idpgrmunit);
        Task<PrimengTableResult<PgrmunitView>> Paging(PrimengTableParam<PgrmunitGet> param);
        Task<bool> Update(Pgrmunit param);
    }
}
