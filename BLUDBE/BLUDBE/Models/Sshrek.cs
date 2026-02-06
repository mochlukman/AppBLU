using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sshrek
    {
        public long Idsshrek { get; set; }
        public long Idssh { get; set; }
        public long Idrek { get; set; }
        public string Kdssh { get; set; }
        public DateTime? Createddate { get; set; }
        public string Createdby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Ssh IdsshNavigation { get; set; }
    }
}
