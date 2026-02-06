using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPaguskpdRepo : IRepo<Paguskpd>
    {
        Task<PrimengTableResult<PaguskpdView>> Paging(PrimengTableParam<PaguskpdGet> param);
        Task<PaguskpdView> ViewData(long Idpaguskpd);
        Task<List<PaguskpdView>> ViewDatas(PaguskpdGet param);
        Task<bool> Update(Paguskpd param);
    }
}
