using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IPegawaiRepo : IRepo<Pegawai>
    {
        Task<List<long>> Idpegs(long Idunit);
        Task<List<Pegawai>> ViewDatas(PegawaiGet param);
        Task<Pegawai> ViewData(long Idpeg);
        Task<PrimengTableResult<Pegawai>> Paging(PrimengTableParam<PegawaiGet> param);
        Task<bool> Update(Pegawai param);
    }
}
