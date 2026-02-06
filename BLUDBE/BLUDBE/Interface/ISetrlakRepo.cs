using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ISetrlakRepo : IRepo<Setrlak>
    {
        Task<List<Setrlak>> ViewDatas(long Idreklak);
    }
}
