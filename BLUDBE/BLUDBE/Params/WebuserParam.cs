using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class WebuserPost
    {
        [Required]
        public string Userid { get; set; }
        public long? Idunit { get; set; }
        [Required]
        public string Kdtahap { get; set; }
        public string Pwd { get; set; }
        public long? Idpeg { get; set; }
        public long? Groupid { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public int? Blokid { get; set; }
        public bool? Transecure { get; set; }
        public bool? Stmaker { get; set; }
        public bool? Stchecker { get; set; }
        public bool? Staproval { get; set; }
        public bool? Stlegitimator { get; set; }
        public bool? Stinsert { get; set; }
        public bool? Stupdate { get; set; }
        public bool? Stdelete { get; set; }
        public string Ket { get; set; }
        public bool? Isauthorized { get; set; }
        public string Authorizedby { get; set; }
        public DateTime? Authorizeddate { get; set; }
    }
    public class UbahSandiPost
    {
        [Required]
        public string Userid { get; set; }
        [Required]
        public string Oldpass { get; set; }
        [Required]
        public string newPass { get; set; }
        [Required]
        public string Renewpass { get; set; }
    }
    public class userApproval
    {
        [Required]
        public string Userid { get; set; }
        [Required]
        public bool? Isauthorized { get; set; }
        public string Authorizedby { get; set; }
        public DateTime? Authorizeddate { get; set; }
    }
}
