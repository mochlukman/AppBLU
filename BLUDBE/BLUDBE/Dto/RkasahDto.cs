using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public partial class RkasahView
    {
        public long Idrkasah { get; set; }
        public long Idunit { get; set; }
        public long Idpeg { get; set; }
        public string Nippeg { get; set; }
        public string Namapeg { get; set; }
        public string Kdtahap { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglsah { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
