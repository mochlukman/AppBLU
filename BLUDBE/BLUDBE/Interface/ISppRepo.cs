using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISppRepo : IRepo<Spp>
    {
        Task<List<Spp>> ViewDatas(SppGet param);
        Task<Spp> ViewData(long Idspp);
        Task<List<long>> GetIds(long Idunit, int Idxkode, string Kdstatus);
        Task<bool> Update(Spp param);
        Task<string> GenerateNoReg(long Idunit);
        Task<bool> Pengesahan(Spp param);
        Task<bool> Penolakan(Spp param);
        Task<List<DataTracking>> TrackingData(long Idspp);
        Task<PrimengTableResult<Spp>> Paging(PrimengTableParam<SppGet> param);
    }
}
