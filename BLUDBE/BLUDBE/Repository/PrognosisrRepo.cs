using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class PrognosisrRepo : Repo<Prognosisr>, IPrognosisrRepo
    {
        public PrognosisrRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;
    }
}
