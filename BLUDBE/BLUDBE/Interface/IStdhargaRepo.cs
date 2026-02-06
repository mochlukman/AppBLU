using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IStdhargaRepo : IRepo<Stdharga>
    {
        Task<PrimengTableResult<Stdharga>> Paging(PrimengTableParam<Stdharga> param);
    }
}
