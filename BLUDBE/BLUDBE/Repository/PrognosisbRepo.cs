using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class PrognosisbRepo : Repo<Prognosisb>, IPrognosisbRepo
    {
        public PrognosisbRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;
    }
}
