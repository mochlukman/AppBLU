using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface ITagihandetRepo : IRepo<Tagihandet>
    {
        Task<bool> Update(Tagihandet param);
        decimal? TotalTagihan(long Idtagihan);
    }
}
