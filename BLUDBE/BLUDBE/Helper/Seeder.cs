using Microsoft.EntityFrameworkCore;
//using RKPD.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RKPD.API.Helpers
{
    public class Seeder
    {
        //private readonly RkpdContext _rkpdContext;
        //public Seeder(RkpdContext rkpdContext)
        //{
        //    _rkpdContext = rkpdContext;

        //}
        //public async Task Seed()
        //{
        //    await SeedWebUser();
        //}
        //private async Task SeedWebUser()
        //{
        //    if (!await _rkpdContext.Webuser.AnyAsync(s => s.Userid.Trim() == "admin"))
        //    {
        //        await _rkpdContext.Webuser.AddAsync(new Webuser
        //        {
        //            Userid = "admin",
        //            Unitkey = null,
        //            Nama = "Administrator",
        //            Pwd = Hashing.Create("admin"),
        //            Nip = null,
        //            Groupid = "1_",
        //            Ket = "",
        //            Blokid = "0",
        //            Stdelete = "0",
        //            Stinsert = "0",
        //            Stupdate = "0",
        //            Transecure = "0"
        //        });
        //        await _rkpdContext.SaveChangesAsync();
        //    }


        //}
    }
}
