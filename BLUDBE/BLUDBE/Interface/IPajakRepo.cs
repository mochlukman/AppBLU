using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPajakRepo : IRepo<Pajak>
    {
        Task<bool> Update(Pajak param);
        Task<List<Pajak>> GetBySppdetr(long Idsppdetr);
        Task<List<Pajak>> ViewDatas(PajakGet param);
        Task<Pajak> ViewData(long Idpajak);

    }
}
