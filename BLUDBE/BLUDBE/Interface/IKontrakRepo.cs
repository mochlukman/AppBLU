using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IKontrakRepo : IRepo<Kontrak>
    {
        Task<List<Kontrak>> viewDatas(long Idunit, long Idkeg);
        Task<bool> Update(Kontrak param);
        Task<bool> UpdateNilai(long Idkontrak, decimal? Nilai);
        Task<PrimengTableResult<Kontrak>> Paging(PrimengTableParam<KontrakGet> param);
    }
}
