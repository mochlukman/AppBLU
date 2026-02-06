using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class MenuTreeDto
    {
        public string label { get; set; }
        public string data { get; set; }
        public string expandedIcon { get; set; }
        public string collapsedIcon { get; set; }
        public string RoleId { get; set; }
        public string MenuId { get; set; }
        public string ParentId { get; set; }
        public string RouterLink { get; set; }
        public List<MenuTreeDto> children { get; set; }
    }
}
