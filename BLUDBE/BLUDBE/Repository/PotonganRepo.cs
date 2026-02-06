using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Repository
{
    public class PotonganRepo : Repo<Potongan>, IPotonganRepo
    {
        public PotonganRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<bool> Update(Potongan post)
        {
            Potongan data = await _BludContext.Potongan.Where(w => w.Idpot == post.Idpot).FirstOrDefaultAsync();
            if (data == null)
                return false;
            data.Kdpot = post.Kdpot;
            data.Nmpot = post.Nmpot;
            data.Keterangan = post.Keterangan;
            data.Mtglevel = post.Mtglevel;
            data.Type = post.Type;
            data.Dateupdate = post.Dateupdate;
            _BludContext.Potongan.Update(data);
            if (await _BludContext.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<Potongan> ViewData(long Idpot)
        {
            Potongan data = await _BludContext.Potongan.Where(w => w.Idpot == Idpot).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<Potongan>> ViewDatas(PotonganGet param)
        {
            List<Potongan> result = new List<Potongan>();
            IQueryable<Potongan> query = (
               from pot in _BludContext.Potongan
               select new Potongan
               {
                   Idpot = pot.Idpot,
                   Kdpot = pot.Kdpot,
                   Nmpot = pot.Nmpot,
                   Keterangan = pot.Keterangan,
                   Mtglevel = pot.Mtglevel,
                   Type = pot.Type,
                   Datecreate = pot.Datecreate,
                   Dateupdate = pot.Dateupdate
               }).AsQueryable();
            if (!String.IsNullOrEmpty(param.Kdpot))
            {
                query = query.Where(w => w.Kdpot.Trim() == param.Kdpot.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.Nmpot))
            {
                query = query.Where(w => w.Nmpot.Trim() == param.Nmpot.Trim()).AsQueryable();
            }
            if (!String.IsNullOrEmpty(param.Type))
            {
                query = query.Where(w => w.Type.Trim() == param.Type.Trim()).AsQueryable();
            }
            result = await query.ToListAsync();
            return result;
        }
    }
}
