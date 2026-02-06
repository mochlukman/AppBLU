using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDpakegiatanRepo : IRepo<Dpakegiatan>
    {
        Task<List<LookupTreeDto>> Tree(long Idunit, string Kdtahap, bool Header, int? Jnskeg);
    }
}
