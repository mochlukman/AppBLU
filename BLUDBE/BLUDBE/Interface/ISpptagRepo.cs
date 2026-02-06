using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISpptagRepo : IRepo<Spptag>
    {
        Task<Spptag> ViewData(long Idspptag);
        Task<List<Spptag>> ViewDatas(long Idspp);
        Task<List<long>> GetIds(long Idspp, long Idtagihan);
        Task<bool> Update(Spptag param);
    }
}
