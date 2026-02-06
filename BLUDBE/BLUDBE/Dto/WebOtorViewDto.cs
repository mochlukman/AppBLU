using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class WebOtorViewDto
    {
        public long Groupid { get; set; }
        public string Roleid { get; set; }
    }
    public class WebOtorRoleIdsDto
    {
        [Required]
        public List<string> RoleIds { get; set; }
    }
    public class WebOtorSaveDto
    {
        public long Groupid { get; set; }
        public string Roleid { get; set; }
    }
}
