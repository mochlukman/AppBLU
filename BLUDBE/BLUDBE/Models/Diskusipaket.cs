using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Diskusipaket
    {
        public long Iddiskusipaket { get; set; }
        public string Komentar { get; set; }
        public string Sender { get; set; }
        public DateTime? Datecreate { get; set; }
        public long? Idrup { get; set; }

        public Paketrup IdrupNavigation { get; set; }
    }
}
