using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JurnalRepo : Repo<Jurnal>, IJurnalRepo
    {
        public JurnalRepo(DbContext context) : base(context)
        {
        }
        public BludContext _c => _context as BludContext;
    }
}
