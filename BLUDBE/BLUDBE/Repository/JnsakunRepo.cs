using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class JnsakunRepo : Repo<Jnsakun>, IJnsakunRepo
    {
        public JnsakunRepo(DbContext context) : base(context)
        {
        }
        public BludContext _ctx => _context as BludContext;
    }
}
