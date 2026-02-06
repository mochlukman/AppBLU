using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Interface
{
    public interface IWebuserRepo: IRepo<Webuser>
    {
        Task<Webuser> ViewData(string Userid);
        void UpdateBlokId(string Userid);
        Task<List<Webuser>> UserBloked();
        Task<bool> OpenBlok(string Userid);
        Task<bool> Update(Webuser param);
        Task<bool> ResetPassword(string Userid);
        Task<bool> ChangePassword(UbahSandiPost param);
        Task<bool> Approval(userApproval param);
    }
}
