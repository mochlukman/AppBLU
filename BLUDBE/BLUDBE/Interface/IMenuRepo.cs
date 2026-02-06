using RKPD.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Dto;
using BLUDBE.Models;

namespace BLUDBE.Interface
{
    public interface IMenuRepo : IRepo<Webrole>
    {
        Task<List<Menu>> GetMenuAdmin(long Idapp);
        Task<List<Menu>> GetMenuByGroupId(long groupid, long Idapp);
        Task<List<MenuTreeDto>> TreeMenuWeRole(long groupid);
    }
}
