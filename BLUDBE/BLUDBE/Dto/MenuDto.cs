using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class MenuDto
    {
        public string RoleId { get; set; }
        public string MenuId { get; set; }
        public string ParentId { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public string RouterLink { get; set; }
        public List<MenuDto> Items { get; set; }
    }
}
