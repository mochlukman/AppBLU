using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ITbpRepo : IRepo<Tbp>
    {
        Task<List<Tbp>> ViewDatas(long Idunit, List<string> Kdstatus, int Idxkode, long? Idbend, bool Isvalid = false, bool ExceptTbpsts = false);
        Task<List<Tbp>> ViewDatas(long Idunit, int Idxkode);
        Task<Tbp> ViewData(long Idtbp);
        Task<List<long>> GetIds(long Idtbp);
        Task<bool> Update(Tbp param);
        Task<bool> Pengesahan(Tbp param);
        Task<string> GenerateNoReg(long Idunit, List<string> Kdstatus);
    }
}
