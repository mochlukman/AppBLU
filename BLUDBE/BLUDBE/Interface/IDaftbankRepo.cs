using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IDaftbankRepo : IRepo<Daftbank>
    {
        Task<bool> Update(Daftbank param);
    }
}
