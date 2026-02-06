using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class SshrekRepo : Repo<Sshrek>, ISshrekRepo
    {
        public SshrekRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<Sshrek> ViewData(long Idsshrek)
        {
            Sshrek Result = await (
                from data in _BludContext.Sshrek
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                join ssh in _BludContext.Ssh on data.Idssh equals ssh.Idssh
                where data.Idsshrek == Idsshrek
                select new Sshrek
                {
                    Idsshrek = data.Idsshrek,
                    Idssh = data.Idssh,
                    IdsshNavigation = ssh ?? null,
                    Idrek = data.Idrek,
                    IdrekNavigation = rek ?? null,
                    Kdssh = data.Kdssh,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }
                ).FirstOrDefaultAsync();
            return Result;
        }

        public async Task<List<Sshrek>> ViewDatas(long Idssh)
        {
            List<Sshrek> Result = new List<Sshrek>();
            IQueryable<Sshrek> query = (
                from data in _BludContext.Sshrek
                join rek in _BludContext.Daftrekening on data.Idrek equals rek.Idrek
                join ssh in _BludContext.Ssh on data.Idssh equals ssh.Idssh
                where data.Idssh == Idssh
                select new Sshrek
                {
                    Idsshrek = data.Idsshrek,
                    Idssh = data.Idssh,
                    IdsshNavigation = ssh ?? null,
                    Idrek = data.Idrek,
                    IdrekNavigation = rek ?? null,
                    Kdssh = data.Kdssh,
                    Createdby = data.Createdby,
                    Createddate = data.Createddate,
                    Updateby = data.Updateby,
                    Updatedate = data.Updatedate
                }
                ).AsQueryable();
            Result = await query.ToListAsync();
            return Result;
        }
    }
}
