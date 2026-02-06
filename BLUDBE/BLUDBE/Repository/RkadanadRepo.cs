using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class RkadanadRepo : Repo<Rkadanad>, IRkadanadRepo
    {
        public RkadanadRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;
    }
}
