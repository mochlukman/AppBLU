using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ISpmRepo : IRepo<Spm>
    {
        Task<string> GenerateNoReg(long Idunit);
        Task<string> GenerateNoReg(long Idunit, long Idbend, int Idxkode, string Kdstatus);
        Task<List<long>> GetIds(long Idunit, int Idxkode, string Kdstatus, long Idspp);
        Task<bool> Update(Spm param);
        Task<List<Spm>> ViewDatas(SpmGet param);
        Task<Spm> ViewData(long Idspm);
        Task<bool> Pengesahan(Spm param);
        Task<bool> Penolakan(Spm param);
        Task<List<DataTracking>> TrackingData(long Idspm);
        Task<PrimengTableResult<Spm>> Paging(PrimengTableParam<SpmGet> param);
    }
}
