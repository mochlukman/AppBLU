using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class RevokedToken
    {
        public string Token { get; set; }
        public DateTime? Expires { get; set; }
        public DateTime? Revoked { get; set; }
    }
}
