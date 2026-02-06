using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IGolonganRepo : IRepo<Golongan>
    {
        Task<List<Golongan>> ViewDatas(GolonganGet param);
        Task<Golongan> ViewData(long Idgol);
        Task<PrimengTableResult<Golongan>> Paging(PrimengTableParam<GolonganGet> param);
        Task<bool> Update(Golongan param);
    }
}
