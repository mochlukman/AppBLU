using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISpjlpjRepo : IRepo<Spjlpj>
    {
        Task<SpjlpjView> ViewData(long Idspjlpj);
        Task<List<SpjlpjView>> ViewDatas(long Idlpj);
    }
}
