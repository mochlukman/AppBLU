using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISetkdpRepo : IRepo<Setkdp>
    {
        Task<List<Setkdp>> ViewDatas(long Idrekkdp);
    }
}
