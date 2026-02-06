using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface ICheckdokRepo : IRepo<Checkdok>
    {
        Task<List<Checkdok>> ViewDatas(CheckdokGet param);
        Task<Checkdok> ViewData(long Idcheck);
        Task<bool> Update(Checkdok param);
    }
}
