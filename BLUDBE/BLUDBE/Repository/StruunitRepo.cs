using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class StruunitRepo : Repo<Struunit>, IStruunitRepo
    {
        public StruunitRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Struunit>> ViewDatas()
        {
            return await _BludContext.Struunit.ToListAsync();
        }
    }
}
